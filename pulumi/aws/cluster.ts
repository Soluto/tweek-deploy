import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";
import * as k8s from '@pulumi/kubernetes';
import { nodeType, desiredCapacity, minSize, maxSize } from "./config";

// Create a VPC for our cluster.
const vpc = new awsx.Network("tweek");

// Create the EKS cluster itself, including a "gp2"-backed StorageClass and a dpeloyment of the Kubernetes dashboard.
export const k8sCluster = new eks.Cluster("tweek", {
    vpcId: vpc.vpcId,
    subnetIds: vpc.subnetIds,
    instanceType: nodeType,
    desiredCapacity: desiredCapacity,
    minSize: minSize,
    maxSize: maxSize,
    storageClasses: "gp2",
    deployDashboard: true,
});


// Expose a K8s provider instance using our custom cluster instance.
export const k8sProvider = new k8s.Provider("tweekK8s", {
    kubeconfig: k8sCluster.kubeconfig.apply(c => JSON.stringify(c))
});