import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import { RedocStandalone } from 'redoc';

export default function API() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`} description="OpenCost Enterprise Offerings">
      <div className="API">
        <RedocStandalone specUrl="https://raw.githubusercontent.com/opencost/opencost/develop/docs/swagger.json" />
      </div>
    </Layout>
  );
}
