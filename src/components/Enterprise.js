import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Enterprise() {
  return (
    <section className="pt-20 flex flex-col-reverse xl:flex-row items-center justify-center px-10 sm:px-20 xl:px-40">
      <hgroup className="xl:w-2/3">
        <h1 className="text-4xl sm:text-5xl font-anek font-normal pb-6">
          Making cloud costs visible with open source & enterprise solutions
        </h1>
        <p>
          OpenCost is an open source, CNCF project developed to help teams manage Kubernetes cloud
          costs in an environment that embraces community collaboration. With unified cost
          monitoring, customized alerts and so much more, we are on a mission to simplify cost
          management.
        </p>
      </hgroup>

      <img className="w-full lg:w-5/12" src="/img/enterprise-stack.png" alt="Enterprise Stacks" />
    </section>
  );
}
