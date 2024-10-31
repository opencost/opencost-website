import React from "react";
import RandoliLogo from "/img/randoli/randoli-logo.svg";

export default function Randoli() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4">
      <div className="px-8 py-4 sm:col-span-2 row-span-2 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h3 className="my-4">
          <RandoliLogo className="max-w-xs" />
          <span className="sr-only">Randoli App Insights Platform</span>
        </h3>

        <p className="pb-4">
          Randoli App Insights Platform provides Unified Observability for Cost, Troubleshoting & Security across all your Kubernetes clusters in a single-pane-of-glass.
          Our OpenCost backed Cost Management solution helps your teams to manage your cloud costs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
          <figure className="flex items-center gap-4 m-0">
            <img src="/img/randoli/cost-visibility.png" alt="Cost Visibility" className="w-10" />
            <figcaption>Cost Visibility</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/randoli/cost-alerts.png"
              alt="Cost Alerts"
              className="w-10"
            />
            <figcaption>Cost Alerts</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/randoli/rightsizing.png"
              alt="Workload & Cluster RightSizing"
              className="w-10"
            />
            <figcaption>Workload & Cluster RightSizing</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/randoli/cost-report.png"
              alt="Chageback Reports & Analytics"
              className="w-10"
            />
            <figcaption>Chageback Reports & Analytics</figcaption>
          </figure>
        </div>

        <a
          href="https://www.randoli.io"
          className="underline block pt-8 text-black dark:text-white group-hover/card:text-blue-500 group-hover/card:font-black"
        >
          Learn more about how Randoli AppInsights Platform can help you save costs
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Getting Started</h4>
        <p>
          Get started in a few easy steps .
        </p>
        <a
          href="https://docs.insights.randoli.io/"
          className="underline text-black dark:text-white group-hover/card:text-blue-500 group-hover/card:font-black"
        >
          Check it out
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Documentation</h4>
        <p>Learn how to setup & configure cost management features</p>
        <a
          href="https://docs.insights.randoli.io/cost-management/"
          className="underline text-black dark:text-white group-hover/card:text-blue-500 group-hover/card:font-black"
        >
          Check it out
        </a>
      </div>
    </div>
  );
}
