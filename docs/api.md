---
sidebar_position: 6
---
# API Usage

The [OpenCost Specification](https://github.com/opencost/opencost/blob/develop/spec/opencost-specv01.md) describes how Kubernetes costs are measured and allocated. OpenCost implements these primarily through the `/allocation/compute` API endpoint, but the exposed API endpoints are defined in [opencost/pkg/costmodel/router.go](https://github.com/opencost/opencost/blob/develop/pkg/costmodel/router.go#L1703).

This document is a work in progress and [further API enhancements are planned](https://github.com/opencost/opencost/issues/1579), but the following API endpoints are currently available in OpenCost:

### GET /aggregatedCostModel

Argument | Default | Description
--: | :--: | :--
window (required) | — |
aggregation (required) | |

### GET /allDaemonSets

Retrieves DaemonSets

### GET /allDeployments

Retrieves Deployments

### GET /allNamespaces

Retrieves Namespaces

### GET /allNodePricing

Pricing details for each node

### GET /allNodes

Retrieves Nodes

### GET /allPersistentVolumes

Retrieves Persistent Volumes

### GET /allPods

Retrieves Pods

### GET /allStatefulSets

Retrieves StatefulSets

### GET /allStorageClasses

Retrieves StorageClasses

### GET /allocation/compute

Argument | Default | Description
--: | :--: | :--
window (required) | — | Duration of time over which to query. Accepts: words like `today`, `week`, `month`, `yesterday`, `lastweek`, `lastmonth`; durations like `30m`, `12h`, `7d`; RFC3339 date pairs like `2021-01-02T15:04:05Z,2021-02-02T15:04:05Z`; unix timestamps like `1578002645,1580681045`.
resolution | 1m | Duration to use as resolution in Prometheus queries. Smaller values (i.e. higher resolutions) will provide better accuracy, but worse performance (i.e. slower query time, higher memory use). Larger values (i.e. lower resolutions) will perform better, but at the expense of lower accuracy for short-running workloads. (See [error bounds](#theoretical-error-bounds) for details.)
step | `window` | Duration of a single allocation set. If unspecified, this defaults to the `window`, so that you receive exactly one set for the entire window. If specified, it works chronologically backward, querying in durations of `step` until the full window is covered.
aggregate | | Field by which to aggregate the results. Accepts: `cluster`, `namespace`, `controllerKind`, `controller`, `service`, `label:<name>`, and `annotation:<name>`. Also accepts comma-separated lists for multi-aggregation, like `namespace,label:app`.
accumulate | false | If `true`, sum the entire range of sets into a single set.

#### Query examples

Allocation data for the last 60m, in steps of 10m, with resolution 1m, aggregated by namespace.

```sh
curl http://localhost:9090/allocation/compute \
  -d window=60m \
  -d resolution=1m \
  -d aggregate=namespace \
  -d accumulate=true \
  -G
```

```json
{
  "code": 200,
  "data": [
    {
      "kube-system": { ... },
      "default": { ... },
      "cost-model": { ... }
    }
  ]
}
```

Allocation data for the last 9d, in steps of 3d, with a 10m resolution, aggregated by namespace.

```sh
curl http://localhost:9090/allocation/compute \
  -d window=9d \
  -d step=3d \
  -d resolution=10m
  -d aggregate=namespace \
  -d accumulate=false \
  -G
```

```json
{
  "code": 200,
  "data": [
    {
      "default": { ... },
      "open-cost": { ... },
      "kube-system": { ... }
    },
    {
      "default": { ... },
      "open-cost": { ... },
      "kube-system": { ... }
    },
    {
      "default": { ... },
      "open-cost": { ... },
      "kube-system": { ... }
    }
  ]
}
```

#### Theoretical error bounds

Tuning the resolution parameter allows the querier to make tradeoffs between accuracy and performance. For long-running pods (>1d) resolution can be tuned aggressively low (>10m) with relatively little effect on accuracy. However, even modestly low resolutions (5m) can result in significant accuracy degradation for short-running pods (<1h).

Here, we provide theoretical error bounds for different resolution values given pods of differing running durations. The tuple represents lower- and upper-bounds for accuracy as a percentage of the actual value. For example:
- 1.00, 1.00 means that results should always be accurate to less than 0.5% error
- 0.83, 1.00 means that results should never be high by more than 0.5% error, but could be low by as much as 17% error
- -1.00, 10.00 means that the result could be as high as 1000% error (e.g. 30s pod being counted for 5m) or the pod could be missed altogether, i.e. -100% error.

| resolution | 30s pod | 5m pod | 1h pod | 1d pod | 7d pod |
|--:|:-:|:-:|:-:|:-:|:-:|
| 1m | -1.00, 2.00 |  0.80, 1.00 |  0.98, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 2m | -1.00, 4.00 |  0.80, 1.20 |  0.97, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 5m | -1.00, 10.00 | -1.00, 1.00 |  0.92, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 10m | -1.00, 20.00 | -1.00, 2.00 |  0.83, 1.00 | 0.99, 1.00 | 1.00, 1.00 |
| 30m | -1.00, 60.00 | -1.00, 6.00 |  0.50, 1.00 | 0.98, 1.00 | 1.00, 1.00 |
| 60m | -1.00, 120.00 | -1.00, 12.00 | -1.00, 1.00 | 0.96, 1.00 | 0.99, 1.00 |

### GET /allocation/compute/summary

Argument | Default | Description
--: | :--: | :--
window (required) | — | Duration of time over which to query. Accepts: words like `today`, `week`, `month`, `yesterday`, `lastweek`, `lastmonth`; durations like `30m`, `12h`, `7d`; RFC3339 date pairs like `2021-01-02T15:04:05Z,2021-02-02T15:04:05Z`; unix timestamps like `1578002645,1580681045`.
resolution | 1m | Duration to use as resolution in Prometheus queries. Smaller values (i.e. higher resolutions) will provide better accuracy, but worse performance (i.e. slower query time, higher memory use). Larger values (i.e. lower resolutions) will perform better, but at the expense of lower accuracy for short-running workloads. (See [error bounds](#theoretical-error-bounds) for details.)
step | `window` | Duration of a single allocation set. If unspecified, this defaults to the `window`, so that you receive exactly one set for the entire window. If specified, it works chronologically backward, querying in durations of `step` until the full window is covered.
aggregate | | Field by which to aggregate the results. Accepts: `cluster`, `namespace`, `controllerKind`, `controller`, `service`, `label:<name>`, and `annotation:<name>`. Also accepts comma-separated lists for multi-aggregation, like `namespace,label:app`.
accumulate | false | If `true`, sum the entire range of sets into a single set.

### GET /clusterCosts

Argument | Default | Description
--: | :--: | :--
window (required) | — |

### GET /clusterCostsFromCache

### GET /clusterCostsOverTime

Argument | Default | Description
--: | :--: | :--
window (required) | — |

### GET /clusterInfo

Details on the current cluster.

### GET /clusterInfoMap

### GET /costDataModel

### GET /costDataModelRange

### GET /diagnostics/prometheusMetrics

diagnostics of Prometheus

### GET /diagnostics/requestQueue

diagnostics of the request queue status

### GET /helmValues

`Values reporting disabled`

### GET /installInfo

`404`

### GET /installNamespace

`kubecost`
Value of environment variable `KUBECOST_NAMESPACE`

### GET /managementPlatform

Which platform OpenCost is running on (ie. `eks`).

### GET /orphanedPods

### GET /pod/:namespace/:name

### GET /podLogs

### GET /pricingSourceCounts

Number of nodes providing pricing.

### GET /pricingSourceStatus

Possibly a Kubecost call?

### GET /prometheusConfig

Address of Prometheus

### GET /prometheusQuery

prom query

### GET /prometheusQueryRange

prom query over range

### GET /prometheusRecordingRules

### GET /prometheusTargets

### GET /serviceAccountStatus

Possibly a Kubecost call?

### GET /status

Current status

### GET /thanosQuery

* This is not currently relevant to OpenCost *

### GET /thanosQueryRange

* This is not currently relevant to OpenCost *

### GET /validatePrometheus

Is Prometheus running properly?

### POST /refreshPricing

`Method Not Allowed`

Possibly a Kubecost call?

### POST /serviceKey

`Method Not Allowed`

## Postman Examples

A collection of OpenCost Postman queries: [opencost.postman_collection.json](https://raw.githubusercontent.com/opencost/opencost/develop/docs/opencost.postman_collection.json)

> **Note**: Change the hostname in the Collection>Edit>Variables
