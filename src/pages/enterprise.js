import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Enterprise from "@site/src/components/Enterprise";

function EnterpriseHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="min-h-screen items-center">
      <Enterprise />
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="ENTERPRISE PAGE"
    >
      <EnterpriseHeader />
      <main>
      </main>
    </Layout>
  );
}
