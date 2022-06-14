---
sidebar_position: 3
---

# Installation

The easiest way to get started with OpenCost is to install with the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/). This can be done with helm 3 using the following commands:

```
helm repo add kubecost https://kubecost.github.io/cost-analyzer/
helm upgrade --install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace
```

This install method provides access to all OpenCost and Community Kubecost functionality, can scale to large clusters, and is available for free.

## Alternative install options

- You can run [helm template](https://helm.sh/docs/helm/helm_template/) against the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/) to generate local YAML output. This requires extra effort when compared to directly installing the helm chart but is more flexible than deploying static YAML.

- You can install via [flat manifest](https://github.com/kubecost/cost-analyzer-helm-chart/blob/master/README.md#manifest). This install path provides less flexibility for managing your deployment and has several product limitations, e.g. Thanos is not easily enabled.

- Lastly, you can deploy the OpenCost directly as a pod. Directions for this install path are available [here](https://github.com/kubecost/opencost/blob/master/deploying-as-a-pod.md). This install path just deploys the underlying OpenCost allocation model with a limited UI or is not meant to be enterprise-ready.
