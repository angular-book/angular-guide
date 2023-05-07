import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}></div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <section className={styles.mainSection}>
          <h2>Becoming an Angular Developer</h2>
          <p>We are preparing this guide to help developers go through the stages of learning Angular. We start with a helpful guide to get you <i>ready</i> to start working in Angular, and then show you the basics of Angular, and then, when you are ready, "Real World Angular". </p>
          <p>Please start with the <Link href="/docs/Getting-Started/chapter_1">Getting Ready</Link> section to see what you are in for, and to bulk up on any skills you might need to soften your journey.</p>
          <p>After you feel like you grasp the concepts in the Getting Ready section, go to <Link href="/docs/Angular-101/summary">Angular 101</Link> section to get the orientation to Angular and it's abstractions and opinions.</p>
          <p><Link href="/docs/Getting-Real/overview">Real World Angular</Link> is where the "meat" is. This is an opinionated guide to creating, testing, and maintaining Angular applications that your team will love.</p>
        </section>
      </main>
    </Layout>
  );
}
