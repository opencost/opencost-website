import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Enterprise from "@site/src/components/Enterprise";
import Enterprises from "@site/src/components/Enterprises";
import Kubecost from "@site/src/components/Kubecost";

function EnterpriseHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="items-center">
      <Enterprise />
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="OpenCost Enterprise Offerings"
    >
      <EnterpriseHeader />
         <main>
             <Enterprises />
             <Kubecost />
         </main>
    </Layout>
  );
}
