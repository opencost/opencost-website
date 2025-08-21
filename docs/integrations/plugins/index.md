---
sidebar_position: 9
title: Plugins
---

# OpenCost Plugin Notes

:::note

*** Support for plugins is available in the `1.110.0` release of opencost. ***

:::

Plugin Architecture: https://link.excalidraw.com/l/ABLQ24dkKai/CBEQtjH6Mr

## Plugin Downloading

The [OpenCost Helm chart](../../installation/helm) uses an init container to install the plugins the user has configured. The init container downloads the plugins and puts them in a local `emptydir` that is mounted in the standard OpenCost container. The plugins themselves run in the existing OpenCost process. See the diagram below for how plugins are delivered: 

![Plugin Delivery](Plugin%20Delivery.png)

OpenCost uses this approach of dynamically downloading the plugins to avoid container bloat. A single plugin could double the base OpenCost container image size - this allows OpenCost to scale to support many plugins by only downloading and installing the ones the user selects. This does not increase the number of running containers in an OpenCost installation, it only adds an init container.

## Plugin Guides

Specific guides on how to install plugins are linked below:

- [Datadog](./datadog.md)
- [OpenAI](./openai.md)
- [MongoDB Atlas](./mongo.md)
- [Backstage](./backstage.md)