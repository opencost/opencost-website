---
sidebar_position: 4
---
Oracle Cloud Infrastructure (OCI) Configuration
============

OpenCost will automatically OCI as the cloud service provider, by reading node information from `node.spec.providerID`.
When OCI is detected as the cloud service provider, OpenCost attempts to retrieve pricing data from the
[OCI Price List API](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingup_topic-Estimating_Costs.htm#accessing_list_pricing).

Note that no API key is required to retrieve pricing data, and the process is automatic for clusters on OCI.
