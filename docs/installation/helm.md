---
sidebar_position: 3
---
# Managing with Helm

There is a [community-supported Helm chart](https://github.com/opencost/opencost-helm-chart) with extensive customization settings exposed via the [values.yaml](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/values.yaml). The Helm installation assumes an existing [Prometheus](prometheus) installation.

## Get Repository Info

Start by giving your local helm installation access to the helm chart.

```bash
helm repo add opencost-charts https://opencost.github.io/opencost-helm-chart
helm repo update
```

## Installing OpenCost with Helm
Create a values file ([example](#installing-opencost-with-helm)) then install into your kubernetes cluster.
```
helm install opencost opencost-charts/opencost --namespace opencost --create-namespace -f values.yaml
```

### Example Configuration

The full list of installation options can be found [here](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/values.yaml).

```yaml
opencost:
  customPricing:
    enabled: true
    provider: aws
    costModel:
      description: Modified pricing configuration.
      CPU: 0.031611
      spotCPU: 0.006655
      RAM: 0.004237
      spotRAM: 0.000892
      GPU: 0.95
      storage: 0.00005479452
      zoneNetworkEgress: 0.01
      regionNetworkEgress: 0.01
      internetNetworkEgress: 0.143
      spotLabel: ""
      spotLabelValue: ""
      awsServiceKeyName: ""
      awsServiceKeySecret: ""
      awsSpotDataRegion: ""
      awsSpotDataBucket: ""
      awsSpotDataPrefix: ""
      athenaBucketName: ""
      athenaRegion: ""
      athenaDatabase: ""
      athenaTable: ""
      projectID: "${ACCOUNT_ID}"
  exporter:
    defaultClusterId: <cluster name>
    extraEnv:
      EMIT_KSM_V1_METRICS: "false"
      EMIT_KSM_V1_METRICS_ONLY: "true"
      LOG_LEVEL: warn #error
  prometheus:
    internal:
      enabled: true
      serviceName: kube-prometheus-stack-prometheus
      namespaceName: <prometheus namespace>
  ui:
    enabled: true
  metrics:
    serviceMonitor:
      enabled: true
      namespace: <prometheus namespace>
```

To avoid duplicate metrics from v2 KubeStateMetrics running in your cluster and v1 KubestateMetrics from OpenCost, we add these environment variables:
```yaml
opencost:
  exporter:
    extraEnv:
      EMIT_KSM_V1_METRICS: "false"
      EMIT_KSM_V1_METRICS_ONLY: "true"
```

Pricing information is provided through the helm chart values. The example above uses AWS default configuration. Documentation
can be found for: [AWS](https://www.opencost.io/docs/configuration/aws), [Azure](https://www.opencost.io/docs/configuration/azure),
[GCP](https://www.opencost.io/docs/configuration/gcp), and [Custom On Premise](https://www.opencost.io/docs/configuration/on-prem)

```yaml
opencost:
  customPricing:
    enabled: true
    provider: aws
    costModel:
      <Configuration Options>
```

### Upgrading OpenCost with Helm

```
helm upgrade opencost opencost-charts/opencost --namespace opencost -f values.yaml
```

### Side-grading with Helm

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

# Troubleshooting
* Sometimes you don't find cost reports from OpenCost for certain resources. In such scenarios, check whether Prometheus is scraping the metrics. If Prometheus is not scraping any metrics, then ensure whether Service monitors are enabled in that service.

example:

If the cert-manager namespace is not showing any cost values, and when Prometheus is not scraping any metrics, then enable ServiceMonitor as below:


```yaml
  prometheus:
  enabled: true
  servicemonitor:
    enabled: true
    namespace: <prometheus namespace>
    honorLables: true
```


* Sometimes, the OpenCost report displays zero values for specific namespaces.

example:
```
kubectl cost --service-port 9003 --service-name opencost --kubecost-namespace opencost --allocation-path /allocation/compute  \
    namespace \
    --historical \
    --window 1d \
    --show-cpu \
    --show-memory \
    --show-pv \
    --show-efficiency=true


| CLUSTER | NAMESPACE     | CPU      | CPU EFF. | MEMORY   | MEMORY EFF. | PV       | TOTAL COST (ALL) | COST EFFICIENCY |
|---------|---------------|----------|----------|----------|-------------|----------|------------------|-----------------|
| dev  | kube-system   | 0.138740 | 0.001965 | 0.023890 | 0.386018    | 0.000000 | 0.162630         | 0.058381        |
|         | monitoring           | 0.000000 | 0.000000 | 0.000000 | 0.000000    | 0.000000 |         0.000000 |        0.000000 |
```

The reason for this could be low usage within a specific time window. You might need to wait for a period, possibly one or more days, to allow it to accumulate the metrics and display the data in the OpenCost report.
