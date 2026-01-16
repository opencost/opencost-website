import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Community() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Community"
      description="Join the OpenCost community">
      <main className={styles.communityContainer}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className={styles.communityContent}>
                <h1>Community</h1>
                <p>OpenCost is a <a href="https://www.cncf.io/projects/opencost/" target="_blank" rel="noopener noreferrer">CNCF Incubating project</a> and we want to build and expand our community of users and contributors. The best way to get involved or to ask questions is to reach out on:</p>
                
                <ul>
                  <li>CNCF Slack: <a href="https://slack.cncf.io/" target="_blank" rel="noopener noreferrer">https://slack.cncf.io/ #opencost</a></li>
                  <li>OpenCost Community Meetings
                    <ul>
                      <li><a href="https://zoom-lfx.platform.linuxfoundation.org/meetings/opencost" target="_blank" rel="noopener noreferrer">Calendar</a></li>
                      <li><a href="https://bit.ly/opencost-community-meeting-cncf" target="_blank" rel="noopener noreferrer">Community Meetings every other Thursday at 1pm Pacific</a></li>
                      <li><a href="https://docs.google.com/document/d/1hDl-t7hCNN4MlDoloojTsVH0Mso-9H2p1TYPlmMeSUM/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Community Meeting Notes</a></li>
                    </ul>
                  </li>
                </ul>

                <p>Contact us via email <a href="mailto:opencost-kubecost@wwpdl.vnet.ibm.com">(opencost-kubecost@wwpdl.vnet.ibm.com)</a></p>

                <h2>Community Roles and Members</h2>
                <ul>
                  <li><a href="https://github.com/opencost/opencost/blob/develop/GOVERNANCE.md" target="_blank" rel="noopener noreferrer">Governance</a> outlines the project community's participation structure and expectations.</li>
                  <li><a href="https://github.com/opencost/opencost/blob/develop/MAINTAINERS.md" target="_blank" rel="noopener noreferrer">Maintainers</a> lists OpenCost's Maintainers and Committers.</li>
                  <li><a href="https://github.com/opencost/opencost/blob/develop/ADOPTERS.MD" target="_blank" rel="noopener noreferrer">Adopters</a> lists organizations that use OpenCost.</li>
                  <li><a href="https://github.com/opencost/opencost/blob/develop/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a> describes ways to contribute to the project.</li>
                </ul>

                <h2>Get the Code</h2>
                <ul>
                  <li><a href="https://github.com/opencost/opencost" target="_blank" rel="noopener noreferrer">OpenCost Main Repository</a></li>
                  <li><a href="https://github.com/opencost/opencost-grafana-dashboard" target="_blank" rel="noopener noreferrer">OpenCost Grafana Dashboard</a></li>
                  <li><a href="https://github.com/opencost/opencost-helm-chart" target="_blank" rel="noopener noreferrer">OpenCost Helm Chart</a></li>
                  <li><a href="https://github.com/opencost/opencost-parquet-exporter" target="_blank" rel="noopener noreferrer">OpenCost Parquet Exporter</a></li>
                  <li><a href="https://github.com/opencost/opencost-plugins" target="_blank" rel="noopener noreferrer">OpenCost Plugins</a></li>
                  <li><a href="https://github.com/opencost/opencost-ui" target="_blank" rel="noopener noreferrer">OpenCost UI</a></li>
                  <li><a href="https://github.com/opencost/opencost-website" target="_blank" rel="noopener noreferrer">OpenCost Website</a></li>
                </ul>

                <h2>Social Media</h2>
                <div className={styles.socialLinks}>
                  <a href="https://bsky.app/profile/opencost.bsky.social" target="_blank" rel="noopener noreferrer" className="button button--outline button--primary">Bluesky</a>
                  <a href="https://www.linkedin.com/showcase/opencost/" target="_blank" rel="noopener noreferrer" className="button button--outline button--primary">LinkedIn</a>
                  <a href="https://hachyderm.io/@opencost" target="_blank" rel="noopener noreferrer" className="button button--outline button--primary">Mastodon</a>
                  <a href="https://twitter.com/open_cost" target="_blank" rel="noopener noreferrer" className="button button--outline button--primary">Twitter</a>
                  <a href="https://www.youtube.com/@OpenCost" target="_blank" rel="noopener noreferrer" className="button button--outline button--primary">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}