import React from "react";

export default function Kubecost() {
  return (
    <div className="px-11 sm:px-22 xl:px-44 mt-8">
      <div className="grid grid-rows-2 grid-flow-col">

        <div className="row-span-2">
          <h3 className="text-4xl sm:text-3xl font-anek font-normal leading-snug mt-4">
            <img src="/img/kubecost/kubecost_graphic_mark.png" alt="Kubecost" height={25} className="pr-2"/>
            Kubecost Enterprise
          </h3>
          <div>
            <div>
              Kubecost provides real-time cost visibility and insights for teams using Kubernetes, helping you continuously reduce your cloud costs.
              <div className="grid grid-cols-2 gap-4 mt-8 mb-1">
                <div>
                  <img src="/img/kubecost/integrations.png" alt="Custom Integrations" height={25} className="pr-2"/>
                  Custom Integrations
                </div>
                <div>
                  <img src="/img/kubecost/support.png" alt="Dedicated Enterprise Support" height={25} className="pr-2"/>
                  Dedicated Enterprise Support
                </div>
                <div>
                  <img src="/img/kubecost/cluster.png" alt="Unified Multi-Cluster View" height={25} className="pr-2"/>
                  Unified Multi-Cluster View
                </div>
                <div>
                  <img src="/img/kubecost/metrics.png" alt="Unlimited Metric Retention" height={25} className="pr-2"/>
                  Unlimited Metric Retention
                </div>
              </div>
              <div className="mt-8">
                <a href="https://www.kubecost.com" className="underline">
                  Learn more about Kubecost’s mission to improve cost visibility
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/6 pl-11 sm:pl-22 xl:pl-44">
          <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug mt-4">
            Getting Started
          </h4>
          <p>
            Kubecost’s documentation helps to guide onboarding. It’s full of tips, tricks, and useful features you may have missed.
          </p>
          <a href="https://docs.kubecost.com" className="underline">
            Check it out
          </a>
        </div>

        <div className="w-5/6 pl-11 sm:pl-22 xl:pl-44">
          <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug mt-4">
            Tutorials
          </h4>
          <p>
            Read Kubecost’s Blog for in-depth tutorials on feature implementations.
          </p>
          <a href="https://blog.kubecost.com" className="underline">
            Check it out
          </a>
        </div>

      </div>
    </div>
  );
}
