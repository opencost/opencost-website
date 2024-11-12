---
sidebar_position: 9
title: OpenAI
---

# OpenAI Plugin 

:::note

*** OpenAI costs are not currently available per snapshot ***

:::

## Setup Guide

1. Obtain plugin binary
   1. Visit https://github.com/opencost/opencost-plugins/releases and choose the most recent release
   1. Download the correct OpenAI binary for your architecture/OS
   1. Create a sibling directory to OpenCost called `plugins`
   1. In plugins directory, create two sub directories: `bin` and `config`
   1. Put the plugin binary in the `bin` dir, ensure it is executable
2. Visit the OpenAI developer platform and generate an API key
3. Create `openai_config.json` in the `config` dir, with the API key generated in the prior step:
```json
      {
        "openai_api_key": "sk-proj-XXXX"
      }
```
4. Ensure you set the following env vars:
   1. `PLUGIN_EXECUTABLE_DIR`
   Should have the full path to the `bin` dir you set up
   2. `PLUGIN_CONFIG_DIR`
   Should have the full path to the `config` dir
   3. `CUSTOM_COST_ENABLED`
   Set to `“true”`
   4. Also, set `LOG_LEVEL` to `‘debug’`
5. Add in any other env vars you normally pass to OpenCost
6. Start the app

## Using the OpenAI plugin via the Helm chart
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
      - openai
   # pre-existing secret for plugin configuration
   configSecret: ""

 configs:
   openai: |
      {
        "openai_api_key": "sk-proj-XXXX"
      }

opencost:
 exporter:
   cloudProviderApiKey: "AIzaSyDXQPG_MHUEy9neR7stolq6l0ujXmjJlvk"

```
2. Install/update your helm deployment with the values 
3. Confirm that, after waiting a few minutes for ingestion, your OpenAI costs are available in the UI
4. Logs should indicate that OpenAI costs are being fetched for recent windows

## Example UI

Below is an example of visualizations from the OpenAI plugin in the OpenCost external costs UI:

![OAI_screenshot](oai.png)