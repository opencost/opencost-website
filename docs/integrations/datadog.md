---
sidebar_position: 9
title: Datadog
---

# Datadog/OpenCost Plugin Notes

:::note

*** Support for the Datadog plugin is in the current `develop` branch and will be available in OpenCost 1.110. ***

:::

These instructions are _very_ rough and will continue to get revised as we approach release.

Plugin Architecture: https://link.excalidraw.com/l/ABLQ24dkKai/CBEQtjH6Mr

## Plugin Downloading

The [OpenCost Helm chart](../installation/helm) uses an init container to install the plugins the user has configured. The init container downloads the plugins and puts them in a local `emptydir` that is mounted in the standard OpenCost container. The plugins themselves run in the existing OpenCost process.

OpenCost uses this approach of dynamically downloading the plugins to avoid container bloat. A single plugin could double the base OpenCost container image size - this allows OpenCost to scale to support many plugins by only downloading and installing the ones the user selects. This does not increase the number of running containers in an OpenCost installation, it only adds an init container.

## OpenCost Datadog Plugin Setup Guide

1. Obtain plugin binary
   1. Visit https://github.com/opencost/opencost-plugins/releases and choose the most recent release
   1. Download the correct binary for your architecture/OS
   1. Create a sibling directory to OpenCost called `plugins`
   1. In plugins directory, create two sub directories: `bin` and `config`
   1. Put the plugin binary in the `bin` dir, ensure it is executable
2. Create `datadog_config.json` in the `config` dir, with the following contents:
```json
{
 "datadog_site": "us5.datadoghq.com",
 "datadog_api_key": "c508d4fd3d126abbbbdc2fe96b0f6613",
 "datadog_app_key": "f357b1f4efefb0870109e0d1aa0cb437b5f10ab9"
}
```
3. Ensure you set the following env vars:
   1. `PLUGIN_EXECUTABLE_DIR`
   Should have the full path to the `bin` dir you set up
   1. `PLUGIN_CONFIG_DIR`
   Should have the full path to the `config` dir
   1. `CUSTOM_COST_ENABLED`
   Set to `“true”`
   1. Also, set `LOG_LEVEL` to `‘debug’`
4. Add in any other env vars you normally pass to OpenCost
5. Start the app
6. You should see a lot of debug output from the Datadog plugin
7. After the ingestion completes, the info should be available in the repo objects, for both hourly and daily

## Testing the Helm chart
1. Support has been merged into the OpenCost Helm chart
2. Update your local OpenCost Helm values file with the following settings:
```yaml
loglevel: debug
plugins:
 enabled: true
 install:
   enabled: true
   fullImageName: curlimages/curl:latest
   folder: /opt/opencost/plugin
   # leave this commented to always download most recent version of plugins
    #version: <INSERT_SPECIFIC_PLUGINS_VERSION>
   # leave this commented to always download most recent version of plugins
   # version: <INSERT_SPECIFIC_PLUGINS_VERSION>
	# the list of enabled plugins
	enabledPlugins: []
  	# - datadog
	# pre-existing secret for plugin configuration
	configSecret: ""

 configs:
   datadog: |
      {
      "datadog_site": "us5.datadoghq.com",
 "datadog_api_key": "c508d4fd3d126abbbbdc2fe96b0f6613",
 "datadog_app_key": "f357b1f4efefb0870109e0d1aa0cb437b5f10ab9"
      }

opencost:
 exporter:
   cloudProviderApiKey: "AIzaSyDXQPG_MHUEy9neR7stolq6l0ujXmjJlvk"
   image:
     registry:  gcr.io
     # -- Exporter container image name
     repository: guestbook-227502/opencost
     # -- Exporter container image tag
     # @default -- `""` (use appVersion in Chart.yaml)
     tag: plugin-spike-03062024
```
3. Confirm that looking at the pod logs shows Datadog queries going through



## Datadog API

### `customCost/total`

Used to grab a summary of custom costs over a window.

Available aggregations:
<table>
<tr>
<th id="window">window=<a class="hash-link" href="#a_window" title="window">​</a></th>
<th/>
</tr>
<tr>
<td valign="top"><b>required</b></td>
<td>
      Duration of time over which to query. Accepts: words like <code>today</code>, <code>week</code>, <code>month</code>, <code>yesterday</code>, <code>lastweek</code>, <code>lastmonth</code>; durations like <code>30m</code>, <code>12h</code>, <code>7d</code>; <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date pairs like <code>2021-01-02T15:04:05Z,2021-02-02T15:04:05Z</code>; <a href="https://www.unixtimestamp.com/">Unix timestamps</a> like <code>1578002645,1580681045</code>.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>window=today</code> - The current day</li>
        <li><code>window=month</code> - The month-to-date</li>
        <li><code>window=lastweek</code> - The previous week</li>
        <li><code>window=30m</code> - The last 30 minutes</li>
        <li><code>window=12h</code> - The last 12 hours</li>
        <li><code>window=7d</code> - The previous 7 days</li>
        <li><code>window=2023-01-18T10:30:00Z,2023-01-19T10:30:00Z</code> - <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date/time range</li>
        <li><code>window=1674073869,1674193869</code> - <a href="https://www.unixtimestamp.com/">Unix timestamp</a> range</li>
      </ul>
    </td>
  </tr>
