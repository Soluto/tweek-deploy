# Pulumi for Tweek on GCP

## Requirements
 * Google Cloud account credentials
 * `gcloud` tool installed

## Configuration Parameters
|Parameter name|Description|Secret?|
|----|----|----|
|gcp:project|The Google Cloud project to deploy into|
|gcp:zone|The Google Cloud zone|
|clusterPassword|Your new cluster password|Yes|
|valuesYaml|Your values.yaml file which overrides the default helm values|No|
|clusterNodeMachineType|GCP Machine type, default is n1-standard-1|No|
|clusterNodeCount|Number of K8s nodes|No|

## Creating Tweek GKE cluster
To create Tweek cluster in GKE run the following commands

```bash
pulumi stack init YOUR_STACK_NAME
pulumi config set gcp:project project-name
pulumi config set gcp:zone us-west1-a
pulumi config set clusterPassword somelongpassword
pulumi config set values.yaml /path/to/values.yaml
GOOGLE_APPLICATION_CREDENTIALS=credentials.json pulumi up
```

Where `credentials.json` is the file with credentials to your google account created in google console.
Instead of `YOUR_STACK_NAME` write the name you'd like to give to your stack.
The commands in the form of `pulumi config set` are used to set the configuration parameters,
described in the [configuration parameters](#configuration-parameters) section.
