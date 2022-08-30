---
sidebar_position: 2
---
# OpenCost Setup

Follow the steps below to install OpenCost.


## TLDR (for those that just want the commands!)

This is all you need. The guides below this command give more detail.

```sh
helm install my-prometheus --repo https://prometheus-community.github.io/helm-charts prometheus \
  --namespace prometheus --create-namespace \
  --set pushgateway.enabled=false \
  --set alertmanager.enabled=false \
  -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml

kubectl apply --namespace opencost -f https://github.com/opencost/opencost/blob/main/kubernetes/opencost.yaml
```

## Prerequisites

Install Prometheus using the following command:

```sh
helm install my-prometheus --repo https://prometheus-community.github.io/helm-charts prometheus \
  --namespace prometheus --create-namespace \
  --set pushgateway.enabled=false \
  --set alertmanager.enabled=false \
  -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
```

## OpenCost

If providing your own Prometheus:
 1. Set the [PROMETHEUS_SERVER_ENDPOINT environment variable](https://github.com/opencost/opencost/blob/main/kubernetes/opencost.yaml#L137) to the address of your prometheus server
 2. Add the scrapeConfig `https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml` to it

If you used the Prometheus install command from `Prerequisites`, the command below will install OpenCost on your cluster:

```sh
kubectl apply --namespace opencost -f https://github.com/opencost/opencost/blob/main/kubernetes/opencost.yaml
```

Wait for the pod to be ready and then port forward with:

```sh
kubectl port-forward --namespace opencost service/opencost 9003
```

## Testing

To test that the server is running, you can hit [http://localhost:9003/allocation/compute?window=60m](http://localhost:9003/allocation/compute?window=60m)

See more [API Examples](./api.md).

Or use [kubectl cost](./kubectl-cost.md):

```sh
kubectl cost --service-port 9003 --service-name opencost --kubecost-namespace opencost --allocation-path /allocation/compute  \
    namespace \
    --window 5m \
    --show-efficiency=true
```

Output:

```
+---------+---------------+--------------------+-----------------+
| CLUSTER | NAMESPACE     | MONTHLY RATE (ALL) | COST EFFICIENCY |
+---------+---------------+--------------------+-----------------+
|         | opencost      |          18.295200 |        0.231010 |
|         | prometheus    |          17.992800 |        0.000000 |
|         | kube-system   |          11.383200 |        0.033410 |
+---------+---------------+--------------------+-----------------+
| SUMMED  |               |          47.671200 |                 |
+---------+---------------+--------------------+-----------------+
```

## Troubleshooting

If you get an error like this, check your Prometheus target is correct in the OpenCost deployment.

```bash
Error: failed to query allocation API: failed to port forward query: received non-200 status code 500 and data: {"code":500,"status":"","data":null,"message":"Error: error computing allocation for ...
```

Negative values for idle: ensure you added the scrape target (above) for OpenCost.

---

## Help

Please let us know if you run into any issues, we are here to help!

Contact us via email (<support@kubecost.com>) or join us on [CNCF Slack](https://slack.cncf.io/) in the [#opencost](https://cloud-native.slack.com/archives/C03D56FPD4G) channel if you have questions!