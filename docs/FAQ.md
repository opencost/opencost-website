# FAQ

### What is OpenCost?

OpenCost is a vendor-neutral open source project for measuring and allocating Kubernetes and cloud infrastructure costs.

The project is a combination of the OpenCost core allocation engine with the community-driven [OpenCost Specification](specification) on how to monitor costs in Kubernetes land. The allocation engine is a Golang implementation that conforms to spec. Both are owned by CNCF as an [incubating project](https://www.cncf.io/projects/).

### How do I get started with the project?

You can [install](installation/install) the project in minutes.

### Do I need to pay to use OpenCost?

No. OpenCost is open source (Apache 2.0) and free to use.

### How does OpenCost relate to Kubecost?

The OpenCost implementation is the cost allocation engine originally built by Kubecost. This implementation is actively used in all versions of Kubecost for building a cost allocation model, to which they add additional features in their commercial offering. OpenCost is a CNCF incubating project, so it is free to use and open to contributions from all community members.

### What's the difference between OpenCost and Kubecost?

OpenCost provides real-time monitoring of your Kubernetes cluster and provides the on-demand list pricing for the cloud resources in use by your cluster. It integrates with cloud billing to provide visibility into the cost of cloud resources linked to your Kubernetes usage. OpenCost is a CNCF incubating project, so it is free to use and open to contributions from all community members. OpenCost has a UI, but the goal of OpenCost is to become the "Prometheus of cloud cost monitoring" and allow other solutions to be built on top of that data.

OpenCost is the cost allocation engine for Kubecost. Kubecost provides more accurate cost numbers for your cluster after reconciling the differences between your published bill with any negotiated discounts and the on-demand pricing (if any). Kubecost also provides recommendations, governance, alerting, federated clusters, a SaaS platform, and support for their commercial offering.

### How are costs determined in the OpenCost project?

The [OpenCost Specification](specification) outlines the metholodogy used for how costs are calculated in the project. The OpenCost implementation implements this spec and has public billing API integrations with the providers listed above.

For a low-level investigation of how OpenCost calculates the cost of Kubernetes workloads, check out the [OpenCost Kubernetes cost monitoring deep dive](https://www.youtube.com/watch?v=P46g6go2KEk)
<iframe width="840" height="472" src="https://www.youtube.com/embed/P46g6go2KEk?si=h63Nv_9mXTgFJxcb" title="OpenCost Kubernetes cost monitoring deep dive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### How does the OpenCost implementation compare with the OpenCost Specification?

The OpenCost project provides an implementation of the specification for AWS, Azure, GCP, and on-prem Kubernetes environments. It meets all the requirements of the current [OpenCost Specification](specification) and is working towards including other functionality for monitoring external cloud costs, e.g. storage buckets, external databases, etc.

### What Kubernetes versions does OpenCost support?

OpenCost supports a Kubernetes environment above 1.8.

### How is OpenCost governed?

OpenCost has a published [governance model](https://github.com/opencost/opencost/blob/develop/GOVERNANCE.md) and is working towards being managed by our community of contributors. We are aligning with the [CNCF best practices](https://www.cncf.io/blog/2019/08/30/cncf-technical-principles-and-open-governance-success/) and encouraging contributors to participate in managing the project. Today, Kubecost’s technical team contributes most of the code submissions to OpenCost based on the inputs and feedback from the community, contributors, and their customers. The [OpenCost Specification](specification) was co-authored by founding members.

### What is the OpenCost release schedule?

OpenCost repositories follow the [Semantic Versioning 2.0.0](https://semver.org/) convention. So far there have been 12 OpenCost minor releases, with the initial OpenCost 1.94 released in June 2022 and as of September 2023 the current release is 1.106.2. The 1.x series are considered stable and have been in production for years.

The release cadence is:
* There have been no additional major releases since OpenCost was added to the CNCF.
* Minor versions are released every month.
* Patch versions are released as necessary.
* The releases are announced using GitHub’s releases, followed by Slack (CNCF/#opencost), Mastodon, Twitter, and discussion in the fortnightly Community Meetings.

### What does it mean to be a “Founding Contributor”?

Founding contributors co-authored and contributed feedback to the [OpenCost Specification](specification). Moving forward the greater OpenCost community will continue to evolve the OpenCost project.

### What providers does OpenCost support?

OpenCost has core billing integrations with:

- AWS/EKS
- Azure/AKS
- GCP/GKE
- OCI/OKE
- On-prem clusters via custom pricing sheets

### How can I contribute to OpenCost?

Get started with our [open source contributing guide](https://github.com/opencost/opencost/blob/develop/CONTRIBUTING.md)!

We are actively looking for new contributors if you or your company are interested in getting involved – join us using the links below-

Contact us via email (opencost@kubecost.com), join us on [CNCF Slack](https://slack.cncf.io/) in the [#opencost](https://cloud-native.slack.com/archives/C03D56FPD4G) channel, or subscribe to the [OpenCost Community Calendar](https://bit.ly/opencost-calendar) and attend a [Community Meeting](https://bit.ly/opencost-meeting) if you have questions!
