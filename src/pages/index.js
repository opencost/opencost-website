import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CNCF from "../components/CNCF";
import Partners from "../components/Partners";
import Features from "../components/Features";
import Hero from "../components/Hero";

function HomepageHeader() {
  return (
    <header className="items-center">
      <Hero />
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Containers in the Cloud, costs down to Earth. Monitor Kubernetes spend the Cloud Native way."
    >
      <HomepageHeader />
      <main>
        <Features />
        <Partners />
        <CNCF />
      </main>
    </Layout>
  );
}
