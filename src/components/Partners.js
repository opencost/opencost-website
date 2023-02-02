import React from "react";

export default function Partners() {
  return (
    <div
      className="px-10 py-20 md:py-32 mt-20 md:mt-60"
      // style={{ backgroundColor: "#e5e5e5" }}
    >
      <div className="flex flex-col gap-y-6">
        <div className="text-4xl md:text-5xl font-semibold text-center flex items-center justify-center">
          Contributors
        </div>
        <div className="text-lg text-center flex items-center justify-center font-anek mt-5 max-w-5xl mx-auto leading-relaxed">
          OpenCost is led by a network of Kubernetes experts, and supported by a
          community of Kubernetes practitioners.
        </div>
      </div>
      <div className="flex justify-center xl:mt-10">
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-2 max-w-5xl mx-auto">
          <a href="https://www.adobe.com/" target="_blank" rel="noopener noreferrer">
          <div className="w-56 h-52 pb-3 items-center flex">
            <img src="/img/adobe.png" alt="Adobe"/>
          </div></a>
          <a href="https://www.armory.io/" target="_blank" rel="noopener noreferrer">
          <div className="w-52 h-52 items-center flex">
            <img src="/img/armory.png" alt="Armory"/>
          </div></a>
          <a href="https://www.aws.amazon.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-40 h-52 items-center flex justify-center">
            <img src="/img/aws.png" alt="AWS" />
          </div></a>
          <a href="https://www.d2iq.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-52 h-52 items-center flex justify-center">
            <img src="/img/d2iq.png" alt="D2IQ" height={120} width={120} />
          </div></a>
          <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-72 h-52 items-center flex">
            <img src="/img/google.png" alt="Google Cloud" />
          </div></a>
          <a href="https://grafana.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-72 h-52 items-center flex">
            <img src="/img/grafana_logo-web.svg" alt="Grafana" />
          </div></a>
          <a href="https://www.kubecost.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-72 h-52 items-center flex pb-3">
            <img src="/img/kubecost.png" alt="Kubecost" />
          </div></a>
          <a href="https://www.mindcurv.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-52 h-52 items-center flex pb-3">
            <img src="/img/mindcurv.png" alt="Mindcurv" />
          </div></a>
          <a href="https://www.newrelic.com/" target="_blank" rel="noopener noreferrer">
            <div className="w-64 h-52 items-center flex pb-1">
            <img src="/img/newrelic.png" alt="New Relic" />
          </div></a>
          <a href="https://www.pixielabs.ai/" target="_blank" rel="noopener noreferrer">
            <div className="w-52 h-52 items-center flex pb-2.5">
            <img src="/img/pixie.png" alt="Pixie" />
          </div></a>
          <a href="https://www.redhat.com/" target="_blank" rel="noopener noreferrer">
          <div className="w-64 h-52 items-center flex pb-0.5">
            <img src="/img/redhat.svg" alt="Redhat" />
          </div></a>
          <a href="https://www.suse.com/" target="_blank" rel="noopener noreferrer">
          <div className="w-72 h-52 items-center flex pb-1">
            <img src="/img/suse.png" alt="Suse" />
          </div></a>
        </div>
      </div>
    </div>
  );
}
