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