<tr>
  <th id="aggregate">aggregate=<a class="hash-link" href="#a_aggregate" title="aggregate">​</a></th>
  <th/>
</tr>
<tr>
<td/><td>
zone
</td>
</tr>
<tr>
<td/><td>
accountName
</td>
</tr>
<tr>
<td/><td>
chargeCategory
</td>
</tr>
<tr>
<td/><td>
description
</td>
</tr>
<tr>
<td/><td>
resourceName
</td>
</tr>
<tr>
<td/><td>
resourceType
</td>
</tr>
<tr>
<td/><td>
providerId
</td>
</tr>
<tr>
<td/><td>
usageUnit
</td>
</tr>
<tr>
<td/><td>
domain
</td>
</tr>
<tr>
<td/><td>
costSource
</td>
</tr>
<tr>
  <th id="filter">filter=<a class="hash-link" href="#a_filter" title="filter">​</a></th>
  <td>The available filters are the same as the available aggregations. For example:</td>
</tr>
<tr>
<td/><td>
filter=domain:"datadog"
</td>
</tr>
<tr>
<td/><td>
filter=zone:"us"
</td>
</tr>
<tr>
<td/><td>
filter=resourceType:"infra_hosts"
</td>
</tr>
</table>

### `customCost/timeseries`

Essentially equivalent to calling `/total` over a range of time steps. For example, querying for the past 7 days will give you a `/total` response for each of those days, individually. All available aggregations and filters are the same as with `/total`

## Datadog API Examples

### Totals request, aggregating by domain over the past 7 days:

https://example.opencost.io/model/customCost/total?window=7d&aggregate=domain

Response:
```json
{
  "code": 200,
  "data": {
    "window": {
      "start": "2024-03-14T00:00:00Z",
      "end": "2024-03-21T00:00:00Z"
    },
    "totalBilledCost": 147.37999,
    "totalListCost": 186.98547,
    "customCosts": [
      {
        "id": "",
        "zone": "us",
        "account_name": "Kubecost",
        "charge_category": "",
        "description": "",
        "resource_name": "",
        "resource_type": "",
        "provider_id": "",
        "billedCost": 147.37999,
        "listCost": 186.98547,
        "list_unit_price": 0.082197905,
        "usage_quantity": 120,
        "usage_unit": "",
        "domain": "datadog",
        "cost_source": "observability",
        "aggregate": "datadog"
      }
    ]
  }
}
```

### Totals request, aggregating by providerId over the past 7 days:

https://example.opencost.io/model/customCost/total?window=7d&aggregate=providerId

Response:
```json
{
  "code": 200,
  "data": {
    "window": {
      "start": "2024-03-14T00:00:00Z",
      "end": "2024-03-21T00:00:00Z"
    },
    "totalBilledCost": 147.37999,
    "totalListCost": 186.98546,
    "customCosts": [
      {
        "id": "",
        "zone": "us",
        "account_name": "Kubecost",
        "charge_category": "usage",
        "description": "350+ integrations, alerting, custom metrics & unlimited user accounts",
        "resource_name": "agent_host_count",
        "resource_type": "infra_hosts",
        "provider_id": "42c0ac62-8d80-11ed-96f3-da7ad0900005/agent_host_count",
        "billedCost": 0,
        "listCost": 8.876712,
        "list_unit_price": 0.073972605,
        "usage_quantity": 360,
        "usage_unit": "Infra Host - hours",
        "domain": "datadog",
        "cost_source": "observability",
        "aggregate": "42c0ac62-8d80-11ed-96f3-da7ad0900005/agent_host_count"
      },
      {
        "id": "",
        "zone": "us",
        "account_name": "Kubecost",
        "charge_category": "usage",
        "description": "Centralize your monitoring of systems and services (Per Container)",
        "resource_name": "container_count_excl_agent",
        "resource_type": "infra_hosts",
        "provider_id": "42c0ac62-8d80-11ed-96f3-da7ad0900005/container_count_excl_agent",
        "billedCost": 0,
        "listCost": 19.80274,
        "list_unit_price": 0.0041095894,
        "usage_quantity": 14456,
        "usage_unit": "Container - hours",
        "domain": "datadog",
        "cost_source": "observability",
        "aggregate": "42c0ac62-8d80-11ed-96f3-da7ad0900005/container_count_excl_agent"
      }
...
    ]
  }
}
```
