import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Enterprise() {
    return (
        <div className="mt-20 md:mt-20 flex flex-col-reverse xl:flex-row items-center justify-center px-10 sm:px-20 xl:px-40">
            <div className="flex flex-col gap-y-8 xl:gap-x-40 xl:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-anek font-semibold leading-snug">
                    Making cloud costs visible with open source & enterprise solutions
                </h1>
                <p className="lg:text-left text-base leading-relaxed">
                    OpenCost is an open source, CNCF project developed to help teams manage Kubernetes cloud costs in an environment that embraces community collaboration. With unified cost monitoring, customized alerts and so much more, we are on a mission to simplify cost management.
                </p>
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
                <img className="w-full h-auto" src="/img/enterprise-stack.png" alt="Enterprise Stacks" />
            </div>
        </div>
   );
}
