---
slug: opencost-2025-year-in-review
title: OpenCost – a look back at 2025 and into the new year
authors: [mewzherder]
tags: [opencost, MCP, AI, cost management, Kubernetes, mentorship]
---

The OpenCost project has had a fruitful year in terms of releases, our wonderful mentees and contributors, and fun gatherings at KubeCons. If you’re new to OpenCost, it is an open-source cost and resources management tool that is an Incubating project in the Cloud Native Computing Foundation (CNCF). It was created by Kubecost (acquired by IBM) and continues to be maintained and supported by IBM Kubecost, Randoli, and a wider community of partners, including the major cloud providers. Aside from AWS, Microsoft, and Google, who have been contributing companies since OpenCost’s inception, we’ll also call out Oracle and DigitalOcean below. If you have further questions, you can find us on Slack or at the regular [OpenCost meetings](https://opencost.io/docs/community).  

<!--truncate-->


## OpenCost Releases
At this point in the year, the OpenCost project has had [11 releases in 2025](https://github.com/opencost/opencost/releases). It has released more features and capabilities for improved experiences for both users and contributors. Here are a few highlights:  

- **[Promless:](https://github.com/opencost/opencost/pull/3166)** OpenCost can be configured to run without Prometheus, using environment variables which can be set using helm. Users will be able to run OpenCost using the Collector Datasource (beta) which can be run without Prometheus. 
- **OpenCost MCP server:** AI agents can now query cost data in real-time using natural language. They can analyze spending patterns across namespaces, pods, and nodes, generate cost reports and recommendations automatically, and provide other insights from OpenCost data. 
- **Export System:** The project now has a generic Export Framework to make it possible to export cost data in a type-safe way. 
- **Diagnostics System:** OpenCost has a complete diagnostic framework with an interface, runners, and export capabilities. 
- **Heartbeat System:** You can do system health tracking with timestamped heartbeat events for export and more. 
- **Cloud providers:** There are continued improvements for users to track cloud and multi-cloud metrics. We appreciate contributions from Oracle (including providing hosting for the demo at [demo.infra.opencost.io](http://demo.infra.opencost.io/)) and DigitalOcean (for recent cloud services provider work). 
Thanks to our maintainers and contributors who make these releases possible and successful! Those maintainers and contributors include our mentees and community contributors as well. 

## Mentorship and Community management 
Our project has been committed to mentorship through the Linux Foundation for a while, and we continue to have fantastic mentees who bring innovation and support to the community. Manas Sivakumar was a summer 2025 mentee and worked on writing Integration tests for OpenCost’s Enterprise readiness. Manas’ work is now part of the OpenCost Integration Testing Pipeline for all future contributions.  

- **Adesh Pal** also menteed with us and made a big splash with the [OpenCost MCP server](../blog/opencost-mcp-server). The MCP server is powerful because it now comes by default and needs no configuration. It outputs easily readable markdown on your metrics as well as step-by-step suggestions to make improvements.   

- **Sparsh Raj** has been in our community for a while and has become our most recent mentee. Sparsh has come out already with a blog post on [KubeModel](../blog/introducing-kubemodel), the foundation of OpenCost's Data Model 2.0. Sparsh’s work will meet the needs for a robust and scalable data model that can handle Kubernetes complexity and constantly shifting resources.  
- On the community side, Tamao Nakahara was brought in to the Kubecost team for a few months of open source and Developer Experience expertise. Tamao helped organize the regular OpenCost community meetings, leading actions around events, the website, and docs. On the website, Tamao improved the UX for new and returning users, and brought in Ginger Walker to help clean up the docs. 

## Events and talks 
As a CNCF incubating project, OpenCost naturally participated in the key KubeCon events. Most recently, the team was at KubeCon Atlanta 2025, where maintainer Matt Bolt from Kubecost kicked off the week with a Project lightning talk. During a co-located event that day, Rajith Attapattu, CTO of contributing company Randoli, also gave a talk on OpenCost. Dee Zeis, Rajith, and Tamao also answered questions at the OpenCost kiosk in the Project Pavilion. 

Earlier in the year, the team was also at KubeCon London 2025 and KubeCon Japan 2025 giving talks and running the OpenCost kiosks. 

## 2026! 
What’s in store for OpenCost in the coming year? Aside from meeting all of you at future KubeCons, we’re also excited about a few Roadmap highlights. As mentioned, our LFX mentee Sparsh is working on KubeModel, which will be important for improvements to OpenCost’s data model. As AI continues to increase in adoption, the team is also working on building out costing features to track AI usage. Finally, supply chain security improvements are a priority. 

We’re looking forward to seeing more of you in the community in the next year! 
