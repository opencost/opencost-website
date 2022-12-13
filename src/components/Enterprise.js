import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Enterprise() {
    return (
        <div className="mt-20 md:mt-20 lg:mt-40 flex flex-col-reverse xl:flex-row items-center justify-center gap-x-60 px-10 sm:px-20 xl:px-40">
            <div className="flex flex-col gap-y-8 xl:gap-x-40 xl:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-anek font-semibold leading-snug">
                    Making cloud costs visible with open source & enterprise solutions
                </h1>
                <p className="lg:text-left text-base leading-relaxed">
                    OpenCost is an open source, CNCF project developed to help teams manage Kubernetes cloud cost in an environment that embraces community collaboration. With unified cost monitoring, customized alerts and so much more, we are on a mission to simplify cost management.
                </p>
                <h2 className="text-4xl sm:text-4xl font-anek font-semibold leading-snug">
                    Enterprise & Support
                </h2>
                <a href="https://kubecost.com" className="hover:no-underline">
                    <h3 className="text-4xl sm:text-3xl font-anek font-semibold leading-snug">
                        <img src="/img/kubecost/kubecost_graphic_mark.png" alt="Kubecost" height={25} />
                        Kubecost Enterprise
                    </h3>
                    <p className="lg:text-left text-base leading-relaxed">
                        Kubecost provides real-time cost visibility and insights for teams using Kubernetes, helping you continuously reduce your cloud costs.
                        <table>
                            <tr>
                                <td><img src="/img/kubecost/integrations.png" alt="Custom Integrations" height={25} /></td>
                                <td>Custom Integrations</td>
                                <td><img src="/img/kubecost/support.png" alt="Dedicated Enterprise Support" height={25} /></td>
                                <td>Dedicated Enterprise Support</td>
                            </tr>
                            <tr>
                                <td><img src="/img/kubecost/cluster.png" alt="Unified Multi-Cluster View" height={25} /></td>
                                <td>Unified Multi-Cluster View</td>
                                <td><img src="/img/kubecost/metrics.png" alt="Unlimited Metric Retention" height={25} /></td>
                                <td>Unlimited Metric Retention</td>
                            </tr>
                        </table>
                    </p>
                </a>
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
                <img className="w-full h-auto" src="/img/enterprise-stack.png" alt="Kubecost" />
            </div>
        </div>
    );
}
