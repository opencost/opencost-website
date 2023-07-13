---
sidebar_position: 3
---
# Managing with Helm

There is a [community-supported Helm chart](https://github.com/opencost/opencost-helm-chart) with extensive customization settings exposed via the [values.yaml](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/values.yaml). The Helm installation still assumes an existing [Prometheus](prometheus) installation. The following commands work with the [opencost/opencost-helm-chart](https://github.com/opencost/opencost-helm-chart) repository checked-out locally and with the `values.yaml` modified for your own local changes (alternatively you may keep them in a separate, source-controlled file).

### Installing OpenCost with Helm

```
helm install opencost . --namespace opencost --create-namespace -f values.yaml
```

### Upgrading OpenCost with Helm

```
helm upgrade opencost . --namespace opencost -f values.yaml
```

### Sidegrading with Helm

If you wish to override the version of OpenCost installed by the Helm chart (e.g. downgrading or alternative versions), update the `values.yaml` to set the tag of the downloaded image (you can also change the registry and repository if necessary).

```
opencost:
  exporter:
    image:
      registry: quay.io
      repository: kubecost1/kubecost-cost-model
      tag: prod-1.101.3
  ui:
    image:
      registry: quay.io
      repository: kubecost1/opencost-ui
      tag: prod-1.101.3
```

### Deleting with Helm

```
helm uninstall opencost
```
