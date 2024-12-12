import React from "react";
import EnterpriseStacksImage from "/img/enterprise-stack.svg";

export default function EnterpriseHero({ className }) {
  return (
    <section className={`flex flex-col-reverse lg:flex-row items-end lg:items-center ${className}`}>
      <hgroup className="px-4 sm:px-8 basis-3/5">
        <h1 className="text-4xl sm:text-5xl font-anek font-normal pb-6">
          Making cloud costs visible with open source & enterprise solutions
        </h1>
        <p className="text-xl sm:text-2xl leading-relaxed sm:leading-11.5">
          OpenCost is an open source, CNCF project developed to help teams manage Kubernetes cloud
          costs in an environment that embraces community collaboration. 

        </p>

        <p className="text-xl sm:text-2xl leading-relaxed sm:leading-11.5">

          There are many downstream products that use OpenCost and vendors who provide enterprise level features 
          and support of OpenCost itself, and also build products that use OpenCost directly. To be listed as an
          OpenCost Enterprise Vendor, organizations must meet the following criteria:

          <ul>
              <li>Demonstrate a commitment to OpenCost’s maintenance and improvement
                  <ul>
                      <li>On average, has pull requests accepted monthly into OpenCost or its child projects for features and/or improvements</li>
                      <li>Help triage and comment on issues anywhere in the OpenCost ecosystem at least 5 times per month</li>
                  </ul>
              </li>

              <li>Demonstrate an area of expertise in the OpenCost ecosystem
                  <ul>
                      <li>Example: Employing one or more OpenCost maintainers</li>
                      <li>Example: Owning a specific high impact feature or process (testing system, release planning, etc)</li>
                  </ul>
              </li>

              <li>Participate in OpenCost’s governance
                  <ul>
                      <li>At least 2 members of the vendor’s team attend the community meetings at least 50% of the time</li>
                  </ul>
              </li>

              <li>Are OpenCost/FinOps thought leaders
                  <ul>
                      <li>Example: Sponsoring staff for the OpenCost booth at CNCF events</li>
                      <li>Example: Giving talks related to OpenCost or its ecosystem</li>
                  </ul>
              </li>

              <li>Provide enterprise level support and functionality for OpenCost or products based directly on it</li>
          </ul>

        </p>


      </hgroup>

      <figure className="pb-10 lg:pb-0 m-0 w-2/3 lg:w-auto flex grow items-end">
        <EnterpriseStacksImage className="sm:shrink-0 w-full max-w-[455px] stroke-[#231F20] dark:stroke-gray-600" />

        <span className="-ml-1 mb-[46px] h-[5px] grow bg-[#231F20] dark:bg-gray-600 hidden sm:block" />
      </figure>
    </section>
  );
}
