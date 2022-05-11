import React from "react";

export default function Features() {
  return (
    <div className="px-10 lg:px-40 pt-10 bg-green-100">
      <div className="flex flex-col gap-y-6">
        <div className="text-4xl text-black font-bold text-center pt-20 flex items-center justify-center font-anek">
          Cost allocation, simplified
        </div>
        <div className="text-xl text-neutral-600 font-light text-center flex items-center justify-center font-anek mt-5">
          Flexible, customizable cost breakdown and resource allocation for
          accurate showbacks, chargebacks, and ongoing monitoring.
        </div>
        <div className="flex mt-10 justify-center">
          <ul className="list-disc text-lg font-anek md:mx-40 lg:mx-80 space-y-5">
            <li>
              Real-time cost allocation by Kubernetes service, deployment,
              namespace, label, statefulset, daemonset, pod, and container
            </li>
            <li>
              Dynamic asset pricing enabled by integrations with AWS, Azure, and
              GCP billing APIs
            </li>
            <li>Supports on-prem k8s clusters with custom pricing sheets</li>
            <li>
              Allocation for in-cluster resources like CPU, GPU, memory, and
              persistent volumes
            </li>
            <li>
              Allocation for AWS &amp; GCP out-of-cluster resources like RDS
              instances and S3 buckets with key (optional)
            </li>
            <li>
              Easily export pricing data to Prometheus with /metrics endpoint
            </li>
            <li>
              Free and open source distribution under the Apache 2.0 license
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
