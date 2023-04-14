---
sidebar_position: 8
---
Azure Opencost Integration
============

As announced in the recent Azure blog post, AKS has made several contributions to augment OpenCost and enable support with AKS. See the following steps to enable this new functionality: 

1. Install OpenCost with the Kubecon 2023 build:

```
 helm repo add opencost https://opencost.github.io/opencost-helm-chart
 helm install opencost opencost/opencost  --set opencost.exporter.image.registry=gcr.io --set  opencost.exporter.image.repository=kubecost1/opencost --set opencost.exporter.image.tag=kc-eu-2023
```

This will be generally available in production builds in opencost v103 currently scheduled for May 2, 2023.

2. Optionally enable customer-specific Azure pricing:
https://www.opencost.io/docs/csv-export/docs/azure-prices

3. Enable CSV export to Azure storage:
https://www.opencost.io/docs/csv-export
