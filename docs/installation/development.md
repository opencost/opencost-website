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
2. Update `tilt-values.yaml` to desired attributes - [see documentation here.](https://github.com/opencost/opencost-helm-chart/blob/main/charts/opencost/README.md)
3. Update `Tiltfile` to allow your remote Kubernetes contexts, if desired. See comment block near top of the `Tiltfile`. [See documentation here.](https://docs.tilt.dev/api#api.allow_k8s_contexts)
4. If using `kind`, in a terminal, run `kind create cluster` to create local cluster, or set your Kubernetes context to the desired cluster.
5. In a terminal, run `tilt up -- --arch [amd64 or arm64] --docker-repo [repo or username]` at the root of the OpenCost repository
        `--arch amd64` will compile OpenCost for amd64 nodes, `--arch arm64` will compile for arm64 nodes
        `--docker_repo` is only required for remote development, or you want the images saved in Docker Hub. The value is prepended to the image tag (the -t flag in a Docker build command). [See Docker Documentation](https://docs.docker.com/engine/reference/commandline/build/#tag).
        Example: `tilt up -- --arch amd64 --docker-repo example` would build OpenCost for a Kubernetes node with an `amd64` architecture, and push the images to the Docker Hub user `example`.
6. Follow instructions to open the Tilt UI in browser (hit space, or navigate to http://localhost:10350)
7. As you update your code or `tilt-values.yaml`, Tilt will automatically watch relevant source code and recompile, build, deploy, and run tests.
8. `tilt down` will tear down resources created, otherwise they will continue to run indefinitely.
9. `kind delete` cluster will delete the local cluster, if desired.

## Attach Debugger to the Back End
The OpenCost back end auto starts with delve by default. Configure your IDE or text editor to attach to `http://localhost:40000`.

If you want to attach the debugger at startup, remove the `--continue` flag from the entrypoint in the `docker_build_with_restart` function in the `Tiltfile`, then connect the debugger. Once connected, the OpenCost back end will start.
