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
