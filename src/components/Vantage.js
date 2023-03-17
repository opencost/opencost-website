import React from "react";
import VantageEnterprise from "/img/vantage/vantage-logo.svg";

export default function Vantage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4">
      <div className="px-8 py-4 sm:col-span-2 row-span-2 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h3 className="my-4">
          <VantageEnterprise className="max-w-xs" />
          <span className="sr-only">Vantage</span>
        </h3>

        <p className="pb-4">
          Vantage integrates with AWS, Azure, GCP, Snowflake, Datadog, Kubernetes via OpenCost and more to provide a single pane of glass view of cloud costs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
          <figure className="flex items-center gap-4 m-0">
            <img src="/img/vantage/vantage-multiple-providers.svg" alt="Multiple Providers Supported" className="w-10" />
            <figcaption>Multiple Providers Supported</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/vantage/vantage-anomaly-detection.svg"
              alt="Anomaly detection and alerting"
              className="w-10"
            />
            <figcaption>Anomaly detection and alerting</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/vantage/Vector.svg"
              alt="Autopilot: Save 50%+ on EC2"
              className="w-10"
            />
            <figcaption>Autopilot: Save 50%+ on EC2</figcaption>
          </figure>
          <figure className="flex items-center gap-4 m-0">
            <img
              src="/img/vantage/vantage-per-unit-costs.svg"
              alt="Track unit costs such as COGS"
              className="w-10"
            />
            <figcaption>Track unit costs such as COGS</figcaption>
          </figure>
        </div>

        <a
          href="https://vantage.sh"
          className="underline block pt-8 text-black dark:text-white group-hover/card:text-green-500 group-hover/card:font-black"
        >
          Learn more about the Vantage cloud cost management platform
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Getting Started</h4>
        <p>
          The Vantage documentation for OpenCost helps you integrate Kubernetes costs alongside other infrastructure costs.
        </p>
        <a
          href="https://docs.vantage.sh/opencost"
          className="underline text-black dark:text-white group-hover/card:text-green-500 group-hover/card:font-black"
        >
          Check it out
        </a>
      </div>

      <div className="px-8 py-4 rounded-xl border border-solid border-gray-200 dark:border-gray-800 group/card">
        <h4 className="text-3xl sm:text-2xl font-anek font-normal leading-snug">Cloud Cost Reports</h4>
        <p>
          Review spending trends on cloud infrastructure through quarterly reports assembled by the Vantage team.
        </p>
        <a
          href="https://www.vantage.sh/cloud-cost-report"
          className="underline text-black dark:text-white group-hover/card:text-green-500 group-hover/card:font-black"
        >
          Check it out
        </a>
      </div>
    </div>
  );
}
