import * as fs from 'fs';
import * as helm from "@pulumi/kubernetes/helm";
import * as yaml from 'js-yaml';
import { cluster, config, provider } from "./cluster";
import { valuesYaml } from './config';

const tweek = new helm.v2.Chart(
    "tweek",
    {
        path: "../../helm/tweek/",
        values: yaml.safeLoad(fs.readFileSync(valuesYaml, { encoding: "UTF8" }))
    },
    { providers: { kubernetes: provider } }
);

export let clusterName = cluster.name;
export let kubeConfig = config;
export let serviceIP = tweek
    .getResourceProperty("v1/Service", "tweek-gateway-tweek", "status")
    .apply(status => status.loadBalancer.ingress[0].ip);