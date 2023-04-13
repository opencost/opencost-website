---
sidebar_position: 8
---
Azure Price Configuration
============

OpenCost needs access to the Microsoft Azure Billing Rate Card API to access accurate pricing data for your Kubernetes resources.
> **Note:** The prices used will be accurate at the time of access, but they can still change over time.

## Creating a Custom Azure role

Start by creating an Azure role definition. Below is an example definition, replace `YOUR_SUBSCRIPTION_ID` with the ID of the subscription containing your Kubernetes cluster.
([How to find your subscription ID.](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id#find-your-azure-subscription))

```json
{
    "Name": "OpenCostRole",
    "IsCustom": true,
    "Description": "Rate Card query role",
    "Actions": [
        "Microsoft.Compute/virtualMachines/vmSizes/read",
        "Microsoft.Resources/subscriptions/locations/read",
        "Microsoft.Resources/providers/read",
        "Microsoft.ContainerService/containerServices/read",
        "Microsoft.Commerce/RateCard/read"
    ],
    "AssignableScopes": [
        "/subscriptions/YOUR_SUBSCRIPTION_ID"
    ]
}
```

Save this into a file called `myrole.json`

Next, you'll want to register that role with Azure:

```shell
az role definition create --verbose --role-definition @myrole.json
```

## Creating an Azure Service Principal

Next, create an Azure Service Principal.

```shell
az ad sp create-for-rbac --name "OpenCostAccess" --role "OpenCostRole" --scope "/subscriptions/YOUR_SUBSCRIPTION_ID" --output json
```

Keep this information which is used in the service-key.json below.

## Supplying Azure Service Principal details to OpenCost

Create a file called [`service-key.json`](https://github.com/kubecost/poc-common-configurations/blob/main/azure/service-key.json) and update it with the Service Principal details from the above steps:

```json
{
    "subscriptionId": "<Azure Subscription ID>",
    "serviceKey": {
        "appId": "<Azure AD App ID>",
        "displayName": "OpenCostAccess",
        "password": "<Azure AD Client Secret>",
        "tenant": "<Azure AD Tenant ID>"
    }
}
```

Next, create a secret for the Azure Service Principal

> **Note**: When managing the service account key as a Kubernetes secret, the secret must reference the service account key JSON file, and that file must be named `service-key.json`.

```shell
kubectl create secret generic azure-service-key -n kubecost --from-file=service-key.json
```

Now the OpenCost deployment can be configured to mount that secret as a volume. The exact method will depend on how OpenCost was installed.

### Installed from YAML

If you installed OpenCost using the [provided YAML](install#install-opencost), save that YAML and edit the `opencost` deployment to add:

* A [`volumes` object](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#volumes) under `spec.template.spec`, with a `service-key-secret` volume referring to the `azure-service-key` secret:
```yaml
      volumes:
        - name: service-key-secret
          secret:
            secretName: azure-service-key
```

* A [`volumeMounts` object](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#volumes-1) under the `opencost` container (at `spec.template.spec.containers[0]`) that mounts the `service-key-secret` volume:
```yaml
          volumeMounts:
            - mountPath: /var/secrets
              name: service-key-secret
```

Then apply the updated YAML:
```sh
$ kubectl apply -f opencost.yaml -n opencost
namespace/opencost unchanged
serviceaccount/opencost unchanged
clusterrole.rbac.authorization.k8s.io/opencost unchanged
clusterrolebinding.rbac.authorization.k8s.io/opencost unchanged
deployment.apps/opencost configured
service/opencost unchanged
```

### Installed with Helm

If you installed OpenCost using the [community-supported Helm chart](https://github.com/opencost/opencost-helm-chart), you can update your `values.yaml` file to add a volume for the secret and mount it into the exporter container:
```yaml
extraVolumes:
  - name: service-key-secret
    secret:
      secretName: azure-service-key
opencost:
  exporter:
    extraVolumeMounts:
      - mountPath: /var/secrets
        name: service-key-secret
```

Apply those changes with:
```sh
helm upgrade opencost . --namespace opencost -f values.yaml
```
