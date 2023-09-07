---
sidebar_position: 1
---
# OpenCost Setup

OpenCost requires [Prometheus](prometheus) for scraping metrics and data storage. Follow the steps below to install OpenCost.

## Quick Start Installation

These commands will get you started immediately with OpenCost.

### Install Prometheus

```sh
helm install my-prometheus --repo https://prometheus-community.github.io/helm-charts prometheus-community/prometheus \
  --namespace prometheus --create-namespace \
  --set prometheus-pushgateway.enabled=false \
  --set alertmanager.enabled=false \
  -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
```

### Install OpenCost

```sh
kubectl apply --namespace opencost -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/opencost.yaml
```

That is all that is required for most installations. You can proceed to [testing](#testing) for verifying your installation.

## Testing

Once your OpenCost has been installed, wait for the pod to be ready and port forward with:

```sh
kubectl port-forward --namespace opencost service/opencost 9003 9090
```

To verify that the UI and server are running, you may access the OpenCost UI at [http://localhost:9090](http://localhost:9090).

To verify that the server is running, access [http://localhost:9003/allocation/compute?window=60m](http://localhost:9003/allocation/compute?window=60m)

You can see more [API Examples](../integrations/api) or use [kubectl cost](../integrations/kubectl-cost):

```sh
kubectl cost --service-port 9003 --service-name opencost --kubecost-namespace opencost --allocation-path /allocation/compute  \
    namespace \
    --window 5m \
    --show-efficiency=true
```

Output:

```
+---------+---------------+--------------------+-----------------+
| CLUSTER | NAMESPACE     | MONTHLY RATE (ALL) | COST EFFICIENCY |
+---------+---------------+--------------------+-----------------+
|         | opencost      |          18.295200 |        0.231010 |
|         | prometheus    |          17.992800 |        0.000000 |
|         | kube-system   |          11.383200 |        0.033410 |
+---------+---------------+--------------------+-----------------+
| SUMMED  |               |          47.671200 |                 |
+---------+---------------+--------------------+-----------------+
```

## Updating OpenCost
To update your OpenCost to the most recent version, using a previously unmodified `opencost.yaml` manifest, enter the following command. This will update OpenCost to the latest version.

```sh
kubectl -n opencost rollout restart deployment
```

To check logs to verify the version of your OpenCost:

```sh
$  kubectl logs -n opencost deployment/opencost | head
2022-09-02T18:20:34.327989163Z ??? Log level set to info
2022-09-02T18:20:34.328206357Z INF Starting cost-model (git commit "x.xx.x")
```

### Sidegrading OpenCost
If you wish to modify OpenCost to a previous version, start with the following command in order to modify the `opencost.yaml` manifest:

In the line `quay.io/kubecost1/kubecost-cost-model:latest`, change `latest` to the desired version number in the format `prod-x.xx.x`. Then enter the following command to apply the updated `opencost.yaml` manifest:

```sh
$ kubectl apply -f opencost.yaml -n opencost
namespace/opencost unchanged
serviceaccount/opencost unchanged
clusterrole.rbac.authorization.k8s.io/opencost unchanged
clusterrolebinding.rbac.authorization.k8s.io/opencost unchanged
deployment.apps/opencost configured
service/opencost unchanged
```

Finally, check the logs to verify the version of your OpenCost has successfully been changed:

```sh
$  kubectl logs -n opencost deployment/opencost | head
2022-09-02T18:20:34.327989163Z ??? Log level set to info
2022-09-02T18:20:34.328206357Z INF Starting cost-model (git commit "x.xx.x")
```

## Deleting OpenCost
To delete OpenCost, enter the following command:

`kubectl delete -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/opencost.yaml`

## Troubleshooting

If you get an error like this, check your Prometheus target is correct in the OpenCost deployment.

```bash
Error: failed to query allocation API: failed to port forward query: received non-200 status code 500 and data: {"code":500,"status":"","data":null,"message":"Error: error computing allocation for ...
```

Negative values for idle: ensure you added the scrape target (above) for OpenCost.

## Enabling Debugging

With the [v1.100 release](https://github.com/opencost/opencost/releases/tag/v1.100.0) you can temporarily set the log level of the OpenCost container without restarting the Pod. You can send a POST request to /logs/level with one of the valid log levels. This does not persist between Pod restarts, Helm deployments, etc. Here's an example:
```
curl -X POST \
    'http://localhost:9003/logs/level' \
    -d '{"level": "debug"}'
```
A GET request can be sent to the same endpoint to retrieve the current log level.

## Help

Please let us know if you run into any issues, we are here to help!

Join us on [CNCF Slack](https://slack.cncf.io/) in the [#opencost](https://cloud-native.slack.com/archives/C03D56FPD4G) channel if you have questions or contact us via email (<opencost@kubecost.com>).
