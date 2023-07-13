---
sidebar_position: 2
---
# Prometheus

Prometheus is a prerequisite for OpenCost installation. OpenCost requires Prometheus for scraping metrics and data storage. For express installation of Prometheus use the following command:

```sh
helm install my-prometheus --repo https://prometheus-community.github.io/helm-charts prometheus \
  --namespace prometheus --create-namespace \
  --set prometheus-pushgateway.enabled=false \
  --set alertmanager.enabled=false \
  -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
```

This Prometheus installation is based on the [Prometheus Community Kubernetes Helm Chart](https://prometheus-community.github.io/helm-charts) and by default your Prometheus may scrape unnecessary metrics. For production, you may refer to the Kubecost [user metrics list](https://docs.kubecost.com/architecture/user-metrics) to filter with `keep` and for reference look at the scrape config in the Kubecost installation [chart](https://github.com/kubecost/cost-analyzer-helm-chart/blob/v1.98/cost-analyzer/charts/prometheus/values.yaml#L1208).

If you are going to connect existing Prometheus instance which is already consuming KSM metrics, please consider visiting this page about [KSM metrics emission](https://docs.kubecost.com/architecture/ksm-metrics) because OpenCost currently implements the same architecture and you might get overlapping metrics.

At this point you can proceed to [installing OpenCost](install#install-opencost).

### Providing your own Prometheus

If you want to use your own Prometheus:
 1. Set the `PROMETHEUS_SERVER_ENDPOINT` [environment variable](https://github.com/opencost/opencost/blob/eadd55d5fcee528547492df4baf29497dc019470/kubernetes/opencost.yaml#L154) to the address of your Prometheus server.
 2. Add the [scrapeConfig](https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml) to it, using the preferred means for your Prometheus install (ie. ```-f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml```).
 3. Consider using the [OpenCost Helm Chart](https://github.com/opencost/opencost-helm-chart) for additional Prometheus configuration options.
