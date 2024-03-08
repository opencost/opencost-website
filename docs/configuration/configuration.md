---
sidebar_position: 0
---
# Cloud Service Provider Configuration

Accessing cloud service provider billing and pricing APIs may require additional configuration, depending on the provider. Please refer to the specific provider pages for the cloud-specific configurations:

* [Amazon Web Services](aws)
* [Microsoft Azure](azure)
* [Google Cloud Platform](gcp)
* [Oracle Cloud Infrastructure](oracle)
* [On-Premises](on-prem)

## Cloud Costs

:::info

The Cloud Costs feature is included in the stable releases as of 1.108.0. Please ensure you have the latest release to access this new feature.

:::

The documentation for each cloud service provider covers the specifics of configuring their Cloud Costs, but you may access Cloud Costs for multiple accounts across different cloud service providers regardless of which cloud service provider you are running OpenCost on (including on-premises). You may enter your account details and credentials for each cloud service provider in the `cloud-integration.json` secret file with the following format (only containing applicable CSPs for your installation):
```
{
  "azure": [],
  "gcp": [],
  "aws": []
}
```

The content for your cloud providers' configuration are listed on their specific pages:

* [AWS](aws#aws-cloud-cost-configuration)
* [Azure](azure#azure-cloud-cost-configuration)
* [GCP](gcp#gcp-cloud-cost-configuration)
* Cloud Costs are not currently supported on OCI and on-premises

Once you have filled in the configuration, use the command:
```
kubectl create secret generic <SECRET_NAME> --from-file=cloud-integration.json -n opencost
```

Once the secret is created, set `.Values.opencost.cloudIntegrationSecret` to `<SECRET_NAME>` and upgrade OpenCost via [Helm](../installation/helm).

Please note that the cloud costs become available as soon as they appear in the cloud service provider's billing data, with usually several hours to a 24-hour delay. There is currently no reconciliation of the on-demand pricing with the billing data's actual costs.
