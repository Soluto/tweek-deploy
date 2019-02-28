# Helm chart for Tweek

This helm chart allows to deploy Tweek to Kubernetes and provides some useful defaults.
It can be deployed to  minikube, AWS, Azure and GCP.

## Installation on the Kubernetes cluster

Run the following command:
```
helm upgrade --install --namespace TWEEK --values /path/to/values.yaml test tweek/
```
Instead of `TWEEK` use the 

## Parameters in `values.yaml`

|Parameter|Description|
|---|---|
|apiReplicaCount|The number of API instances|
|gatewayReplicaCount|The number of gateway instances|
|domain|The domain name where tweek is hosted|
|imageVersions|Versions of the images of the different parts|
|minio|Minio/S3 configuration. Specify `accessKey`, `secretKey`, and `endpoint`|
|redis|The fields of `password` and `endpoint` for the redis connection. Leave `endpoint` empty to use the default redis provided with the chart.|
|keys|Cryptographic keys: `tweek_pfx_public_key` - PFX public key, `tweek_ssh_public_key` - SSH public key, `tweek_ssh_private_key` - SSH private key. Use generate_keys.sh script to generate these keys. IMPORTANT: do not use default values in production|
|dbvolume|Database volume for Kubernetes. Setup `size` and `storageClass` appropriate for you cluster and needs|
|gitvolume|Git repository volume for Kubernetes. Setup `size` and `storageClass` appropriate for you cluster and needs|
|gitRepo|The url of git repository. Leave blank to enable and use the default implementation provided with this chart|
|ingress|Ingress configuration. The meaning of `path`,  `annotations` and `tls` sections can be learned [here](https://kubernetes.io/docs/concepts/services-networking/ingress/). The value of `enabled` controlls whether ingress is enabled|
|gatewayJson|This value overrides gateway.json configuration file of tweek gateway|
|apiAutoscaling|Autoscaling rules for API|
|gatewayAutoscaling|Autoscaling rules for gateway|

### Autoscaling configuration

|Parameter|Description|
|---|---|
|enabled|Turn autoscaling on or off|
|minReplicas|Minimum replicas|
|maxReplicas|Maximum replicas|
|targetAverageUtilization|Target average CPU utilization %|

## Important notes

When deploying to production, it is highly recommended to deploy it with custom redis service as well as custom git repository. Both should be adequately desgined to be robust and fail tollerant. Managed solutions are recommended, e.g. your cloud provider's redis offering for redis and managed git hosting for git repository.
It is important to generate custom keys and use custom passwords everywhere to ensure your deployment is secure.