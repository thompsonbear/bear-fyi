---
title: Subnet CLI
description: Subnetting from the Command Line
published: '12-28-2024'
categories:
  - go
  - project
  - cli
visible: true
---

![snet-cli banner](/posts/snet-cli/snet-banner.webp)

## TL;DR

Subnet CLI or snet-cli is a simple CLI tool that acts as a subnetting calculator on the command line. The code is open-source on Github [here (snet-cli)](https://github.com/thompsonbear/snet-cli) and also [here (netmath)](https://github.com/thompsonbear/netmath). In this article, I talk about the motivations for the creation of snet as well as a bit of the inner workings and what I learned from the experience.

## The Why

My very first programming teacher (shoutout to Mr. Spotts) once taught me that the best way to learn how something works on a technical level is to write a program to do the same. **snet-cli** is a CLI tool in which I applied the skills I had learned around the [Go programming language](https://go.dev) in a real project, which also allowed me to gain a deeper understanding of subnetting in computer networking as well as to satisfy my own frustration with using online subnet calculators.

When I was looking to write my first "real" Go project, I was an entry-mid level networking engineer, and while I had a basic understanding of subnetting, I felt as though I should deepen my understanding.

One additional major reason I wanted to write a subnetting CLI tool was because it would just be quicker and easier than opening a web browser and finding an online calculator, especially with my environment of choice at the time being the terminal. While this project may not have been justifiable for someone else, I felt it had a good amount of things included that would help me to better understand the topics I was attempting to learn at the time.

## Architecture

When I first set out to work on snet, I had a novice understanding of the Golang project structure, especially around using/creating Golang packages. This had originally led me to create snet-cli as a single Golang file which I thought would be sufficient for such a small project.

After some time, I determined that based on the packages that were currently provided by the Golang standard library, it would be best to create my own simple subnetting math package. The [netmath](https://pkg.go.dev/github.com/thompsonbear/netmath) package I created solved for this use case and provided various methods on a Subnet type, making it easier to work with subnets in this and future projects.

In the creation of netmath, I could vastly simplify the project structure for [snet-cli](https://github.com/thompsonbear/snet-cli) and which would also allow me to more easily test the netmath package separately to ensure it provided accurate and expected results.

## Third-Party Packages

The only third-party package that is directly imported by snet is [lipgloss](https://github.com/charmbracelet/lipgloss):

```go
// go.mod

module github.com/thompsonbear/snet-cli/snet

go 1.22.2

require (
	github.com/charmbracelet/lipgloss v0.10.0
	github.com/thompsonbear/netmath v0.1.1
)

require (
	github.com/aymanbagabas/go-osc52/v2 v2.0.1 // indirect
	github.com/lucasb-eyer/go-colorful v1.2.0 // indirect
	github.com/mattn/go-isatty v0.0.18 // indirect
	github.com/mattn/go-runewidth v0.0.15 // indirect
	github.com/muesli/reflow v0.3.0 // indirect
	github.com/muesli/termenv v0.15.2 // indirect
	github.com/rivo/uniseg v0.4.7 // indirect
	golang.org/x/sys v0.12.0 // indirect
)
```

Lipgloss makes it easy to style and format outputs in the terminal and allowed me to easily create tables with and without borders when outputting the subnetting results as well as color text in certain situations in order to make it more legible. Charmbracelet has multiple other tools for creating terminal user interfaces and I highly recommend checking out their stuff over at [charm.sh](https://charm.sh) if you're interested in that kind of thing.

## Lessons Learned

To say that I learned a lot creating snet-cli and netmath would be an understatement. The primary items learned revolved around the Golang project and package structure and the challenge behind releasing multiple versions of the same software for various architectures and operating systems, although Golang makes this generally a breeze.

A major unexpected issue I ran into though when releasing the software was with antivirus detection. With the software being new, the application binary hash was obviously unknown, and I had to manually reach out to antivirus vendors to have the software whitelisted so machines would not nuke the binary file as soon as it was downloaded. This generally proved successful, and I was able to make snet-cli available for Windows on Chocolatey via `choco install snet-cli`.

## CLI Examples

Finally, here are some example use cases and options for snet-cli:

### Default Behavior

```bash
snet 192.168.10.10/23
*** or ***
snet 192.168.10.10 255.255.254.0
```

```
Output:

╭─────────────────┬────────────────┬─────────────────────────────┬──────────────────┬───────────────╮
│ Prefix          │ NetworkAddress │ UsableRange                 │ BroadcastAddress │ SubnetMask    │
├─────────────────┼────────────────┼─────────────────────────────┼──────────────────┼───────────────┤
│ 192.168.10.0/23 │ 192.168.10.0   │ 192.168.10.1-192.168.11.254 │ 192.168.11.255   │ 255.255.254.0 │
╰─────────────────┴────────────────┴─────────────────────────────┴──────────────────┴───────────────╯
```

### Single Field: Network Address (-na)

```bash
snet -na 172.16.22.1/23
```

```
Output:

172.16.22.0
```

### Multiple Fields: Network Address (-na) + Broadcast Address (-ba) + Count (-c)

```bash
snet -na -ba -c 172.23.15.22/23
```

```
Output:

╭────────────────┬──────────────────┬────────────┬─────────────╮
│ NetworkAddress │ BroadcastAddress │ TotalCount │ UsableCount │
├────────────────┼──────────────────┼────────────┼─────────────┤
│ 172.23.14.0    │ 172.23.15.255    │ 512        │ 510         │
╰────────────────┴──────────────────┴────────────┴─────────────╯
```

### List All Neighboring Subnets (-a) with Shortened Range Fields (-s)

```bash
snet -a -s 10.20.30.0/19
```

```
Output:

╭────────────────┬────────────────┬─────────────────────┬──────────────────┬───────────────╮
│ Prefix         │ NetworkAddress │ UsableRange         │ BroadcastAddress │ SubnetMask    │
├────────────────┼────────────────┼─────────────────────┼──────────────────┼───────────────┤
│ 10.20.0.0/19   │ 10.20.0.0      │ 10.20.0-31.1-254    │ 10.20.31.255     │ 255.255.224.0 │
│ 10.20.32.0/19  │ 10.20.32.0     │ 10.20.32-63.1-254   │ 10.20.63.255     │ 255.255.224.0 │
│ 10.20.64.0/19  │ 10.20.64.0     │ 10.20.64-95.1-254   │ 10.20.95.255     │ 255.255.224.0 │
│ 10.20.96.0/19  │ 10.20.96.0     │ 10.20.96-127.1-254  │ 10.20.127.255    │ 255.255.224.0 │
│ 10.20.128.0/19 │ 10.20.128.0    │ 10.20.128-159.1-254 │ 10.20.159.255    │ 255.255.224.0 │
│ 10.20.160.0/19 │ 10.20.160.0    │ 10.20.160-191.1-254 │ 10.20.191.255    │ 255.255.224.0 │
│ 10.20.192.0/19 │ 10.20.192.0    │ 10.20.192-223.1-254 │ 10.20.223.255    │ 255.255.224.0 │
│ 10.20.224.0/19 │ 10.20.224.0    │ 10.20.224-255.1-254 │ 10.20.255.255    │ 255.255.224.0 │
╰────────────────┴────────────────┴─────────────────────┴──────────────────┴───────────────╯
```

## Installation

For installation instructions please reference the readme on the [snet-cli github](https://github.com/thompsonbear/snet-cli/tree/main#installation).

## Future

If in the future interest grows for additional features for snet I would be totally open to adding them. If you find the tool helpful, please give [snet-cli](https://github.com/thompsonbear/snet-cli) a star on Github, and if you find any issues or have any requests please feel free to open an issue. Happy subnetting!
