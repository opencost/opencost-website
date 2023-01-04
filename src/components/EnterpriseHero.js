import React from "react";
import EnterpriseStacksImage from "/img/enterprise-stack.svg";

export default function EnterpriseHero({ className }) {
  return (
    <section className={`flex flex-col-reverse lg:flex-row items-end lg:items-center ${className}`}>
      <hgroup className="px-8 basis-3/5">
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

      <figure className="pb-10 lg:pb-0 m-0 w-2/3 lg:w-auto flex grow items-end">
        <EnterpriseStacksImage className="sm:shrink-0 w-full max-w-[455px]" />

        <span className="-ml-1 mb-[46px] h-[5px] grow bg-[#231F20] hidden sm:block" />
      </figure>
    </section>
  );
}
