# Pulumi for Tweek on AWS

## Requirements
 * AWS account
 * `aws` CLI tool installed
 * `aws-iam-authenticator` tool installed

## Configuration Parameters

|Parameter name|Description|
|----|----|
|aws:region|The AWS region to use (e.g.: `us-east-1`)|
|valuesYaml|Your values.yaml file which overrides the default helm values|
|nodeType|Requested node type|
|desiredCapacity|Requested number of nodes in the cluster|
|minSize|Minimum number of nodes in the cluster|
|maxSize|Maximum number of nodes in the cluster|

## Creating Tweek GKE cluster
To create Tweek cluster in GKE run the following commands

```bash
pulumi stack init YOUR_STACK_NAME
pulumi config set aws:region us-east-1
pulumi config set valuesYaml /path/to/values.yaml
pulumi up
```

Instead of `YOUR_STACK_NAME` write the name you'd like to give to your stack.
The commands in the form of `pulumi config set` are used to set the configuration parameters,
described in the [configuration parameters](#configuration-parameters) section.
