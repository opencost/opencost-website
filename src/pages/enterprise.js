import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import EnterpriseHero from "@site/src/components/EnterpriseHero";
import Kubecost from "@site/src/components/Kubecost";
import Vantage from "@site/src/components/Vantage";

export default function Enterprise() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`} description="OpenCost Enterprise Offerings">
      <EnterpriseHero className="pt-20 xl:pl-32" />
      <main className="p-4 sm:p-8 pt-20 xl:px-40">
        <h2 className="pb-6 text-5xl font-anek font-normal">Enterprise & Support</h2>

      <div className="px-2 py-2 rounded-xl border border-solid border-gray-200 dark:border-gray-800 ">
          <Kubecost />
        </div>
      <div className="px-2 py-2 rounded-xl border border-solid border-gray-200 dark:border-gray-800 ">
          <Vantage />
        </div>
      </main>
    </Layout>
  );
}
