import React from "react";

export default function Kubecost() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
      <div className="px-8 py-4 col-span-2 row-span-2 rounded-xl border border-solid border-gray-200">
        <h3 className="my-4 leading-8 -indent-96 overflow-hidden bg-auto bg-no-repeat bg-[url('/img/kubecost/kubecost-enterprise.svg')]">
          Kubecost Enterprise
        </h3>

        <p className="pb-4">
          Kubecost provides real-time cost visibility and insights for teams using Kubernetes,
          helping you continuously reduce your cloud costs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <figure className="flex items-center gap-4 m-0">
            <img src="/img/kubecost/integrations.png" alt="Custom Integrations" className="w-10" />
            <figcaption>Custom Integrations</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/kubecost/support.png"
              alt="Dedicated Enterprise Support"
              className="w-10"
            />
            <figcaption>Dedicated Enterprise Support</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/kubecost/cluster.png"
              alt="Unified Multi-Cluster View"
              className="w-10"
            />
            <figcaption>Unified Multi-Cluster View</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/kubecost/metrics.png"
              alt="Unlimited Metric Retention"
              className="w-10"
            />
            <figcaption>Unlimited Metric Retention</figcaption>
          </figure>
        </div>

        <a href="https://www.kubecost.com" className="underline block pt-8">
          Learn more about Kubecost’s mission to improve cost visibility
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Getting Started</h4>
        <p>
          Kubecost’s documentation helps to guide onboarding. It’s full of tips, tricks, and useful
          features you may have missed.
        </p>
        <a href="https://docs.kubecost.com" className="underline">
          Check it out
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Tutorials</h4>
        <p>Read Kubecost’s Blog for in-depth tutorials on feature implementations.</p>
        <a href="https://blog.kubecost.com" className="underline">
          Check it out
        </a>
      </div>
    </div>
  );
}
