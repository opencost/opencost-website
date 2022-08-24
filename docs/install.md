---
sidebar_position: 2
---

# Installation

## Before you begin
In order to deploy the Kubecost Helm Chart, ensure your Helm client is [3.0 or newer](https://helm.sh/docs/intro/install/).

## Via Helm
The easiest way to get started with OpenCost is to install with the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/). This can be done with Helm 3 using the following commands:

```
helm repo add kubecost https://kubecost.github.io/cost-analyzer/
helm upgrade --install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace
```

This install method provides access to all OpenCost and Kubecost Team functionality, can scale to large clusters, and is available for free.

## Alternative installation options

- You can run [helm template](https://helm.sh/docs/helm/helm_template/) against the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/) to generate local YAML output. This requires extra effort when compared to directly installing the helm chart but is more flexible than deploying static YAML.

- Lastly, you can deploy OpenCost directly as a pod. Directions for this install path are available [here](https://github.com/kubecost/opencost/blob/master/deploying-as-a-pod.md). This install path just deploys the underlying OpenCost allocation model with a basic UI or is not meant to be enterprise-ready.

## Updating OpenCost with Helm
1. Update the Helm repo with command 'helm repo update'
2. Use 'helm upgrade…' with the same values as used during the installation.

You can downgrade or specify a version by adding '--version x.xx.x' to the Helm command in Step 2.

Any specific upgrade or compatibility issues between versions should be documented in the [release notes](https://github.com/opencost/opencost/releases).

## Deleting OpenCost
To uninstall Kubecost and its dependencies, run the following command:
'helm uninstall kubecost -n kubecost'


