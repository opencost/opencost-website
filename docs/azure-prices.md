---
sidebar_position: 8
---
Azure Price Configuration
============

OpenCost needs access to the Microsoft Azure Billing Rate Card API to access accurate pricing data for your Kubernetes resources.
> **Note:** The prices used will be accurate at the time of access, but they can still change over time.

## Create a Custom Azure role

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

## Create an Azure Service Principal

Next, create an Azure Service Principal.

```shell
az ad sp create-for-rbac --name "OpenCostAccess" --role "OpenCostRole" --scope "/subscriptions/YOUR_SUBSCRIPTION_ID" --output json
```

Keep this information which is used in the service-key.json below.

## Supply Azure Service Principal details to OpenCost

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
kubectl create secret generic azure-service-key -n opencost --from-file=service-key.json
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

## Customer-specific pricing

The Rate Card prices retrieved with the setup above are the standard prices for Azure resources offered to all customers.
If your organisation has an Enterprise Agreement or Partner Agreement with Azure you may have discounts for some of the resources used by your clusters.
In that case you can configure OpenCost to use the [Consumption Price Sheet API](https://learn.microsoft.com/en-us/rest/api/consumption/) to request prices specifically for your billing account.

> **Note**: Calling the Price Sheet API uses the service principal secret created above - those steps are prerequisites for this section.

### Find your billing account ID
You can [find your billing account ID in the Azure portal](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/view-all-accounts),
or using the `az` CLI:

```sh
az billing account list --query "[].{name:name, displayName:displayName}"
```

### Grant billing access to your Service Principal
To call the Price Sheet API the service principal you created above needs to be granted the EnrollmentReader billing role.
You can do this by following [this Azure guide](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/assign-roles-azure-service-principals#assign-enrollment-account-role-permission-to-the-spn)
and using the [Role Assignments API reference page](https://learn.microsoft.com/en-us/rest/api/billing/2019-10-01-preview/role-assignments/put?tabs=HTTP).

Assigning a billing role isn't directly supported in the `az` CLI yet, so the process is quite involved.
To simplify this you can use the `bash` script [below](#script-to-assign-billing-role) to collect the details of your service principal, construct the PUT request and send it with `curl`.

Save the script to a file named `assign-billing-role.bash` and run it:

```sh
export SP_NAME=OpenCostAccess
export BILLING_ACCOUNT_ID=<your billing account ID>
chmod u+x assign-billing-role.bash
./assign-billing-role.bash
```

### Find the offer ID for your subscription
As well as the billing account ID, OpenCost also needs the offer ID for your subscription to query the price sheet.
You can find this on the [subscription page in the Azure portal](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id#find-your-azure-subscription).

### Configure OpenCost to use the Price Sheet API

The billing account and offer ID need to be passed to OpenCost in environment variables.
How you do this will depend on the method used to install OpenCost.

#### Installed from YAML
If you installed OpenCost using the [provided YAML](install#install-opencost), open that YAML and edit the `opencost` deployment to add two more items to the `opencost` container environment variables (under `.spec.template.spec.containers[0].env`):
```yaml
            - name: AZURE_BILLING_ACCOUNT
              value: <your billing account id>
            - name: AZURE_OFFER_ID
              value: <your offer id>
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

#### Installed with Helm

If you installed OpenCost using the [community-supported Helm chart](https://github.com/opencost/opencost-helm-chart), you can update your `values.yaml` file to add the required variables:
```yaml
opencost:
  exporter:
    extraEnv:
      AZURE_BILLING_ACCOUNT: <your billing account id>
      AZURE_OFFER_ID: <your offer id>
```

Apply those changes with:
```sh
helm upgrade opencost . --namespace opencost -f values.yaml
```

## Useful links

The following Microsoft documents are a helpful reference for pricing and billing questions:

* [Microsoft Azure Offer Details](https://azure.microsoft.com/en-us/support/legal/offer-details/)
* [Azure Pricing FAQ](https://azure.microsoft.com/en-us/pricing/faq/)
* [Geographic availability and currency support for the commercial marketplace](https://docs.microsoft.com/en-us/azure/marketplace/marketplace-geo-availability-currencies)
* [Azure Portal > Cost Management + Billing > Billing Account Properties](https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Properties)
* [Understand Cost Management data](https://docs.microsoft.com/en-us/azure/cost-management-billing/costs/understand-cost-mgt-data)


## Script to assign billing role

```bash
#!/bin/bash

# Helper to assign the billing EnrollmentReader role to a service principal
# Needs SP name and billing account name variables set

set -euo pipefail

if [[ -z "${SP_NAME}" ]]; then
  echo "SP_NAME is not set"
  exit 1
fi

if [[ -z "${BILLING_ACCOUNT_ID}" ]]; then
  echo "BILLING_ACCOUNT_ID is not set"
  exit 1
fi

# Generate a unique name for the assignment.
ROLE_ASSIGNMENT_NAME="$(uuidgen)"

# Work out the SP id and tenant id from the name.
read -r SP_ID TENANT_ID < <(az ad sp list --display-name "${SP_NAME}" --query '[0].{id:id,tenantId:appOwnerOrganizationId}' -o tsv)

# Get bearer token for talking to API.
ACCESS_TOKEN="$(az account get-access-token --query accessToken -o tsv)"

URL="https://management.azure.com/providers/Microsoft.Billing/billingAccounts/${BILLING_ACCOUNT_ID}/billingRoleAssignments/${ROLE_ASSIGNMENT_NAME}?api-version=2019-10-01-preview"

echo "Creating EnrollmentReader role assignment for SP ${SP_NAME} (${SP_ID}) in billing account ${BILLING_ACCOUNT_ID}"
echo "Role assignment name: ${ROLE_ASSIGNMENT_NAME}"

# This is the role definition ID for EnrollmentReader
ENROLLMENT_READER_ROLE="24f8edb6-1668-4659-b5e2-40bb5f3a7d7e"
RESPONSE="$(curl --silent --show-error -X PUT "${URL}" \
-H "Authorization: Bearer ${ACCESS_TOKEN}" \
-H "Content-type: application/json" \
-d "{
  \"properties\": {
    \"principalId\": \"${SP_ID}\",
    \"principalTenantId\": \"${TENANT_ID}\",
    \"roleDefinitionId\": \"/providers/Microsoft.Billing/billingAccounts/${BILLING_ACCOUNT_ID}/billingRoleDefinitions/${ENROLLMENT_READER_ROLE}\"
  }
}")"

echo "Response: ${RESPONSE}"
```
