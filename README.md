# OpenCost website

This repository contains the source code for the informational website for OpenCost.

The website is built using [Next](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Local Development

Clone the repository to your local machine, and then run the following commands:

```
$ npm install
$ npm run dev
```

## Deployment

Automatic deploys are NOT configured from this repository.

The easiest way to deploy the site is using Vercel. In deploy settings, the Framework Preset should be specified as `Next.js`, and build command as `CI=false npm run build`.
