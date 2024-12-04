---
sidebar_position: 9
title: Datadog
---

# Datadog Plugin 

:::note

*** DataDog costs can take up to 72 hours to appear in OpenCost ***

:::

## Setup Guide

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
 "datadog_api_key": "<datadog_api_key>",
 "datadog_app_key": "<datadog_app_key>"
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
   enabledPlugins:
      - datadog
	# pre-existing secret for plugin configuration
   configSecret: ""

 configs:
   datadog: |
      {
      "datadog_site": "us5.datadoghq.com",
      "datadog_api_key": "<datadog_api_key>",
      "datadog_app_key": "<datadog_app_key>"
      }

opencost:
 exporter:
   cloudProviderApiKey: "AIzaSyDXQPG_MHUEy9neR7stolq6l0ujXmjJlvk"

```
3. Confirm that looking at the pod logs shows Datadog queries going through

## Example UI

Below is an example of visualizations from the DataDog plugin in the OpenCost external costs UI:

![DD_screenshot](dd_plugin.png)