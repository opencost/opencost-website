# Troubleshooting

## Reporting Issues

When asking a question in [Slack](https://cloud-native.slack.com/archives/C03D56FPD4G) or raising an issue in [GitHub](https://github.com/opencost/opencost/issues), make sure you can answer the following questions:
* Where are you running Kubernetes and which version are you using?
* [What version of OpenCost are you running](#getting-the-opencost-version)?
* How did you install OpenCost and what configurations did you apply?
* How did you install Prometheus? Did you do something custom?
* Are there any messages in the logging or UI that may indicate the source of issue?

## Getting the OpenCost version

You can find this in the beginning of the container logs or in the OpenCost UI at the bottom of the page.

```sh
$ kubectl logs -n opencost deployment/opencost | head

Defaulted container "opencost" out of: opencost, opencost-ui
2024-02-29T05:58:36.68395851Z ??? Log level set to info
2024-02-29T05:58:36.68436741Z INF Starting cost-model version 1.109.0 (fa84614)
```

## Enabling Debugging

You can temporarily set the log level of the OpenCost container without restarting the Pod. You can send a POST request to /logs/level with one of the valid log levels. This does not persist between Pod restarts, Helm deployments, etc. Here's an example:

```sh
curl -X POST \
    'http://localhost:9003/logs/level' \
    -d '{"level": "debug"}'
```
A GET request can be sent to the same endpoint to retrieve the current log level.

## Verifying Pricing

Prices are loaded when the OpenCost starts up and may be overridden with custom settings. You may verify these values by querying Prometheus:

```sh
kubectl port-forward -n prometheus-system service/prometheus-server 9003:80
curl -s 'http://localhost:9003/api/v1/query?query=node_cpu_hourly_cost' | jq '.data.result[0]'
Handling connection for 9003
{
  "metric": {
    "__name__": "node_cpu_hourly_cost",
    "arch": "arm64",
    "instance": "kind-control-plane",
    "job": "opencost",
    "node": "kind-control-plane",
    "provider_id": "kind://docker/kind/kind-control-plane"
  },
  "value": [
    1709811921.978,
    "1.25"
  ]
}
```

In the example above, we had a custom CPU price of `1.25`. Similarly you can query `node_ram_hourly_cost`, `node_total_hourly_cost`, and `pv_hourly_cost`.

## "Error: failed to query allocation API" error message

If you get an error like this, check your Prometheus target is correct in the OpenCost deployment.

```bash
Error: failed to query allocation API: failed to port forward query: received non-200 status code 500 and data: {"code":500,"status":"","data":null,"message":"Error: error computing allocation for ...
```

Negative values for idle: ensure you added the scrape target (above) for OpenCost.

## "There are no Cloud Cost integrations currently configured."

If you see this in the web interface, please step through the instructions for configuring [Cloud Costs](configuration/#cloud-costs) for your cloud provider(s). You can check the `opencost` container logs for error messages.

## GCP Cloud Costs Not Working with Workload Identity

If you're using GKE with Workload Identity and experiencing issues with GCP Cloud Costs integration, ensure that your `cloud-integration.json` is properly configured. When using Workload Identity, you need to specify `authorizerType: "GCPWorkloadIdentity"` in your configuration:

```json
{
  "gcp": {
    "bigQuery": [
      {
        "projectID": "<GCP_PROJECT_ID>",
        "dataset": "detailedbilling",
        "table": "gcp_billing_export_resource_v1_0121AC_C6F51B_690771",
        "authorizer": {
          "authorizerType": "GCPWorkloadIdentity"
        }
      }
    ]
  }
}
```

Common issues when using Workload Identity:
1. Missing or incorrect `authorizerType` in the configuration
2. Workload Identity not enabled on the GKE cluster
3. Missing or incorrect IAM bindings between the Kubernetes service account and GCP service account
4. Insufficient permissions on the GCP service account (requires compute.viewer, bigquery.user, bigquery.dataViewer, and bigquery.jobUser roles)

For more details, refer to the [GCP Configuration](configuration/gcp) documentation.

## "Address family not supported by protocol" error message

If you receive this error message from the OpenCost container, there may be an issue with your default NGINX config.

Copy this [default config](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template) into your ConfigMap. Replace [this line](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template#L62) in the config with `listen ${UI_PORT};` and mount it to your container.

If you are still receiving errors, you may need to reconfigure your firewall/network policies.

## Prometheus on EKS PVC stuck in "Pending" state

If you have deployed the default Prometheus on EKS and have not configured the default `gp2` storage provider properly, you may have your PVCs stuck in the `Pending` state. Following the instructions from [Mastering EKS Cluster Monitoring: Harness the Power of Prometheus, Grafana, and EFK Stack](https://blog.devops.dev/mastering-eks-cluster-monitoring-harness-the-power-of-prometheus-grafana-and-efk-stack-98372f5822ce), you can fix this with the following (where our cluster name is `opencost-01`).

> AWS EKS uses IAM roles for service accounts (IRSA) to authenticate and authorize pods in the cluster. This involves creating an IAM OIDC identity provider (IDP) for your EKS cluster. IAM OpenID Connect Provider for a cluster allows Kubernetes to authenticate users and obtain AWS IAM roles for access control to AWS resources within the cluster and since we haven't given the necessary permission hence the reason the pods are in a pending state.

> This command will help us to do just that.

```sh
eksctl utils associate-iam-oidc-provider --cluster opencost-01 --approve
```

> Next, we have to create an Amazon EBS CSI driver IAM role. The Amazon EBS CSI (Container Storage Interface) driver IAM role is a security role in AWS that provides the necessary permissions for the Kubernetes cluster to manage and interact with Amazon Elastic Block Store (EBS) volumes using the CSI driver, enabling dynamic provisioning and attachment of storage volumes to pods in the cluster.

```sh
eksctl create iamserviceaccount \
    --name ebs-csi-controller-sa \
    --namespace kube-system \
    --cluster opencost-01 \
    --role-name AmazonEKS_EBS_CSI_DriverRole \
    --role-only \
    --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
    --approve
```

> The last step in fixing this is adding the AWS EBS DRIVER add-on; we will run this command to do that. Input your AWS account number in the number section of the arn:

```sh
eksctl create addon --name aws-ebs-csi-driver --cluster opencost-02 --service-account-role-arn arn:aws:iam::111111111112:role/AmazonEKS_EBS_CSI_DriverRole --force
```

Upgrade your Prometheus deployment with the `storageClass` set to `gp2`.

```sh
helm upgrade prometheus --repo https://prometheus-community.github.io/helm-charts prometheus \
  --namespace prometheus-system \
  --set prometheus-pushgateway.enabled=false \
  --set alertmanager.persistentVolume.storageClass="gp2" \
  --set server.persistentVolume.storageClass="gp2"\
  --set alertmanager.enabled=false \
  -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
```

## Help

Please let us know if you run into any issues, we are here to help!

Join us on [CNCF Slack](https://slack.cncf.io/) in the [#opencost](https://cloud-native.slack.com/archives/C03D56FPD4G) channel if you have questions or contact us via email (opencost-kubecost@wwpdl.vnet.ibm.com).
