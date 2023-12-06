---
sidebar_position: 4
---
Oracle Cloud Infrastructure (OCI) Configuration
============

OpenCost automatically detects OCI as the cloud service provider, by reading node information from `node.spec.providerID`.
When OCI is detected as the cloud service provider, OpenCost attempts to retrieve pricing data from the
[OCI Price List API](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingup_topic-Estimating_Costs.htm#accessing_list_pricing).
No API key is required to retrieve the public pricing data.

> **NOTE**: If your cluster is an OKE cluster, OpenCost will apply enhanced cluster pricing by default.
