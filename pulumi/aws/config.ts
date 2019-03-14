import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Parse and export configuration variables for this stack.
const config = new pulumi.Config();
export const desiredCapacity = config.getNumber("desiredCapacity") || 2;
export const minSize = config.getNumber("minSize") || 2;
export const maxSize = config.getNumber("maxSize") || 4;
export const nodeType = (config.get("nodeType") || "t2.medium") as aws.ec2.InstanceType;
export const valuesYaml = config.require("valuesYaml");
