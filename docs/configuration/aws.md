---
sidebar_position: 1
title: Amazon Web Services
---

# Amazon Web Services Configuration

OpenCost will automatically read node information `node.spec.providerID` to determine the cloud service provider (CSP) in use. If it detects the CSP is Amazon Web Services (AWS), it will attempt to pull data for the following:
* AWS On-Demand pricing from the configured public API URL
* AWS [Spot Instance Data Feed](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-data-feeds.html) from the configured S3 bucket
* AWS cloud costs if configured [(see below)](#aws-cloud-cost-configuration).

## AWS On-Demand pricing configuration

OpenCost will request pricing data from the us-east-1 region using the template:
```sh
https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/${node_region}/index.json
```

This URL can be overwritten using the environment variable `AWS_PRICING_URL`.

## AWS Spot instance data feed configuration

### Prerequisites

* Set up [Spot Instance Data Feed](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-data-feeds.html).

### Configuration

The data feed will provide specific pricing information about any Spot instances in your account on an hourly basis. After setting this up, the bucket information can be provided through options in the AWS provider configuration file.
* `awsSpotDataBucket` - The name of the S3 bucket Spot Instance Data Feed is publishing to.
* `awsSpotDataRegion` - The region configured for Spot Instance Data Feed
* `awsSpotDataPrefix` - The prefix (if any) configured for Spot Instance Data Feed
* `projectID` - The AWS Account ID

Example configuration:
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

### Security for AWS integration

OpenCost uses the [AWS SDK for Go](https://aws.amazon.com/sdk-for-go/) to pull Spot data feed information. There are multiple supported ways to [configure security](https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials).

The recommeded setup is to leverage [IAM roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).

After creating the role and policy, attach the role as an annotation on the service account:

```sh
serviceAccount:
  create: true
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/S3Access
```

## AWS Cloud Cost Configuration

:::info

The Cloud Costs feature is included in the stable releases as of 1.108.0. Please ensure you have the latest release to access this new feature.

:::

To configure OpenCost for your AWS account, create an Access Key for the OpenCost user who has access to the Cost and Usage Report (CUR). Navigate to the [IAM Management Console dashboard](https://console.aws.amazon.com/iam), and select *Access Management > Users*. Find the OpenCost user and select *Security Credentials > Create Access Key*. Note the Access Key ID and Secret access key.

* `<ACCESS_KEY_ID>` is the ID of the Access Key created in the previous step.
* `<ACCESS_KEY_SECRET>` is the secret of the Access Key created in the
* `<ATHENA_BUCKET_NAME>` is the S3 bucket storing Athena query results which OpenCost has permission to access. The name of the bucket should match `s3://aws-athena-query-results-*`, so the IAM roles defined above will automatically allow access to it. The bucket can have a canned ACL set to Private or other permissions as needed.
* `<ATHENA_REGION>` is the AWS region Athena is running in
* `<ATHENA_DATABASE>` is the name of the database created by the Athena setup. The Athena database name is available as the value (physical id) of `AWSCURDatabase` in the CloudFormation stack created above.
* `<ATHENA_TABLE>` is the name of the table created by the Athena setup The table name is typically the database name with the leading `athenacurcfn_` removed (but is not available as a CloudFormation stack resource).
* `<ATHENA_WORKGROUP>` is the workgroup assigned to be used with Athena. Default value is `Primary`.
* `<ATHENA_PROJECT_ID>` is the AWS AccountID where the Athena CUR is. For example: `530337586277`.
* `<MASTER_PAYER_ARN>` is an optional value which should be set if you are using a multi-account billing set-up and are not accessing Athena through the primary account. It should be set to the ARN of the role in the management (formerly master payer) account, for example: `arn:aws:iam::530337586275:role/OpenCostRole`.

Set these values into the AWS array in the `cloud-integration.json`:

``` json
{
  "aws": {
    "athena": [
      {
        "bucket": "<ATHENA_BUCKET_NAME>",
        "region": "<ATHENA_REGION>",
        "database": "<ATHENA_DATABASE>",
        "table": "<ATHENA_TABLE>",
        "workgroup": "<ATHENA_WORKGROUP>",
        "account": "<ACCOUNT_NUMBER>",
        "authorizer": {
          "authorizerType": "AWSAccessKey",
          "id": "AKXXXXXXXXXXXXXXXXXXXX",
          "secret": "superdupersecret/superdupersecret"
        }
      }
    ]
  }
}
```
