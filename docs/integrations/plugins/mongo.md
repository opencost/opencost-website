---
sidebar_position: 9
title: MongoDB Atlas
---

# MongoDB Atlas Plugin 

:::note

*** MongoDB detailed costs are currently only retrievable for the current month. Historical costs from prior months are queryable if previously obtained ***

:::

## Setup Guide

1. Obtain plugin binary
   1. Visit https://github.com/opencost/opencost-plugins/releases and choose the most recent release
   1. Download the correct MongoDB binary for your architecture/OS
   1. Create a sibling directory to OpenCost called `plugins`
   1. In plugins directory, create two sub directories: `bin` and `config`
   1. Put the plugin binary in the `bin` dir, ensure it is executable
2. Visit the MongoDB Atlas organization administration platform and generate a public and private key
3. Obtain the organization ID from the administration page
4. Create `mongodb_atlas_config.json` in the `config` dir, with the API key generated in the prior step:
```json
      {
          "atlas_private_key": "<mongo_private_key>",
          "atlas_public_key": "<mongo_public_key>",
          "atlas_org_id":"<org_id>",
      }
```
1. Ensure you set the following env vars:
   1. `PLUGIN_EXECUTABLE_DIR`
   Should have the full path to the `bin` dir you set up
   2. `PLUGIN_CONFIG_DIR`
   Should have the full path to the `config` dir
   3. `CUSTOM_COST_ENABLED`
   Set to `“true”`
   4. Also, set `LOG_LEVEL` to `‘debug’`
2. Add in any other env vars you normally pass to OpenCost
3. Start the app

## Using the MongoDB Atlas plugin via the Helm chart
1. Update your local OpenCost Helm values file with the following settings:
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
      - mongodb-atlas
   # pre-existing secret for plugin configuration
   configSecret: ""

 configs:
   mongodb-atlas: |
      {
          "atlas_private_key": "<mongo_private_key>",
          "atlas_public_key": "<mongo_public_key>",
          "atlas_org_id":"<org_id>",
      }

opencost:
 exporter:
   cloudProviderApiKey: "AIzaSyDXQPG_MHUEy9neR7stolq6l0ujXmjJlvk"

```
2. Install/update your helm deployment with the values 
3. Confirm that, after waiting a few minutes for ingestion, your MongoDB costs are available in the UI
4. Logs should indicate that MongoDB costs are being fetched for recent windows
5. Debug logging can be enabled via the configuration file for enhanced debugging

## Example UI

Below is an example of visualizations from the MongoDB plugin in the OpenCost external costs UI:

![MDB_screenshot](mdb.png)