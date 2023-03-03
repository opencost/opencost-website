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
    <div className="grid grid-cols-1 md:grid-cols-1 text-white"
      style={{ backgroundColor: "#092626" }}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 text-white py-4"
        style={{ backgroundColor: "#092626" }}
      ></div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 text-white px-10"
        style={{ backgroundColor: "#092626" }}
      >
        <div className="space-y-3">
          <div className="flex justify-center md:justify-start">
            <img className="w-40" src="/img/logo-white.png" alt="OpenCost" />
          </div>
          <div className="flex flex-row justify-center md:justify-start font-light text-sm">
            created by
            <a
              href="https://www.kubecost.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-8 ml-2 pb-3"
                src="/img/kubecost-white.png"
                alt="Kubecost"
              />
            </a>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-center md:justify-end items-start gap-x-3 md:gap-x-16 font-light">
            <div>
              <a
                href="/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-300 hover:no-underline"
              >
                Documentation
              </a>
            </div>
            <div>
              <a
                href="https://github.com/opencost/opencost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-300 hover:no-underline"
              >
                GitHub
              </a>
            </div>
            <div>
              <a
                href="/blog"
                className="text-white hover:text-green-300 hover:no-underline"
              >
                Blog
              </a>
            </div>
            <div>
              <a
                href="https://cloud-native.slack.com/archives/C03D56FPD4G"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-300 hover:no-underline"
              >
                Slack
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-left md:text-left text-sm px-10">
        Documentation Distributed under&nbsp;
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-300 hover:no-underline"
        >
          CC BY 4.0
        </a>.&nbsp;
        The Linux Foundation® (TLF) has registered trademarks and uses trademarks.
        For a list of TLF trademarks, see:&nbsp;
        <a
          href="https://www.linuxfoundation.org/trademark-usage/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-300 hover:no-underline"
        >
          Trademark Usage
        </a>.
      </div>
      <div className="mt-10 flex flex-row justify-center md:justify-end items-start gap-x-4 font-light"></div>
    </div>
  );
}

export default React.memo(Footer);
