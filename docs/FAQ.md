---
sidebar_position: 3
---

# FAQ

### What is OpenCost?

OpenCost is a vendor-neutral open source project for measuring and allocating infrastructure and container costs in Kubernetes environments.

The project combines the Kubecost core allocation engine with a new community-driven [spec](https://github.com/kubecost/opencost/tree/develop/spec) on how to monitor costs in Kubernetes land. The allocation engine is a Golang implementation that conforms to spec. Both have now been submitted to the CNCF as a [sandbox project](https://www.cncf.io/sandbox-projects/).

### How do I get started with the project?

You can [install](install.md) the project in minutes. Come join the [Slack](https://join.slack.com/t/kubecost/shared_invite/enQtNTA2MjQ1NDUyODE5LWFjYzIzNWE4MDkzMmUyZGU4NjkwMzMyMjIyM2E0NGNmYjExZjBiNjk1YzY5ZDI0ZTNhZDg4NjlkMGRkYzFlZTU) community if you have more questions, have input, or want to get involved in other ways.

### Do I need to pay to use OpenCost?

No. OpenCost is open source (Apache 2.0) and free to use.

### How does OpenCost relate to Kubecost?

The OpenCost implementation is the cost allocation engine originally built by Kubecost. This implementation is actively used in the all versions of Kubecost for building cost allocation model. The founding members have announced intentions to onboard OpenCost as a CNCF sandbox project. If the CNCF accepts our onboarding application, the CNCF will become the neautral home for OpenCost moving forward and it will be moved from the Kubecost Github organization.

### How does this OpenCost implementation compare with the OpenCost spec?

The OpenCost project provides an implementation of the spec for AWS, Azure, GCP, and on-prem Kubernetes environments. It meets all the requirements of the current OpenCost spec and also includes other functionality for monitoring external cloud costs, e.g. storage buckets, external databases, etc.

### What Kubernetes versions does OpenCost support?

OpenCost supports a Kubernetes environment above 1.8.

### How is OpenCost governed?

We are actively forming our governance model. Our plan is to align with the CNCF best practices, found [here](https://www.cncf.io/blog/2019/08/30/cncf-technical-principles-and-open-governance-success/). Today, Kubecost’s technical team contributes all of the code submissions to OpenCost based on the inputs and feedback from a working group of founding contributors. The [OpenCost spec](https://github.com/kubecost/opencost/tree/develop/spec) is co-authored by founding members.

### What does it mean to be a “Founding Contributor”?

Founding contributors co-authored and contributed feedback to the [OpenCost spec](https://github.com/kubecost/opencost/tree/develop/spec). Moving forward, Founding Contributors will continue to evolve the OpenCost project.

We are actively looking for new contributors if you or your company are interested in getting involved – contact us on [Slack](https://join.slack.com/share/enQtMzY5MDY3NjAyODIyNC0yOWY3Mjc2ZWFhMjNlYWNiZWFhNDAwNWE2MWE1OGY0MzJmNGRlNjlhNjM0MzI4ZDBiYzI1OWZlNjYzY2JhM2Yw)!

### What providers does OpenCost support?

OpenCost has core billing integrations with:

- AWS/EKS
- Azure/AKE
- GCP/GKE
- On-prem clusters via custom pricing sheets

### How can I contribute to Opencost?

Get started on our [open source repo](https://github.com/kubecost/opencost/blob/develop/CONTRIBUTING.md)! Also, come join the [Slack](https://join.slack.com/t/kubecost/shared_invite/enQtNTA2MjQ1NDUyODE5LWFjYzIzNWE4MDkzMmUyZGU4NjkwMzMyMjIyM2E0NGNmYjExZjBiNjk1YzY5ZDI0ZTNhZDg4NjlkMGRkYzFlZTU) community if you have more questions, have input, or want to get involved in other ways.
