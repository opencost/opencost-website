import React from "react";

export default function Enterprise({ className }) {
  return (
    <section className={`flex flex-col-reverse md:flex-row items-end ${className}`}>
      <hgroup className="px-8">
        <h1 className="text-4xl sm:text-5xl font-anek font-normal pb-6">
          Making cloud costs visible with open source & enterprise solutions
        </h1>
        <p className="text-2xl leading-11.5">
          OpenCost is an open source, CNCF project developed to help teams manage Kubernetes cloud
          costs in an environment that embraces community collaboration. With unified cost
          monitoring, customized alerts and so much more, we are on a mission to simplify cost
          management.
        </p>
      </hgroup>

      <img
        className="w-full md:w-1/3 max-w-min"
        src="/img/enterprise-stack.png"
        alt="Enterprise Stacks"
      />
    </section>
  );
}
