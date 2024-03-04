---
sidebar_position: 6
---

# Setting up a Development Environment

Tilt is a great way to run OpenCost on a local or remote Kubernetes environment. Tilt automatically redeploys OpenCost when code or configuration changes, provides easy access to back end debugging, and automatically handles port forwarding.

## Prerequisites

### Required
- [Delve](https://github.com/go-delve/delve/) and the Delve plugin for your preferred IDE or text editor
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Docker Engine](https://docs.docker.com/engine/)
- [Go](https://go.dev/)
- [Helm](https://helm.sh/)
- [kind](https://kind.sigs.k8s.io/) or your preferred tool for a Kubernetes development environment
- [kubectl](https://kubernetes.io/docs/reference/kubectl/)
- [Node.js](https://nodejs.org/en)
- [Tilt](https://tilt.dev)

## Run OpenCost
1. In a terminal, run: `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
2. Update `tilt-values.yaml` or create a new yaml file to contain desired attributes - [see Helm chart.](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/README.md)
3. Optional - configure JSON files for cloud integration(s) and a service key [(see configuration documentation for more).](../configuration)
4. Update `Tiltfile` to allow your remote Kubernetes contexts, if desired. See comment block near top of the `Tiltfile`. [See tilt documentation here.](https://docs.tilt.dev/api#api.allow_k8s_contexts)
5. If using `kind`, in a terminal, run `kind create cluster` to create local cluster, or set your Kubernetes context to the desired cluster.
6. Configure a `tilt_config.json` file - [see Tilt Command Options below.](#tilt-command-options)
7. In a terminal, run `tilt up` at the root of the OpenCost repository. See [Tilt Command Options below for more options.](#options)
8. Follow instructions in the terminal to open the Tilt UI in browser.
9. As you update code, `tilt_config.json`, or `tilt-values.yaml`, Tilt will automatically watch relevant source code and recompile, build, deploy, and run tests.
10. `tilt down` will tear down resources created, otherwise they will continue to run indefinitely.
11. `kind delete` cluster will delete the local cluster, if desired.

## Tilt Command Options

### via `tilt_config.json`
The best way to configure OpenCost to use tilt is with a `tilt_config.json` file in the root of the OpenCost repository. The file must live there; a symlink is thebest alternative if you wish to store it elsewhere. This file is automatically reloaded in tilt when updated. Omitted values will use defaults.
Example file:
```JSON
{
  "arch":"amd64",
  "cloud-integration":"../cloud-integration.json"
}
```

### via CLI
These options can also be placed after `tilt up --`.
Example command:
`tilt up -- --arch arm64 --docker-repo dockerhub-username --cloud-integration ../cloud-integration.json --service-key ../service-key.json`
Options defined from the CLI will override those from `tilt_config.json`.

### Options
- `arch`
  Value: `amd64`(default),`arm64`
- `cloud-integration`
  Value: Path to a JSON file for cloud integrations
  Optional. Defaults to an empty string.
  This is the path to the JSON file to use for the `cloud-integration` secret. [See configuration documentation here.](../configuration)
- `delve-continue`
  Value: `true`(default) or `false`
  Optional, defaults to true. Determines if the `--continue` flag is used with delve. By default, this will let applications start without a debugger attached. `false` will wait for a debugger to attach before starting.
- `docker-repo` 
  Value: Docker Hub username or repository, defaults to an empty string.
  Required for a remote cluster, optional for local. 
  Optional. This is the CPU architecture of the desired node(s) on the cluster.
  The value is prepended to the docker image names (the -t flag in a Docker build command). [See Docker Documentation](https://docs.docker.com/engine/reference/commandline/build/#tag).
- `helm-values`
  Optional. Defaults to `./tilt-values.yaml`
  This is the path to the values.yaml file that will be used for the OpenCost helm chart.
- `service-key`
  Value: Path to a JSON file for a service key
  Optional. Defaults to an empty string.
  This is the path to the JSON file to use for the `service-key` secret. [See configuration documentation.](../configuration)
- `port-costmodel`
  Optional. Defaults to 9003.
  This is the port forwarded to localhost for the costmodel (back end).
  Note: In `tilt_config.json`, this is a string and must be in quotes, since Tilt options must be a bool or a string.
- `port-debug`
  Optional. Defaults to 40000.
  This is the port forwarded to localhost for delve.
  Note: In `tilt_config.json`, this is a string and must be in quotes, since Tilt options must be a bool or a string.
- `port-prometheus`
  Optional. Defaults to 9080.
  This is the port forwarded to localhost for Prometheus.
  Note: In `tilt_config.json`, this is a string and must be in quotes, since Tilt options must be a bool or a string.
- `port-ui`
  Optional. Defaults to 9090.
  This is the port forwarded to localhost for the web UI.
  Note: In `tilt_config.json`, this is a string and must be in quotes, since Tilt options must be a bool or a string.

## Attach Debugger to the Back End
The OpenCost back end auto starts with delve by default. Configure your IDE or text editor to attach to `http://localhost:40000` (or specified value of the `port-debug` option).

If you want to attach the debugger at startup, remove the `--continue` flag from the entrypoint in the `docker_build_with_restart` function in the `Tiltfile`, then connect the debugger. Once connected, the OpenCost back end will start.
