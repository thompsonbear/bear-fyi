---
title: Domains 'n DNS
description: Beginner's guide to public and private domains and DNS
published: '03-20-2025'
categories:
  - guide
  - networking
visible: true
---

<script>
   import DomainTool from './domain-tool/domain-tool.svelte';

   let domain_list = ["charts.bear.fyi", "music.youtube.com", "bsky.app","grapesoda.ink", "thompsonbear.com", "console.cloud.google.com"]
</script>

> At the surface, domains and DNS can seem rather complex, but once one understands some basic principles, it can be rather easy to understand.

## What is a Domain
A domain is a human readable name used to represent a location on the internet or intranet. Some examples of domain names are "google.com", "charts.bear.fyi", "corp.local", etc. You will notice that there are multiple parts in each domain name that are seperated by a period or dot.

The various parts of each domain from right to left are as follows:

- A **Top-Level Domain (TLD)** aka Domain Extension
- A **Second-Level Domain (SLD)**
- Any number of **Subdomains**

All together, we consider the sum of these parts a **Fully Qualified Domain Name** often abbreviated **FQDN**.

You can visualize the various parts of your favorite domain using the tool below:

<DomainTool {domain_list}/>