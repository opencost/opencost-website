---
sidebar_position: 7
title: Guided Install with KubeStellar Console
---

# Guided Install with KubeStellar Console

[KubeStellar Console](https://console.kubestellar.io) offers a browser-based guided installation experience for OpenCost. The guided install mission walks through each step interactively, running commands against your cluster via your kubeconfig context.

## What the guided install provides

- **Pre-flight checks** — verifies cluster connectivity, Helm availability, and prerequisites before starting
- **Step-by-step commands** — each installation step is presented individually with explanations
- **Cluster validation** — confirms that OpenCost pods are running and healthy after installation
- **Troubleshooting** — surfaces common issues and suggests fixes if a step fails
- **Rollback support** — provides commands to cleanly uninstall if needed

## Getting started

1. Visit the [OpenCost guided install mission](https://console.kubestellar.io/missions/install-opencost)
2. Connect your kubeconfig context
3. Follow the step-by-step instructions

The mission definition is open source and available on GitHub:
[install-opencost.json](https://github.com/kubestellar/console-kb/blob/master/solutions/cncf-install/install-opencost.json)

## When to use the guided install

The guided install is a good fit if you:

- Are new to OpenCost and want a walkthrough of the installation process
- Want automated pre-flight validation before installing
- Prefer an interactive experience over running Helm commands manually

For full control over configuration options, see the [Helm installation guide](helm).
