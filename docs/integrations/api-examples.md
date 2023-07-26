---
sidebar_position: 3
---

# API Examples

The OpenCost `/allocation/compute` API has query parameters for `window`, `aggregate`, `accumulate`, and `resolution`. Below are several examples of queries using this API. Please refer to the [OpenCost API](api) for the full API specifics.

:::note
Throughout our API documentation, we use `localhost:9003` as the default OpenCost API URL, but your OpenCost instance may be exposed by a service or ingress. To reach the OpenCost API at port 9003, run: `kubectl -n opencost port-forward deployment/opencost 9003`. You may also expose the OpenCost UI on port 9090 with the command `kubectl -n opencost port-forward deployment/opencost 9003 9090`.
:::

## Default OpenCost UI

Here is an example of an OpenCost API query:

```sh
$ curl -G http://localhost:9003/allocation \
  -d window=7d \
  -d aggregate=namespace \
  -d accumulate=false \
  -d resolution=1m
```

This is the default query for the OpenCost UI and produces [output similar to this](/example-output.json).

## Allocation data for the last 60m, in steps of 10m, with resolution 1m, aggregated by namespace

```sh
curl http://localhost:9003/allocation/compute \
  -d window=60m \
  -d step=10m \
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

## Allocation data for the last 9d, in steps of 3d, with a 10m resolution, aggregated by namespace

```sh
curl http://localhost:9003/allocation/compute \
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

## Postman

A collection of OpenCost Postman queries: [opencost.postman_collection.json](https://raw.githubusercontent.com/opencost/opencost/develop/docs/opencost.postman_collection.json)

> **Note**: Change the hostname in the Collection>Edit>Variables
