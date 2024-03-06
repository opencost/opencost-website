# Troubleshooting

## Reporting Issues

When asking a question in [Slack](community) or raising an issue in [GitHub](https://github.com/opencost/opencost/issues), make sure you can answer the following questions:
* Where are you running Kubernetes and which version are you using?
* What version of OpenCost are you running? You can find this in the beginning of the container logs or in the OpenCost UI at the bottom of the page.
* How did you install OpenCost and what configurations did you apply?
* How did you install Prometheus? Did you do something custom?
* Are there any messages in the logging or UI that may indicate the source of issue?

## Enabling Debugging

You can temporarily set the log level of the OpenCost container without restarting the Pod. You can send a POST request to /logs/level with one of the valid log levels. This does not persist between Pod restarts, Helm deployments, etc. Here's an example:
```
curl -X POST \
    'http://localhost:9003/logs/level' \
    -d '{"level": "debug"}'
```
A GET request can be sent to the same endpoint to retrieve the current log level.

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
