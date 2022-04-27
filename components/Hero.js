import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="pt-20 md:pt-60 lg:pt-80 px-10 md:px-20 lg:px-40 bg-green-100">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-around">
        <div className="flex flex-col heroTextWrapper space-y-10">
          <h1 className="text-5xl font-anek font-bold">
            Containers in the Cloud, bills down to Earth
          </h1>
          <p className="lg:text-left text-base font-light">
            OpenCost is a vendor-neutral open source project for measuring and
            allocating infrastructure and container costs. This community is
            maintained by Kubernetes practitioners and we welcome new
            contributions.
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
            src="/images/pig.png"
            alt="dashboard"
            width={500}
            height={500}
            className="pb-20"
          />
        </div>
      </div>
    </div>
  );
}
