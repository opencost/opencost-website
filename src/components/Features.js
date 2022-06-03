import React from "react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="px-10 pt-5">
      <div className="flex flex-col gap-y-6">
        <div className="text-4xl md:text-5xl text-black font-semibold text-center flex items-center justify-center">
          Cost allocation, simple &amp; standard
        </div>
        <div className="text-lg text-center flex items-center justify-center font-anek mt-5 max-w-2xl mx-auto leading-relaxed">
          Flexible, customizable cost allocation and resource monitoring for
          accurate showback, chargeback, and ongoing reporting.
        </div>
        <div className="flex flex-wrap justify-center gap-y-6">
          <FeatureCard
            icon="cost-allocation"
            description="Real-time cost allocation, broken down by Kubernetes concepts down to the container level"
          />
          <FeatureCard
            description="Dynamic asset pricing, through integrations with AWS, Azure, and GCP billing APIs"
            icon="asset-pricing"
          />
          <FeatureCard
            description="Support for on-prem Kubernetes clusters, using custom pricing sheets"
            icon="custom"
          />
          <FeatureCard
            icon="gpu"
            description="Monitoring of AWS &amp; GCP out-of-cluster resources like RDS instances and S3 buckets"
          />
          <FeatureCard
            icon="out-of-cluster"
            description="Allocation for in-cluster resources like CPU, GPU, memory, load balancers and persistent volumes"
          />
          <FeatureCard
            icon="export"
            description="Integrations with other open source tooling, such as easy pricing data exports to Prometheus"
          />
          <FeatureCard
            icon="open-source"
            description="Forever free and open source, supported and maintained by experts"
          />
        </div>
      </div>
    </div>
  );
}
