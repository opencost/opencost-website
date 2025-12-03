---
slug: introducing-kubemodel
title: "Introducing KubeModel: OpenCost's Next-Generation Data Model"
authors: [sparshraj]
tags: [kubemodel, Data Model 2.0, Kubernetes, UID, mentorship, OpenCost]
---

OpenCost is evolving. As Kubernetes environments grow in complexity with pods being recreated, names being reused, and resources constantly shifting, the need for a more robust, scalable data model has become clear. Today, we're excited to introduce **KubeModel**, the foundation of OpenCost's Data Model 2.0, designed to bring precision, efficiency, and reliability to Kubernetes cost tracking.

<!--truncate-->

## The Challenge: Tracking Resources in a Dynamic Environment

Kubernetes is inherently dynamic. Pods come and go, deployments scale up and down, and resource names can be reused across recreation cycles. Traditional metric tracking that relies solely on resource names struggles in this environment:

- **Name reuse**: When a pod is recreated with the same name, historical cost data can become ambiguous
- **Resource correlation**: Linking metrics across different time windows becomes unreliable
- **Debugging complexity**: Without stable identifiers, tracing cost anomalies back to specific resource instances is challenging

KubeModel addresses these challenges head-on with a comprehensive approach to resource identification and tracking.

## What is KubeModel?

KubeModel is a new internal data model for Kubernetes resource tracking in OpenCost. It introduces a **flat architecture** with core resource types that mirror Kubernetes primitives:

- **Cluster** - The top-level container
- **Namespace** - Logical resource groupings
- **Node** - Compute instances with CPU, RAM, and GPU details
- **Pod** - The fundamental deployment unit
- **Container** - Individual workload containers
- **Owner/Controller** - Deployments, StatefulSets, ReplicaSets, DaemonSets, Jobs
- **Service** - Network service abstractions
- **Volume & PVC** - Persistent storage resources
- **ResourceQuota** - Namespace resource limits and requests

### Flat Architecture for Performance

Unlike nested hierarchies, KubeModel maintains a **flat map-based structure** enabling O(1) lookups while preserving resource relationships through UIDs and references. This design choice prioritizes:

- **Fast access**: Constant-time lookups regardless of cluster size
- **Clean relationships**: Resources reference each other via stable identifiers
- **Efficient serialization**: The flat structure translates well to binary formats

## UID Support: The Heart of Data Model 2.0

The cornerstone of KubeModel is comprehensive **UID (Unique Identifier) support** across all Kubernetes resources. Every resource in Kubernetes has a UID - a stable, unique identifier that persists for the lifetime of that specific resource instance.

### Enhanced Metric Tracking

With UID support integrated into OpenCost's metrics, we now have:

- **Stable resource identification** across queries, even when names are reused
- **Improved cost attribution** to specific resource instances rather than just names
- **Better multi-cluster support** by preventing resource name conflicts
- **Enhanced debugging** through stable identifiers throughout the resource lifecycle

### Implementation Scope

The UID implementation spans the entire OpenCost stack:

- **61+ metric result types** enhanced with UID fields
- **30+ Prometheus queries** updated to include UID in aggregation
- **9 resource types** with comprehensive UID validation
- **31 metrics** covered by integration tests

Resources enhanced include Pods, Deployments, StatefulSets, Services, Namespaces, Nodes, PersistentVolumes, PersistentVolumeClaims, Jobs, and ReplicaSets.

## Binary Serialization with Bingen

KubeModel introduces **bingen-annotated Go structs** enabling efficient binary serialization. Bingen is IBM Kubecost's internal tool for generating binary serialization code from annotated Go structs. This provides:

- **Compact storage**: Binary formats are significantly smaller than JSON/YAML
- **Fast serialization/deserialization**: Critical for high-frequency metric collection
- **FinOps-agent integration**: Compatible with date-based storage hierarchies (YYYY/MM/DD)

## Metric Hydration: Bridging Data Sources

The **metric hydration** system populates KubeModelSet instances with data from various sources:

- Prometheus metrics from the costmodel datasource
- Cluster cache transformations for real-time resource state
- Computed values like PublicIPSeconds per node for cloud cost attribution

This creates a unified view of resource metrics that can be serialized, stored, and analyzed efficiently.

## Integration Testing: Ensuring Reliability

A robust data model needs comprehensive testing. The KubeModel work includes extensive integration tests validating:

- **UID format compliance** against RFC 4122 UUID standards
- **Cross-window consistency** for stable infrastructure resources
- **Ephemeral resource handling** - recognizing that pods may be recreated between time windows
- **Metric emission verification** across 31 metrics and 9 resource types

These tests run across multiple time windows (1h, 6h, 24h) to ensure consistency and catch edge cases in real-world scenarios.

## The Road Ahead

KubeModel represents a significant step forward for OpenCost. The foundation is being laid through several contributions:

1. **Core resource types and KubeModelSet** - The fundamental data structures
2. **UID support across all metrics** - Stable resource identification
3. **Binary serialization pipeline** - Efficient storage and transmission
4. **ResourceQuota integration** - Tracking namespace-level resource constraints
5. **Comprehensive integration tests** - Ensuring reliability at scale
6. **S3 storage support** - Storing compressed KubeModel entries in S3 for scalable, durable, and cost-effective long-term data retention

This work is part of a broader effort to modernize OpenCost's architecture, making it more capable of handling the demands of enterprise Kubernetes environments.

## Get Involved

KubeModel is being developed in the open, and we welcome contributions. Check out the ongoing work:

- [Core KubeModel Introduction](https://github.com/opencost/opencost/pull/3472)
- [Flat Architecture with Binary Serialization](https://github.com/opencost/opencost/pull/3443)
- [UID Support for K8s Resource Metrics](https://github.com/opencost/opencost/pull/3366)
- [ResourceQuotas Support](https://github.com/opencost/opencost/pull/3435)

---

*KubeModel is the next evolution of OpenCost's data infrastructure. As we continue building out Data Model 2.0, we're excited to deliver more accurate, efficient, and reliable Kubernetes cost tracking for the community.*