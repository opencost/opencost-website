import React from "react";

export default function CNCF() {
  return (
    <div className="flex flex-col gap-y-3 px-10 py-10 md:py-10 mt-20 md:mt-20">
      <div className="flex flex-col items-center">
        <img className="w-1/4 h-auto" src="/img/cncf-color.png" alt="CNCF Foundation" />
      </div>
      <div className="text-lg text-center flex justify-center font-anek mt-4 max-w-5xl mx-auto leading-relaxed">
        OpenCost is a&nbsp;
        <a
          href="https://www.cncf.io/"
        >
          Cloud Native Computing Foundation
        </a>
        &nbsp;sandbox project.
      </div>
    </div>
  );
}
