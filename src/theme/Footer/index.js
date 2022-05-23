import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { FaSlack, FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { copyright, links, logo, style } = footer;
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 text-white px-10 py-8"
      style={{ backgroundColor: "#092626" }}
    >
      <div className="space-y-3">
        <div className="flex justify-center md:justify-start">
          <img className="w-40" src="/img/logo-white.svg" alt="OpenCost" />
        </div>
        <div className="flex flex-row justify-center md:justify-start font-light text-sm">
          created by
          <img
            className="h-8 ml-2 pb-3"
            src="/img/kubecost-white.png"
            alt="Kubecost"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center md:justify-end items-start gap-x-16 font-light">
          <div>Documentation</div>
          <div>GitHub</div>
          <div>Blog</div>
        </div>
        <div className="mt-10 flex flex-row justify-center md:justify-end items-start gap-x-4 font-light">
          <FaTwitter className="inline mr-2 mb-1 w-5 h-5" />
          <FaSlack className="inline mr-2 mb-1 w-5 h-5" />
          <FaGithub className="inline mr-2 mb-1 w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Footer);
