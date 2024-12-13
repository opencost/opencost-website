import React from "react";

export default function CNCF() {
  return (
    <div className="flex flex-col gap-y-3 px-10 py-10 md:py-10 mt-10 md:mt-10 mb-10 md:mb-10">
      <div className="flex flex-col items-center">
        <img className="w-1/4 h-auto" src="/img/cncf-color.png" alt="CNCF Foundation" />
      </div>
      <div className="text-lg text-center flex justify-center font-anek mt-4 max-w-5xl mx-auto leading-relaxed">
        OpenCost is a&nbsp;
        <a
          href="https://www.cncf.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-300 hover:no-underline"
        >
          Cloud Native Computing Foundation
        </a>
        &nbsp;incubating project.
      </div>
    </div>
  );
}
