---
sidebar_position: 3
---

# Google Cloud Platform Configuration

OpenCost is designed to automatically identify the cloud service provider (CSP) in use by reading node information from `node.spec.providerID`. When Google Cloud Platform (GCP) is detected as the provider, OpenCost attempts to retrieve data for node pricing. This process utilizes the [GCP Cloud Billing API](https://cloud.google.com/billing/), which necessitates an API key.

## Configuring GCP Pricing

To enable OpenCost to fetch pricing information from your GCP project, you need to:

1. Activate the Cloud Billing API.
2. Generate an API key with the appropriate access permissions.

### Activating the Cloud Billing API

Follow these steps to activate the Cloud Billing API:

1. Click on the **Enable the API** button.
2. Follow the instructions provided in [Get Google Cloud pricing information](https://cloud.google.com/billing/v1/how-tos/catalog-api).

### Generating an API Key

You must generate an API key to replace the default key in the `CLOUD_PROVIDER_API_KEY` environment variable.

1. To create an API key, Follow the steps outlined in [Authenticate using API keys](https://cloud.google.com/docs/authentication/api-keys).
2. Optionally, you can edit the key to restrict its access to the Cloud Billing API.

## Known Issues

### Failure of OpenCost's PromQL Queries

If you use *GCP Managed Prometheus*, OpenCost's Prometheus queries may fail. This issue arises due to the relabeling performed by *GCP Managed Prometheus*, which renames the namespace label as exported_namespace, disrupting OpenCost's operation.

When this issue occurs, you may encounter an error message similar to the one below:

```bash
ERR CostDataRange: Request Error: Prometheus communication error: 422 (Unprocessable Entity) Headers: { Content-Type: [ application/json; charset=UTF-8 ], Server: [ ESF ], Vary: [ Origin, X-Origin, Referer ], X-Frame-Options: [ SAMEORIGIN ], Cache-Control: [ private ], X-Content-Type-Options: [ nosniff ], X-Xss-Protection: [ 0 ], Date: [ Thu, 28 Sep 2023 10:33:58 GMT ] }, Body: {"status":"error","errorType":"execution","error":"found duplicate series for the match group {namespace=\"redacted\", persistentvolumeclaim=\"redacted\"} on the left hand-side of the operation: [{namespace=\"redacted\", persistentvolumeclaim=\"redacted\", storageclass=\"standard\", volumename=\"redacted\"}, {namespace=\"redacted\", persistentvolumeclaim=\"redacted\", storageclass=\"standard\", volumename=\"redacted\"}];many-to-many matching not allowed: matching labels must be unique on one side"} Query: avg(avg(kube_persistentvolumeclaim_info{volumename != "", }) by (persistentvolumeclaim, storageclass, namespace, volumename, cluster_id, kubernetes_node)
	*
	on (persistentvolumeclaim, namespace, cluster_id, kubernetes_node) group_right(storageclass, volumename)
	sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{}) by (persistentvolumeclaim, namespace, cluster_id, kubernetes_node, kubernetes_name)) by (persistentvolumeclaim, storageclass, namespace, cluster_id, volumename, kubernetes_node)
```

To resolve this issue, you need to edit the CRD's PodMonitoring and ClusterPodMonitoring and set the targetLabels key to the following value to turn off the labels override:

```yaml
  targetLabels:
    metadata: []
```

For more details, please refer to this [discussion](https://cloud-native.slack.com/archives/C03D56FPD4G/p1695898103041549).
