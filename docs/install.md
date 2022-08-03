---
sidebar_position: 2
---

# Installation

## Open Source install option

OpenCost can be directly deployed as a pod. Directions for this install path are available [here](https://github.com/kubecost/opencost/blob/master/deploying-as-a-pod.md). This install path deploys the the OpenCost allocation model with a basic UI.

## Non-Open Source install option

The easiest way to get started with OpenCost is to install with the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/). This can be done with helm 3 using the following commands:

```
helm repo add kubecost https://kubecost.github.io/cost-analyzer/
helm upgrade --install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace
```

This install method provides access to all OpenCost and Kubecost Team functionality and can scale to large clusters.

Alternatively, you can run [helm template](https://helm.sh/docs/helm/helm_template/) against the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/) to generate local YAML output. This requires extra effort when compared to directly installing the helm chart but is more flexible than deploying static YAML.
