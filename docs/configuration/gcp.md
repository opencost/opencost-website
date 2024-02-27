---
sidebar_position: 3
title: Google Cloud Platform
---

# Google Cloud Platform Configuration

OpenCost is designed to automatically identify the cloud service provider (CSP) in use by reading node information from `node.spec.providerID`. When Google Cloud Platform (GCP) is detected as the provider, OpenCost attempts to retrieve data for node pricing. This process utilizes the [GCP Cloud Billing API](https://cloud.google.com/billing/), which necessitates an API key.

## Configuring GCP Pricing

To enable OpenCost to fetch pricing information from your GCP project, you must generate an API key to replace the default key in the `CLOUD_PROVIDER_API_KEY` environment variable. You will need to follow the instructions provided in [Get Google Cloud pricing information](https://cloud.google.com/billing/v1/how-tos/catalog-api):

1. [Activate the Cloud Billing API](https://console.cloud.google.com/flows/enableapi?apiid=cloudbilling.googleapis.com).
2. [Generate an API key with the appropriate access permissions](https://cloud.google.com/docs/authentication/api-keys#create).
3. Optionally, you can edit the key to restrict its access to the Cloud Billing API.

## GCP Cloud Costs Configuration

:::info

The Cloud Costs feature is included in the stable releases as of 1.108.0. Please ensure you have the latest release to access this new feature.

:::

To configure OpenCost for your GCP account, create a GCP service key with the following commands in your command line to generate and export one. Make sure your GCP project is where your external costs are being run.

``` sh
export PROJECT_ID=$(gcloud config get-value project)
gcloud iam service-accounts create compute-viewer-opencost --display-name "Compute Read Only Account Created For Opencost" --format json
gcloud projects add-iam-policy-binding $PROJECT_ID --member serviceAccount:compute-viewer-opencost@$PROJECT_ID.iam.gserviceaccount.com --role roles/compute.viewer
gcloud projects add-iam-policy-binding $PROJECT_ID --member serviceAccount:compute-viewer-opencost@$PROJECT_ID.iam.gserviceaccount.com --role roles/bigquery.user
gcloud projects add-iam-policy-binding $PROJECT_ID --member serviceAccount:compute-viewer-opencost@$PROJECT_ID.iam.gserviceaccount.com --role roles/bigquery.dataViewer
gcloud projects add-iam-policy-binding $PROJECT_ID --member serviceAccount:compute-viewer-opencost@$PROJECT_ID.iam.gserviceaccount.com --role roles/bigquery.jobUser
gcloud iam service-accounts keys create ./compute-viewer-opencost-key.json --iam-account compute-viewer-opencost@$PROJECT_ID.iam.gserviceaccount.com
```

You can then get your service account key:
```
cat compute-viewer-opencost-key.json
```

* `<KEY_JSON>` is the GCP service key created above. This value should be left as a JSON when inserted into the configuration object
* `<PROJECT_ID>` is the Project ID in the GCP service key.
* `<BILLING_DATA_DATASET>` requires a BigQuery dataset prefix (e.g. billing_data) in addition to the BigQuery table name. A full example is `billing_data.gcp_billing_export_v1_018AIF_74KD1D_534A2`.

Set these values into the to the GCP array in the `cloud-integration.json`:

``` json
{
  "gcp": {
    "bigQuery": [
      {
        "projectID": "<GCP_PROJECT_ID>",
        "dataset": "detailedbilling",
        "table": "gcp_billing_export_resource_v1_0121AC_C6F51B_690771",
        "authorizer": {
          "authorizerType": "GCPServiceAccountKey",
          "key": {
            "type": "service_account",
            "project_id": "<GCP_PROJECT_ID>",
            "private_key_id": "<PRIVATE_KEY_ID>",
            "private_key": "<PRIVATE_KEY>",
            "client_email": "<CLIENT_EMAIL>",
            "client_id": "<CLIENT_ID>",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<CERT_NAME>"
          }
        }
      }
    ]
  }
}
```

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
