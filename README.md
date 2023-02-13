# OpenCost Website

This repository hosts the [OpenCost website](https://opencost.io), documentation, and blog.

This website is primarily built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator that is built on [React](https://reactjs.org/). It is styled using [Tailwind CSS](https://tailwindcss.com/).

## Contributing

### Proposing new features and fixes

If you are not (yet!) part of the maintainer team and are considering making changes to the website, please first [create an Issue](https://github.com/opencost/opencost/issues). That way, we can discuss your changes and ensure they're accepted.

### Implementing changes

To edit the website, create a fork of the repository and make your changes in the fork. Then, open a pull request in this repository.

When you open a pull request, Vercel will automatically generate a preview of the website. All merges to the `main` branch will automatically deploy to the [OpenCost website](https://opencost.io).

#### Local development

To start the server:

```
$ npm install
$ npm run start
```

A new tab will open in your browser. You can view the website at [http://localhost:3000](http://localhost:3000). The local site will update automatically when you make changes.

#### Changing landing page design, content and layout

Docusaurus ships with a lot of default components that are not visible in `/src`. To add your own components, you can use [swizzling](https://docusaurus.io/docs/swizzling). Note that it's not always clear which components in the hierarchy need to be swizzled -- if you need to reset a swizzled up component back to its default, delete the swizzled up component's files.

#### Publishing blog posts

Use existing posts to as a template for your new post.

To create a new blog post, create a new directory in `/blog`. Prefix the directory name with the date of the post, in the format `YYYY-MM-DD`. For example, if you want to create a blog post titled "Hello World", create a directory called `2020-01-01-hello_world`.

In this directory, create a file called `index.md`. This file will be the blog post's main content. Use `<!--truncate-->` to indicate the point at which the post should be truncated when viewing it in a list of blogposts on [OpenCost site](https://opencost.io/blog).

To include any images in the blog post, create a directory called `img`, and reference them in the post using `![](./img/image.png)`.

#### Editing documentation

Use existing documentation pages as a template.

To create a new standalone documentation page, create a new file in `/docs`. The file name should be the page title, with spaces replaced with underscores. For example, if you want to create a page called "Hello World", create a file called `hello_world.md`. Documentation pages are rendered as Markdown, so you can use Markdown syntax to create a page.

Each document needs some metadata about the page, e.g. `sidebar_position`, `slug`, `title`, etc. Check out the [full list of metadata keys](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs).

Documentation can also be organized into [hierarchical sections](https://docusaurus.io/docs/docs-introduction), using the same pattern as for blog posts.

#### Importing Swagger into /api

The OpenCost [swagger.json](https://github.com/opencost/opencost/blob/develop/docs/swagger.json) is incorporated on the `API` tab through [Redoc](https://redocly.com/redoc/).
