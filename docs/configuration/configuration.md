---
sidebar_position: 0
---
import InstallCloudCosts from './_install_cloud_costs.mdx';

# Cloud Service Provider Configuration

Accessing cloud service provider billing and pricing APIs may require additional configuration, depending on the provider. Please refer to the specific provider pages for the cloud-specific configurations:

* Alibaba \(documentation needed\)
* [Amazon Web Services](aws)
* [Google Cloud Platform](gcp)
* [Microsoft Azure](azure)
* [On-Premises](on-prem)
* [Open Telekom Cloud](otc)
* [Oracle Cloud Infrastructure](oracle)
* Scaleway \(documentation needed\)

## Cloud Costs

:::info

The Cloud Costs feature is included in the stable releases as of 1.108.0. Please ensure you have the latest release to access this new feature.

:::

The documentation for each cloud service provider covers the specifics of configuring their Cloud Costs, but you may access Cloud Costs for multiple accounts across different cloud service providers regardless of which cloud service provider you are running OpenCost on (including on-premises). You may enter your account details and credentials for each cloud service provider in the `cloud-integration.json` secret file with the following format (only containing applicable CSPs for your installation):
```
{
  "aws": [],
  "azure": [],
  "gcp": []
}
```

The content for your cloud providers' configuration are listed on their specific pages:

* [AWS](aws#aws-cloud-cost-configuration)
* [Azure](azure#azure-cloud-cost-configuration)
* [GCP](gcp#gcp-cloud-cost-configuration)
* Cloud Costs are not currently supported on OCI and on-premises

<InstallCloudCosts/>

Please note that the cloud costs become available as soon as they appear in the cloud service provider's billing data, with usually several hours to a 24-hour delay. There is currently no reconciliation of the on-demand pricing with the billing data's actual costs.

## Custom Pricing

In some cases users may need to override the pricing provided by their cloud service provider. They may have negotiated with their cloud service provider or may be acting as an intermediary with their own rates that do not follow list prices.

If this is the case, you may provide overrides in your local OpenCost Helm values file to match the name of the cloud provider you are overriding. The current options are `alibaba`, `aws`, `azure`, `gcp`, `oracle`, or `default` for on-premises pricing. This example overrides GCP pricing:

```yaml
opencost:
  customPricing:
    enabled: true
    provider: gcp
    costModel:
      description: Modified prices based on your internal pricing
      CPU: 12.00
      RAM: 10.50
      storage: 40.25
```

These prices will be reflected in the UI and under `/tmp/custom-config/gcp.json` on the `opencost` container and in the UI and API as prices are adjusted.
