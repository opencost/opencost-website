---
sidebar_position: 3
---
# Managing with Helm

There is a [community-supported Helm chart](https://github.com/opencost/opencost-helm-chart) with extensive customization settings exposed via the [values.yaml](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/values.yaml). The Helm installation still assumes an existing [Prometheus](prometheus) installation. The following commands work with the [opencost/opencost-helm-chart](https://github.com/opencost/opencost-helm-chart) repository checked-out locally and with the `values.yaml` modified for your own local changes (alternatively you may keep them in a separate, source-controlled file).

### Installing OpenCost with Helm

```
helm install opencost . --namespace opencost --create-namespace -f values.yaml
```

### Installing Opencost with Helm (Connecting to Prometheus)

If you already have Prometheus installed in the Kubernetes cluster and want Opencost to connect to that Prometheus, you can use the following values file:


```yaml
opencost:
  exporter:
    defaultClusterId: <cluster name>
    extraEnv:
      EMIT_KSM_V1_METRICS: "false"
      EMIT_KSM_V1_METRICS_ONLY: "true"
      LOG_LEVEL: warn #error
    extraVolumeMounts:
      - name: opencost-conf
        mountPath: /models/aws.json
        subPath: aws.json
  prometheus:
    internal:
      enabled: true
      serviceName: kube-prometheus-stack-prometheus
      namespaceName: <prometheus namespace>
  ui:
    enabled: true
  metrics:
    serviceMonitor:
      # -- Create ServiceMonitor resource for scraping metrics using PrometheusOperator
      enabled: true
      namespace: <prometheus namespace>
extraVolumes:
  - name: opencost-conf
    configMap:
      name: opencost-conf
      items:
        - key: "aws.json"
          path: "aws.json"
```
To avoid duplicate metrics from v2 KubeStateMetrics running in your cluster and v1 KubestateMetrics from Opencost, we add these environment variables:
```yaml
      EMIT_KSM_V1_METRICS: "false"
      EMIT_KSM_V1_METRICS_ONLY: "true"
```

#### Configmap `opencost-conf` definition (AWS example with default values)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: opencost-conf
  namespace: opencost
  labels:
    app.kubernetes.io/name: opencost-conf
    app.kubernetes.io/instance: opencost-conf
data:
  aws.json: |
    {
        "provider": "aws",
        "description": "AWS Provider Configuration. ",
        "CPU": "0.031611",
        "spotCPU": "0.006655",
        "RAM": "0.004237",
        "GPU": "0.95",
        "spotRAM": "0.000892",
        "storage": "0.00005479452",
        "zoneNetworkEgress": "0.01",
        "regionNetworkEgress": "0.01",
        "internetNetworkEgress": "0.143",
        "spotLabel": "",
        "spotLabelValue": "",
        "awsServiceKeyName": "",
        "awsServiceKeySecret": "",
        "awsSpotDataRegion": "",
        "awsSpotDataBucket": "",
        "awsSpotDataPrefix": "",
        "athenaBucketName": "",
        "athenaRegion": "",
        "athenaDatabase": "",
        "athenaTable": "",
        "projectID": "${ACCOUNT_ID}"
    }
```

Ref: [AWS Configuration Documentation](https://github.com/opencost/opencost-website/blob/main/docs/configuration/AWS.md)

### Troubleshooting
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

