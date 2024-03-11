---
sidebar_position: 6
---

# Parquet Exporter

The [OpenCost Parquet Exporter](https://github.com/opencost/opencost-parquet-exporter) is an external tool that connects to OpenCost and exports data for a defined window of time in the [Apache Parquet](https://parquet.apache.org/) data format. Most users schedule a daily export using [Kubernetes CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/). The data may be exported to a filesystem or S3 objbect storage and ingested by tools such as AWS Athena.

## Installation

opencost-parquet-exporter is a Python application, the build instructions are included in the [README](https://github.com/opencost/opencost-parquet-exporter/blob/main/README.md) but you may use the container from the [GitHub Container Registry](https://github.com/opencost/opencost-parquet-exporter/pkgs/container/opencost-parquet-exporter).

## Configuration and Usage

Please refer to the [README](https://github.com/opencost/opencost-parquet-exporter/blob/main/README.md) for detailed instructions.
