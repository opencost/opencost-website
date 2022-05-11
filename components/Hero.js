import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="px-10 md:px-20 lg:px-40 bg-green-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-around lg:space-x-10 gap-y-10">
        <div className="flex flex-col heroTextWrapper space-y-10">
          <h1 className="text-5xl font-anek font-bold">
            Containers in the Cloud, bills down to Earth
          </h1>
          <p className="lg:text-left text-base font-light lg:pt-10">
            OpenCost is a vendor-neutral open source project for measuring and
            allocating infrastructure and container costs. Built by Kubernetes
            experts, supported by Kubernetes enthusiasts.
          </p>
          <div className="flex lg:justify-start">
            <button className="bg-green-300 hover:bg-green-800 text-black hover:text-white py-2 px-4 rounded-md">
              <FaGithub className="inline mr-2 mb-1 w-6 h-6" />
              Learn more
            </button>
          </div>
        </div>
        <div className="text-center lg:text-left pt-10 lg:pt-0 items-left">
          <Image
            src="/images/allocation-drilldown.gif"
            alt="dashboard"
            width={700}
            height={350}
            className="pb-20 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
