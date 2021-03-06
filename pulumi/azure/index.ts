import * as helm from "@pulumi/kubernetes/helm";
import * as k8s from "@pulumi/kubernetes";
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { k8sCluster, k8sProvider } from "./cluster";
import { valuesYaml } from "./config";

const tweek = new helm.v2.Chart(
    "tweek",
    {
        path: "../../helm/tweek/",
        values: yaml.load(fs.readFileSync(valuesYaml, { encoding: "UTF8" }))
    },
    {
        providers: { kubernetes: k8sProvider }
    }
);

export let cluster = k8sCluster.name;
export let kubeConfig = k8sCluster.kubeConfigRaw;
export let serviceIP = tweek
    .getResourceProperty("v1/Service", "tweek-gateway-tweek", "status")
    .apply(status => status.loadBalancer.ingress[0].ip);
