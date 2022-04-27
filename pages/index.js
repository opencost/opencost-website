import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Partners from "../components/Partners";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OpenCost</title>
        <meta
          name="description"
          content="Containers in the Cloud, bills down to Earth. OpenCost is an open source project for measuring and allocating infrastructure and container costs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Partners />
      </Layout>
    </div>
  );
}
