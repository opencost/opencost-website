---
sidebar_position: 7
---
# On-Premises Pricing

On-premises cluster pricing is supported in OpenCost by providing default prices for node data via the [default.json](https://github.com/opencost/opencost/blob/develop/configs/default.json).

```
{
    "provider": "custom",
    "description": "Default prices based on GCP us-central1",
    "CPU": "0.031611",
    "spotCPU": "0.006655",
    "RAM": "0.004237",
    "spotRAM": "0.000892",
    "GPU": "0.95",
    "storage": "0.00005479452",
    "zoneNetworkEgress": "0.01",
    "regionNetworkEgress": "0.01",
    "internetNetworkEgress": "0.12"
}
```

This file is loaded when the OpenCost starts up, providing default prices. You may verify these values by querying Prometheus:
```
kubectl port-forward -n prometheus service/my-prometheus-server 9003:80
curl -s 'http://localhost:9003/api/v1/query?query=node_cpu_hourly_cost' | jq '.data.result[0]'
{
  "metric": {
    "__name__": "node_cpu_hourly_cost",
    "instance": "mom.bottlebru.sh",
    "instance_type": "k3s",
    "job": "opencost",
    "node": "mom.bottlebru.sh",
    "provider_id": "k3s://mom.bottlebru.sh"
  },
  "value": [
    1675411231.44,
    "0.031611"
  ]
}
```
Similarly you can query `node_ram_hourly_cost`, `node_total_hourly_cost`, and `pv_hourly_cost`.

## Modified Default.json Example

You can update the prices in the `default.json` file and rebuild your container with the modified source (make sure permissions are 644 on the `default.json`).
```
{
    "provider": "custom",
    "description": "Modified prices based on arbitrary whims",
    "CPU": "1.25",
    "spotCPU": "0.006655",
    "RAM": "0.50",
    "spotRAM": "0.000892",
    "GPU": "0.95",
    "storage": "0.25",
    "zoneNetworkEgress": "0.01",
    "regionNetworkEgress": "0.01",
    "internetNetworkEgress": "0.12"
}
```
produces output similar to
```
kubectl port-forward -n prometheus service/my-prometheus-server 9003:80
curl -s 'http://localhost:9003/api/v1/query?query=node_cpu_hourly_cost' | jq '.data.result[0]'
{
  "metric": {
    "__name__": "node_cpu_hourly_cost",
    "instance": "mom.bottlebru.sh",
    "instance_type": "k3s",
    "job": "opencost",
    "node": "ndnd.bottlebru.sh",
    "provider_id": "k3s://mom.bottlebru.sh"
  },
  "value": [
    1675416174.822,
    "1.25"
  ]
}
```

This is reflected in the OpenCost UI with substantially higher CPU, RAM and PV costs than before the update.
