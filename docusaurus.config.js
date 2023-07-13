// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OpenCost — open source cost monitoring for cloud native environments",
  tagline:
    "OpenCost is a vendor-neutral open source project for measuring and allocating infrastructure and container costs in real time. Built by Kubernetes experts and supported by Kubernetes practitioners, OpenCost shines a light into the black box of Kubernetes spend.",
  url: "https://opencost.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "opencost", // Usually your GitHub org/user name.
  projectName: "opencost", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // tailwind
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: "G-35RQHKM7TK",
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: require.resolve("./docs/sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/opencost/opencost-website/tree/main",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "",
        logo: {
          alt: "OpenCost Logo",
          src: "img/logo.png",
          srcDark: "img/logo-white.png",
        },
        items: [
          { to: "/enterprise", label: "Enterprise", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Documentation",
          },
          { to: "/api", label: "API", position: "left" },
          { to: "/press", label: "Press", position: "left" },
          {
            to: "https://slack.cncf.io/",
            label: "Join Slack",
            position: "left",
          },
        ],
      },
      // the following configures the footer IF you want to use the default footer.
      // current footer is not using the default footer, you'll instead find it in theme/Footer/index.js.
      // more on customizing components: https://docusaurus.io/docs/swizzling
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Slack",
                href: "https://cloud-native.slack.com/archives/C03D56FPD4G",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/opencost",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/opencost/opencost",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OpenCost`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
