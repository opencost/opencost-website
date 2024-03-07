# Troubleshooting

## Reporting Issues

When asking a question in [Slack](community) or raising an issue in [GitHub](https://github.com/opencost/opencost/issues), make sure you can answer the following questions:
* Where are you running Kubernetes and which version are you using?
* [What version of OpenCost are you running](#getting-the-opencost-version)?
* How did you install OpenCost and what configurations did you apply?
* How did you install Prometheus? Did you do something custom?
* Are there any messages in the logging or UI that may indicate the source of issue?

## Getting the OpenCost version

You can find this in the beginning of the container logs or in the OpenCost UI at the bottom of the page.

```sh
$ kubectl logs -n opencost deployment/opencost | head

Defaulted container "opencost" out of: opencost, opencost-ui
2024-02-29T05:58:36.68395851Z ??? Log level set to info
2024-02-29T05:58:36.68436741Z INF Starting cost-model version 1.109.0 (fa84614)
```

## Enabling Debugging

You can temporarily set the log level of the OpenCost container without restarting the Pod. You can send a POST request to /logs/level with one of the valid log levels. This does not persist between Pod restarts, Helm deployments, etc. Here's an example:

```sh
curl -X POST \
    'http://localhost:9003/logs/level' \
    -d '{"level": "debug"}'
```
A GET request can be sent to the same endpoint to retrieve the current log level.

## Verifying Pricing

Prices are loaded when the OpenCost starts up and may be overridden with custom settings. You may verify these values by querying Prometheus:

```sh
kubectl port-forward -n prometheus-system service/prometheus-server 9003:80
curl -s 'http://localhost:9003/api/v1/query?query=node_cpu_hourly_cost' | jq '.data.result[0]'
Handling connection for 9003
{
  "metric": {
    "__name__": "node_cpu_hourly_cost",
    "arch": "arm64",
    "instance": "kind-control-plane",
    "job": "opencost",
    "node": "kind-control-plane",
    "provider_id": "kind://docker/kind/kind-control-plane"
  },
  "value": [
    1709811921.978,
    "1.25"
  ]
}
```

In the example above, we had a custom CPU price of `1.25`. Similarly you can query `node_ram_hourly_cost`, `node_total_hourly_cost`, and `pv_hourly_cost`.

## "Error: failed to query allocation API" error message

If you get an error like this, check your Prometheus target is correct in the OpenCost deployment.

```bash
Error: failed to query allocation API: failed to port forward query: received non-200 status code 500 and data: {"code":500,"status":"","data":null,"message":"Error: error computing allocation for ...
```

Negative values for idle: ensure you added the scrape target (above) for OpenCost.

## "Address family not supported by protocol" error message

If you receive this error message from the OpenCost container, there may be an issue with your default NGINX config.

Copy this [default config](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template) into your ConfigMap. Replace [this line](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template#L62) in the config with `listen ${UI_PORT};` and mount it to your container.

If you are still receiving errors, you may need to reconfigure your firewall/network policies.

## Help

Please let us know if you run into any issues, we are here to help!

Join us on [CNCF Slack](https://slack.cncf.io/) in the [#opencost](https://cloud-native.slack.com/archives/C03D56FPD4G) channel if you have questions or contact us via email (<opencost@kubecost.com>).
