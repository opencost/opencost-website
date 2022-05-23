import React from "react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="px-10 pt-5">
      <div className="flex flex-col gap-y-6">
        <div className="text-4xl md:text-5xl text-black font-semibold text-center flex items-center justify-center">
          Cost allocation, simplified
        </div>
        <div className="text-lg text-center flex items-center justify-center font-anek mt-5 max-w-2xl mx-auto leading-relaxed">
          Flexible, customizable cost breakdown and resource allocation for
          accurate showbacks, chargebacks, and ongoing monitoring.
        </div>
        <div className="flex flex-wrap justify-center gap-y-6">
          <FeatureCard
            icon="cost-allocation"
            description="Real-time cost allocation by Kubernetes service, deployment,
            namespace, label, statefulset, daemonset, pod, and container"
          />
          <FeatureCard
            description="Dynamic asset pricing enabled by integrations with AWS, Azure, and
            GCP billing APIs"
            icon="asset-pricing"
          />
          <FeatureCard
            description="Supports on-prem k8s clusters with custom pricing sheets"
            icon="custom"
          />
          <FeatureCard
            icon="gpu"
            description="Allocation for AWS &amp; GCP out-of-cluster resources like RDS instances and S3 buckets with key (optional)"
          />
          <FeatureCard
            icon="out-of-cluster"
            description="Allocation for in-cluster resources like CPU, GPU, memory, and
            persistent volumes"
          />
          <FeatureCard
            icon="export"
            description="Easily export pricing data to Prometheus with /metrics endpoint"
          />
          <FeatureCard
            icon="open-source"
            description="Free and open source distribution under the Apache 2.0 license"
          />
        </div>
      </div>
    </div>
  );
}
