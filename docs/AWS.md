---
sidebar_position: 8
---

# AWS Integration

OpenCost will automatically read node information 'node.spec.providerID' to determine the Cloud Provider in use. If it detects the provider is AWS, it will attempt to pull data for the following:
* AWS On Demand Pricing from the configured public api url
* AWS [Spot Instance Data Feed](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-data-feeds.html) from the configured S3 bucket

## AWS On Demand Pricing configuration

OpenCost will request pricing data from us-east-1 using the template:
```sh
https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/${node_region}/index.json
```

This url can be overwritten using environment variable: 'AWS_PRICING_URL'

## AWS Spot Instance Data Feed configuration

Prerequisite: Set up [Spot Instance Data Feed](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-data-feeds.html).

The data feed will provide specific pricing information about any spot instances in your account on an hourly basis. After setting this up, the bucket information can be provided through options in the aws provider configuration file.
* awsSpotDataBucket - The name of the S3 bucket Spot Instance Data Feed is publishing to.
* awsSpotDataRegion - The region configured for Spot Instance Data Feed
* awsSpotDataPrefix - The prefix (if any) configured for Spot Instance Data Feed
* projectID - The AWS Account ID

Example Configuration:
```json
{
    "provider": "aws",
    "description": "AWS Provider Configuration. Provides default values used if instance type or spot information is not found.",
    "CPU": "0.031611",
    "spotCPU": "0.006655",
    "RAM": "0.004237",
    "GPU": "0.95",
    "spotRAM": "0.000892",
    "storage": "0.000138888889",
    "zoneNetworkEgress": "0.01",
    "regionNetworkEgress": "0.01",
    "internetNetworkEgress": "0.143",
    "spotLabel": "kops.k8s.io/instancegroup",
    "spotLabelValue": "spotinstance-nodes",
    "awsSpotDataRegion":"us-east-2",
    "awsSpotDataBucket": "my-spot-bucket",
    "awsSpotDataPrefix": "spot_pricing_prefix",
    "projectID": "012345678901"
}

```

### Security for AWS Integration

OpenCost uses the AWS go SDK to pull Spot Data Feed Information. There are multiple supported ways to [configure security](https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials).

The recommeded setup is to leverage [IAM roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html). 

After creating the role and policy, attach the role as an annotation on the service account.
```sh
serviceAccount:
  create: true
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/S3Access
```