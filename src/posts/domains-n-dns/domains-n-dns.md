---
title: Domains 'n DNS
description: A guide to public and private domains and DNS
published: '03-30-2025'
categories:
  - guide
  - networking
visible: true
---

<script>
   import DomainTool from './domain-tool/domain-tool.svelte';
   import ResolveDomainRecord from '$lib/comps/custom/resolve-domain-record.svelte';

   let domain_list = ["charts.bear.fyi", "music.youtube.com", "bsky.app","grapesoda.ink", "thompsonbear.com", "console.cloud.google.com"]
</script>

> At the surface, domains and DNS can seem rather complex, but once one understands some basic principles, it can be rather easy to understand.

## What is a Domain
A domain is a human readable name used to represent a location on the internet or intranet. Some examples of domain names are "google.com", "charts.bear.fyi", "corp.local", etc. You will notice that there are multiple parts in each domain name that are seperated by periods or dots.

The parts of each domain from right to left are as follows:

- A **Top-Level Domain (TLD)** aka Domain Extension
- A **Second-Level Domain (SLD)**
- Any number of **Subdomains**

All together, we consider the sum of these parts a **Fully Qualified Domain Name** often abbreviated **FQDN**.

You can visualize the various parts of your favorite domain using the tool below:

<DomainTool {domain_list}/>

## What is DNS
DNS stands for Domain Name System and is the service responsible to route users from a human readable domain like `bear.fyi` to it's relative IP address at <ResolveDomainRecord domain='bear.fyi'/> that a computer can understand. In my mind, there are two major kinds of DNS: **Public** and **Private**.

### Private DNS
Private or Internal DNS in this case refers to how domain to DNS record translation happens within your internal network. Private DNS is much more common to have on a business network, since you may have internal services that users would need to access, but may not like to be accessible to the outside world. The following are just a couple of examples of how this might be used in a business environment:

#### File Server Example
For example, let's assume your workplace has a secure file storage server that multiple users and devices need to access. Your IT department could choose to connect each computer to the file server shares via it's network address like `192.168.5.10` for example. This configuration would work absolutely fine in the short term, but apart from the network address not being very memorable, this brings up another question for the long-term. If the file server network address needs to be updated at a later date, what would be required? Simply, the server connection would need to be updated on each user's PC, which could be a ton of work in a large organization.

If the file server in this example was instead configured with a name like `files.corp.local` in DNS, not only is this name more memorable, but instead of the configuration requiring updates to each user's computer, the change could instead be made in DNS to point files.corp.local to a new network address.

#### Business Website Example
For another quick example, let's say your company is hosting a website at your office location. Would it make sense for users browsing to the company website from the office to reach out to to the internet, only to be routed back to their local network? Of course not, we could instead use Private DNS to direct the user right to the internal server hosting the website. In some cases, not doing this can even cause issues where the website is not browseable from the office it's hosted out of, which can cause confusion for users.

### Public DNS
Public or External DNS refers to how domain to DNS record translation happens on the public internet, after your network traffic leaves your home or office network. 