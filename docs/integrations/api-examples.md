---
sidebar_position: 3
---

# API Examples

:::note
Throughout our API documentation, we use `localhost:9003` as the default OpenCost API URL, but your OpenCost instance may be exposed by a service or ingress. To reach the OpenCost API at port 9003, run: `kubectl -n opencost port-forward deployment/opencost 9003`. You may also expose the OpenCost UI on port 9090 with the command `kubectl -n opencost port-forward deployment/opencost 9003 9090`.
:::

## `/allocation` Examples

The OpenCost `/allocation` API has query parameters for `window`, `aggregate`, `step`, and `resolution`. Below are several examples of queries using this API. Please refer to the [OpenCost API](api#allocation) for the full API specifics.

### Default OpenCost UI Allocation request

Here is an example of an OpenCost API query for the last 7 days of namespaces every minute:

```sh
curl -G http://localhost:9003/allocation \
  -d window=7d \
  -d aggregate=namespace \
  -d resolution=1m
```

This is the default query for the OpenCost UI and produces [output similar to this](/allocation-example-output.json).

### Allocation data for the last 60m, in steps of 10m, with resolution 1m, aggregated by namespace

```sh
curl -G http://localhost:9003/allocation \
  -d window=60m \
  -d step=10m \
  -d resolution=1m \
  -d aggregate=namespace
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

### Allocation data for the last 9d, in steps of 3d, with a 10m resolution, aggregated by namespace

```sh
curl -G http://localhost:9003/allocation/compute \
  -d window=9d \
  -d step=3d \
  -d resolution=10m
  -d aggregate=namespace
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

## `/cloudCost` Examples

The OpenCost `/cloudCost` API has query parameters for `window`, `aggregate`, and `filter`. Below are several examples of queries using this API. Please refer to the [OpenCost API](api#cloudcost) for the full API specifics.

### Default OpenCost UI Cloud Costs request

Amortized Net Cost per Provider for the last 7 days

```sh
curl -G http://localhost:9003/cloudCost \
  -d window=7d \
  -d aggregate=provider
```

This is the default query for the OpenCost UI Cloud Costs and produces [output similar to this](/cloudCost-example-output.json).

### List Cost per Provider and Service for the past 14 days

This example shows list cost multi-aggregation by Provider and Service.

```sh
curl -G http://localhost:9003/cloudCost \
  -d window=14d \
  -d aggregate=provider,service
```

```json
{
  "code": 200,
  "data": {
    "sets": [
      {
        "cloudCosts": {
          "AWS/AWSBackup": { ... },
          "AWS/AWSCloudTrail": {
            "properties": {
              "provider": "AWS",
              "invoiceEntityID": "297945954695",
              "service": "AWSCloudTrail",
              "category": "Other"
            },
            "window": {
              "start": "2023-10-28T00:00:00Z",
              "end": "2023-10-29T00:00:00Z"
            },
            "listCost": {
              "cost": 19.800393,
              "kubernetesPercent": 0
            },
            "netCost": {
              "cost": 19.800393,
              "kubernetesPercent": 0
            },
            "amortizedNetCost": {
              "cost": 19.800393,
              "kubernetesPercent": 0
            },
            "invoicedCost": {
              "cost": 19.800393,
              "kubernetesPercent": 0
            },
            "amortizedCost": {
              "cost": 19.800393,
              "kubernetesPercent": 0
            }
          },
          "AWS/AWSCostExplorer": { ... },
          "AWS/AWSELB": { ... },
          "AWS/AWSGlobalAccelerator": { ... },
          ...
          "GCP/Secret Manager": { ... }
        },
        "aggregationProperties": [
          "provider",
          "service"
        ]
      }
    ],
    "window": {
      "start": "null",
      "end": "null"
    }
  }
}
```

### All billing items for a period of 3 days

A warning, this may return many megabytes of data depending on the cloud provider usage. Example output was heavily pared down from 17 megabytes.

```sh
curl -G http://localhost:9003/cloudCost \
  -d window=2023-10-28T00:00:00Z,2023-10-31T00:00:00Z
```

```json
{
  "code": 200,
  "data": {
    "sets": [
      {
        "cloudCosts": {
          ...
          "HDEAD-C6F51B-690123/mattray-opencost/GCP/__unallocated__/Management/Kubernetes Engine": {
            "properties": {
              "provider": "GCP",
              "accountID": "mattray-opencost",
              "invoiceEntityID": "HDEAD-C6F51B-690123",
              "service": "Kubernetes Engine",
              "category": "Management",
              "labels": {
                "goog-fleet-project": "",
                "goog-k8s-cluster-location": "australia-southeast1-b",
                "goog-k8s-cluster-name": "opencost-3",
                "longlived": "opencost"
              }
            },
            "window": {
              "start": "2023-10-28T00:00:00Z",
              "end": "2023-10-29T00:00:00Z"
            },
            "listCost": {
              "cost": 2.399978,
              "kubernetesPercent": 1
            },
            "netCost": {
              "cost": 2.399978,
              "kubernetesPercent": 1
            },
            "amortizedNetCost": {
              "cost": 2.399978,
              "kubernetesPercent": 1
            },
            "invoicedCost": {
              "cost": 2.399978,
              "kubernetesPercent": 1
            },
            "amortizedCost": {
              "cost": 2.399978,
              "kubernetesPercent": 1
            }
          },
          "HDEAD-C6F51B-690123/mattray-opencost/GCP/__unallocated__/Network/Networking": {
            "properties": {
              "provider": "GCP",
              "accountID": "mattray-opencost",
              "invoiceEntityID": "HDEAD-C6F51B-690123",
              "service": "Networking",
              "category": "Network"
            },
            "window": {
              "start": "2023-10-28T00:00:00Z",
              "end": "2023-10-29T00:00:00Z"
            },
            "listCost": {
              "cost": 0.46231399999999995,
              "kubernetesPercent": 0
            },
            "netCost": {
              "cost": 0.006336000000000003,
              "kubernetesPercent": 0
            },
            "amortizedNetCost": {
              "cost": 0.006336000000000003,
              "kubernetesPercent": 0
            },
            "invoicedCost": {
              "cost": 0.006336000000000003,
              "kubernetesPercent": 0
            },
            "amortizedCost": {
              "cost": 0.006336000000000003,
              "kubernetesPercent": 0
            }
          },
          ...
          "HDEAD-C6F51B-690123/mattray-opencost/GCP/gke-opencost-3-default-pool-123456f4-kbl5/Other/Compute Engine": {
            "properties": {
              "providerID": "gke-opencost-3-default-pool-123456f4-kbl5",
              "provider": "GCP",
              "accountID": "mattray-opencost",
              "invoiceEntityID": "HDEAD-C6F51B-690123",
              "service": "Compute Engine",
              "category": "Other",
              "labels": {
                "goog-gke-node": "",
                "goog-k8s-cluster-location": "australia-southeast1-b",
                "goog-k8s-cluster-name": "opencost-3",
                "goog-k8s-node-pool-name": "default-pool",
                "longlived": "opencost"
              }
            },
            "window": {
              "start": "2023-10-28T00:00:00Z",
              "end": "2023-10-29T00:00:00Z"
            },
            "listCost": {
              "cost": 0,
              "kubernetesPercent": 0
            },
            "netCost": {
              "cost": 0,
              "kubernetesPercent": 0
            },
            "amortizedNetCost": {
              "cost": 0,
              "kubernetesPercent": 0
            },
            "invoicedCost": {
              "cost": 0,
              "kubernetesPercent": 0
            },
            "amortizedCost": {
              "cost": 0,
              "kubernetesPercent": 0
            }
          },
          ...
        "window": {
          "start": "2023-10-30T00:00:00Z",
          "end": "2023-10-31T00:00:00Z"
        },
        "aggregationProperties": [
          "invoiceEntityID",
          "accountID",
          "provider",
          "providerID",
          "category",
          "service"
        ]
      }
    ],
    "window": {
      "start": "null",
      "end": "null"
    }
  }
}
```

## Postman

A collection of OpenCost Postman queries: [opencost.postman_collection.json](https://raw.githubusercontent.com/opencost/opencost/develop/docs/opencost.postman_collection.json)

> **Note**: Change the hostname in the Collection>Edit>Variables
