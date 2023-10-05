---
sidebar_position: 3
---

# GCP integration

[OpenCost](https://www.opencost.io/) automatically reads node information from `node.spec.providerID` to determine the cloud service provider (CSP) in use. If it detects the provider is GCP, it attempts to pull data for node pricing. To read node information, OpenCost uses the [GCP Cloud Billing API](https://cloud.google.com/billing/), which requires an API key.

## GCP pricing configuration

To use OpenCost to get pricing information from your GCP project:

1. Enable the Cloud Billing API.

2. Generate an API key that has permissions to access.

### Enable Cloud Billing API

To enable the Cloud Billing API:

1. Click the **Enable the API** button.

2. Follow the prompts in [Get Google Cloud pricing information](https://cloud.google.com/billing/v1/how-tos/catalog-api).

### Generate API key

Generate an API key to use in place of the default key in the `CLOUD_PROVIDER_API_KEY` environment variable.

1. Create an API key by following the steps in [Authenticate using API keys](https://cloud.google.com/docs/authentication/api-keys).

2. Optionally, edit the key and restrict the key to the Cloud Billing API.

## Known Issues 

### OpenCost failing to execute its PromQL queries properly
It is a known issue that opencost prometheus queries will fail if using *GCP Managed Prometheus*. 

This happens because *GCP Managed Prometheus* [does some relabeling](https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#reserved-labels), and this results in the namespace label being renamed as exported_namespace which breaks Opencost.

When this issue is happening, you are going to see some error in like the one bellow: 
```ERR CostDataRange: Request Error: Prometheus communication error: 422 (Unprocessable Entity) Headers: { Content-Type: [ application/json; charset=UTF-8 ], Server: [ ESF ], Vary: [ Origin, X-Origin, Referer ], X-Frame-Options: [ SAMEORIGIN ], Cache-Control: [ private ], X-Content-Type-Options: [ nosniff ], X-Xss-Protection: [ 0 ], Date: [ Thu, 28 Sep 2023 10:33:58 GMT ] }, Body: {"status":"error","errorType":"execution","error":"found duplicate series for the match group {namespace=\"redacted\", persistentvolumeclaim=\"redacted\"} on the left hand-side of the operation: [{namespace=\"redacted\", persistentvolumeclaim=\"redacted\", storageclass=\"standard\", volumename=\"redacted\"}, {namespace=\"redacted\", persistentvolumeclaim=\"redacted\", storageclass=\"standard\", volumename=\"redacted\"}];many-to-many matching not allowed: matching labels must be unique on one side"} Query: avg(avg(kube_persistentvolumeclaim_info{volumename != "", }) by (persistentvolumeclaim, storageclass, namespace, volumename, cluster_id, kubernetes_node)
	*
	on (persistentvolumeclaim, namespace, cluster_id, kubernetes_node) group_right(storageclass, volumename)
	sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{}) by (persistentvolumeclaim, namespace, cluster_id, kubernetes_node, kubernetes_name)) by (persistentvolumeclaim, storageclass, namespace, cluster_id, volumename, kubernetes_node)
```

The fix to this issue is to edit the CRD's  PodMonitoring and ClusterPodMonitoring and setting the targetLabels key  to the following value to disable the labels override:

``` 
  targetLabels:
    metadata: []
```

Reference: https://cloud-native.slack.com/archives/C03D56FPD4G/p1695898103041549
