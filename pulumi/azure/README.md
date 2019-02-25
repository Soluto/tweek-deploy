# Pulumi for Tweek on Azure

## Requirements
 * Azure account
 * `az` tool installed

## Configuration Parameters
|Parameter name|Description|Secret?|
|----|----|----|
|azure:environment|The Azure environment to use (`public`, `usgovernment`, `german`, `china`)|No|
|clusterPassword|Your new cluster password|Yes|
|valuesYaml|Your values.yaml file which overrides the default helm values|No|
|clusterNodeMachineType|GCP Machine type, default is n1-standard-1|No|
|clusterNodeCount|Number of K8s nodes|No|

## Creating Tweek GKE cluster
To create Tweek cluster in GKE run the following commands

```bash
az login
az account --subscription YOUR_SUBSCRIPTION
pulumi stack init YOUR_STACK_NAME
pulumi config set azure:environment public
pulumi config set clusterPassword --secret somelongpassword
pulumi config set sshPublicKey YOUR_SSH_PUBLIC_KEY
pulumi config set valuesYaml /path/to/values.yaml
pulumi up
```

Where `YOUR_SUBSCRIPTION` is the id of the subscription you want to use. You can skip this command if you only have one.
Instead of `YOUR_STACK_NAME` write the name you'd like to give to your stack.
The commands in the form of `pulumi config set` are used to set the configuration parameters,
described in the [configuration parameters](#configuration-parameters) section.
Instead of `YOUR_SSH_PUBLIC_KEY` put your ssh public key, which can be generated using `ssh-keygen -t rsa -f key.rsa`