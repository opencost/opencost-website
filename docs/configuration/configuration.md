---
sidebar_position: 0
---
# Cloud Service Provider Configuration

Kubernetes cloud cost allocation utilizes on-demand APIs for pricing data, but additional configuration is required for cloud costs and user-specific pricing. Please refer to the specific provider pages for the cloud-specific configurations:

* [AWS](aws)
* [Azure](azure)
* [GCP](gcp)
* [On-Premises](on-prem)

## Cloud Costs

To access general cloud costs you will need to set up cost data exports for your cloud provider. Your account details and credentials will be kept in a secret file named `cloud-integration.json` with the following format only containing applicable CSPs for your installation:
```
{
  "azure": [],
  "gcp": [],
  "aws": [],
  "alibaba": []
}
```

OpenCost is currently single cluster with a single provider, despite the format of the file. The content for your cloud provider's configuration are listed on their specific pages:

* [AWS](aws#aws-cloud-cost-configuration)
* [Azure](azure#azure-cloud-cost-configuration)
* [GCP](gcp#gcp-cloud-cost-configuration)

Once you have filled in the configuration object, use the command:
```
kubectl create secret generic <SECRET_NAME> --from-file=cloud-integration.json -n opencost
```

Once the secret is created, set `.Values.opencost.cloudIntegrationSecret` to `<SECRET_NAME>` and upgrade OpenCost via [Helm](installation/helm).

Please note that the cloud costs become available as soon as they appear in the cloud service provider's billing data, with usually several hours to a 24-hour delay. There is currently no reconciliation of the on-demand pricing with the billing data's actual costs.
