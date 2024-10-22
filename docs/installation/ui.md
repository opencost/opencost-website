---
sidebar_position: 4
---
# OpenCost UI

The OpenCost UI is included in the default installation of OpenCost and provides a visualization of the Kubernetes allocations and the related Cloud Costs. This walkthrough highlights some of the components of the OpenCost UI:

<iframe width="840" height="472" src="https://www.youtube.com/embed/lCP4Ci9Kcdg?si=RuDM3e0cKNFgWvpE" title="OpenCost UI Tour" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## kubectl port-forward

Once your OpenCost has been [installed](install), wait for the pod to be ready and port forward with:

```
kubectl port-forward --namespace opencost service/opencost 9003 9090
```

To verify that the UI and server are running, you may access the OpenCost UI at [http://localhost:9090](http://localhost:9090).

## Ingress for OpenCost UI

If you want to open more semi-permanent access to the OpenCost UI you may add an [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) rule.

Save the following to an `ingress.yaml` and apply it with `kubectl apply -f ingress.yaml -n opencost`

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: opencost-ingress
  namespace: opencost
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: opencost
                port:
                  name: opencost-ui
```

This is also supported in the [Helm chart](helm), add the following to the relevant section of your `local.yaml` and apply via Helm.

``` yaml
opencost:
  ui:
    enabled: true
    ingress:
      enabled: true
      hosts:
        - host: HOSTNAME
          paths:
            - /
```

You should now have access via http://HOSTNAME

## UI Development

The source for the OpenCost UI is in [[https://github.com/opencost/opencost/tree/develop/ui](https://github.com/opencost/opencost-ui)]([https://github.com/opencost/opencost/tree/develop/ui](https://github.com/opencost/opencost-ui)) with instructions for developing locally.
