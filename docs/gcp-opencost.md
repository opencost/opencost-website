---
sidebar_position: 8
---

# GCP integration

OpenCost will automatically read node information `node.spec.providerID` to determine the cloud service provider (CSP) in use. If it detects the CSP is GCP, it will attempt to pull data for node pricing.

In order to do this, OpenCost will use the [GCP Cloud Billing API](https://cloud.google.com/billing/) which requires an API key.

## GCP pricing configuraiton

To enable OpenCost to get pricing information from your GCP project, you'll need to enable the Cloud Billing API, and then generate an API key that has permissions to access it.

Enabling the Cloud Billing API can be done by clicking on the "Enable the API" button and following the prompts on [this page](https://cloud.google.com/billing/v1/how-tos/catalog-api).

When that is complete, next create an API key by following the steps on [this page](https://cloud.google.com/docs/authentication/api-keys).

Once the API key has been created, you can then optionally edit the key and restrict the key to only the Cloud Billing API.

This API key can now be used in place of the default key in the `CLOUD_PROVIDER_API_KEY` environment variable.
