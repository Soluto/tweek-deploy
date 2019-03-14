import { Config } from "@pulumi/pulumi";

const config = new Config();

/// Kubernetes config
export const clusterNodeCount = config.getNumber("clusterNodeCount") || 3;
export const clusterNodeMachineType = config.get("clusterNodeMachineType") || "n1-standard-1";

/// Helm config
export const valuesYaml = config.require("valuesYaml");