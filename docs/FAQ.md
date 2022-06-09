---
sidebar_position: 2
---

# OpenCost FAQ

### What is OpenCost?

OpenCost is a vendor-neutral open source project for measuring and allocating infrastructure and container costs in Kubernetes environments. 

The project combines the Kubecost core allocation engine with a new community-driven [spec](https://github.com/kubecost/opencost/tree/develop/spec) on how to monitor costs in Kubernetes land. The allocation engine is a Golang implementation that conforms to spec. Both have now been submitted to the CNCF.

### How do I get started with the project?

You can [install](https://docs.kubecost.com/install) the project in minutes. Come join the [Slack](https://join.slack.com/t/kubecost/shared_invite/enQtNTA2MjQ1NDUyODE5LWFjYzIzNWE4MDkzMmUyZGU4NjkwMzMyMjIyM2E0NGNmYjExZjBiNjk1YzY5ZDI0ZTNhZDg4NjlkMGRkYzFlZTU) community if you have more questions, have input, or want to get involved in other ways. 

### How does Kubecost relate to OpenCost?

The OpenCost implementation is the core cost allocation engine originally built by Kubecost. It’s actively used in the free Kubecost Community version up to the Kubecost Enterprise version for cost allocation.

### How does this OpenCost implementation compare with the OpenCost spec?

The OpenCost project provides an implementation of the spec for AWS, Azure, GCP, and on-prem Kubernetes environments. It meets all the requirements of the current OpenCost spec and also includes other functionality for monitoring external cloud costs, e.g. storage buckets, external databases, etc.

### What Kubernetes versions does OpenCost support?

OpenCost supports Kubernetes v1.8 and above.

### What providers does OpenCost support?

OpenCost has core billing integrations with: 

* AWS/EKS
* Azure/AKS
* GCP/GKE
* On-prem clusters via custom pricing sheets

### How can I contribute to Opencost?

You can get started directly on our [open source repo](https://github.com/kubecost/opencost/blob/develop/CONTRIBUTING.md) today!


