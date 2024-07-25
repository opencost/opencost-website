---
sidebar_position: 5
---
# Running in Docker

:::info

Support for running within Docker is included in the stable releases as of 1.109.0. Please ensure you have the latest release to access this new feature.

:::

Running OpenCost outside of Kubernetes will give you access to your [Cloud Costs](https://www.opencost.io/docs/configuration/#cloud-costs) via the [API](https://www.opencost.io/docs/integrations/api#cloud-costs-api) and UI, but you will not have Kubernetes Cost Allocation data available.

## Running OpenCost without Kubernetes

Given that not everyone who wants to look at their cloud billing is using Kubernetes, to run without Kubernetes you can either run from Docker or directly from the CLI. There are 2 environment variables you will need to set:
* `CLOUD_COST_ENABLED=true` (default is `false` since it's beta)
* `CLOUD_COST_CONFIG_PATH=/path/to/file` - you will need to [provide your credentials](https://www.opencost.io/docs/configuration/) in a file (default is `cloud-integration.json`). [Here’s an example file](https://gist.github.com/mattray/090a43aa4e64f8fc78572cd8d504a4b7).

### Running with Docker

If you want to run with Docker, you can pull down the image from [ghcr.io/opencost/opencost:1.109.0](https://github.com/opencost/opencost/pkgs/container/opencost):

`docker pull ghcr.io/opencost/opencost:1.109.0` (or `latest`)

and run it with

`docker run -e CLOUD_COST_ENABLED=true -e CLOUD_COST_CONFIG_PATH=/tmp/cloud-integration.json -p 9003:9003 -d -v /tmp:/tmp ghcr.io/opencost/opencost:1.109.0`

#### Docker Compose

If you prefer to use `docker compose`, you may tailor the following for your environment and OpenCost version:

```yaml title="opencost.yml"
name: opencost
version: '3'

services:
 opencost-cost-model:
  image: "ghcr.io/opencost/opencost:1.109.0"
  ports:
   - "9003:9003"
  volumes:
   - type: bind
     source: /tmp
     target: /tmp
  environment:
   - CLOUD_COST_ENABLED=true
   - CLOUD_COST_CONFIG_PATH=/path/to/cloud-integration.json
 opencost-ui:
  image: "ghcr.io/opencost/opencost-ui:1.109.0"
  ports:
   - "9090:9090"
  environment:
   - API_SERVER=opencost-cost-model
```

and run with
```
docker compose -f opencost.yml up
```


#### Accessing the Cloud Costs API

The OpenCost [Cloud Cost API](https://www.opencost.io/docs/integrations/api#cloudcost) is now exposed on port 9003, you can test with

`curl -G http://localhost:9003/cloudCost -d window=7d -d aggregate=provider | jq`

The [Cloud Cost API](https://www.opencost.io/docs/integrations/api#cloudcost) provides the available query parameters and the [API Examples](https://www.opencost.io/docs/integrations/api-examples#cloudcost-examples) show how you could query the Services by your Provider or how to get billing items over a range of time.

### Using the OpenCost UI from Docker

The OpenCost UI can be used to view Cloud Costs from Docker as well. You can pull down the image from from [ghcr.io/opencost/opencost-ui:1.109.0](https://github.com/opencost/opencost/pkgs/container/opencost-ui)

`docker pull ghcr.io/opencost/opencost-ui:1.109.0` (or `latest`)

and run it from Docker without Kubernetes:

`docker run -p 9090:9090 -e API_SERVER=host.docker.internal -d ghcr.io/opencost/opencost-ui:1.109.0`

Go to [http://localhost:9090/cloud](http://localhost:9090/cloud) to check it out. The **Cost Allocation** tab will be empty because there’s no Kubernetes data, but the **Cloud Costs** should have whatever clouds you’ve configured access.
