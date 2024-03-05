# Troubleshooting

### Receiving "Address family not supported by protocol" error message

If you receive this error message from the OpenCost container, there may be an issue with your default NGINX config.

Copy this [default config](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template) into your ConfigMap. Replace [this line](https://github.com/opencost/opencost/blob/develop/ui/default.nginx.conf.template#L62) in the config with `listen ${UI_PORT};` and mount it to your container. 

If you are still receiving errors, you may need to reconfigure your firewall/network policies.

