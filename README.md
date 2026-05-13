# 🛡️ SentinelScope

## 🌐 Advanced Reconnaissance & Security Workflow Dashboard

SentinelScope is a full-stack MERN application designed to centralize and visualize the complete penetration testing and reconnaissance workflow in a single modern interface.

The platform orchestrates multiple security and networking tools, stores scan intelligence, tracks findings across engagement stages, and generates structured reports for authorized security assessments and educational lab environments.

---

## 🚀 Live Demo

### 🖥️ Frontend

[https://sentinelscope.io](https://sentinelscope.io)

### 🔌 API

[https://api.sentinelscope.io](https://api.sentinelscope.io)

---

## 📦 Repository Links

### 💻 Frontend Repository

[SentinelScope Client](https://github.com/FHobbs8030/sentinelscope-client)

### ⚙️ Backend Repository

[SentinelScope Server](https://github.com/FHobbs8030/sentinelscope-server)

---

## 📖 Overview

SentinelScope bridges the gap between traditional command-line security tooling and modern full-stack application workflows.

The platform aggregates:

- 🌍 reconnaissance intelligence
- 🔍 service enumeration
- 📡 HTTP metadata
- ⚠️ vulnerability findings
- 📑 reporting artifacts
- 🧠 infrastructure intelligence

into a unified dashboard experience.

---

## ✨ Features

### 🛰️ Reconnaissance Dashboard

#### Recon Features

- 🌐 DNS resolution
- 🧾 WHOIS lookups
- 📍 IP intelligence
- 🔄 reverse DNS analysis
- 🚪 open port discovery
- 🖥️ service detection
- ☁️ cloud provider identification
- 🕸️ topology visualization
- 🧪 technology fingerprinting

#### Integrated Tools

- 🛠️ Nmap
- 🗺️ Zenmap
- 📜 NSE Scripts
- 🔍 Wappalyzer
- 🌐 Browser DevTools

---

### 🔎 Enumeration Engine

#### Enumeration Features

- 📡 HTTP header analysis
- 🤖 robots.txt discovery
- 🔗 API route inspection
- 📂 hidden directory enumeration
- 🧱 HTTP method detection
- 🍪 cookie/session analysis
- 🔑 JWT detection
- 🌍 CORS inspection

#### Enumeration Integrated Tools

- 🛠️ Burp Suite
- 📂 Gobuster
- ⚡ FFUF
- 🌐 curl
- 📜 NSE HTTP scripts

---

### ⚠️ Vulnerability Analysis

#### Vulnerability Features

- 🛡️ security header analysis
- 🌍 weak CORS detection
- 🚨 exposed administrative endpoints
- ⚙️ insecure configuration identification
- 🧠 automated finding classification
- 📊 severity categorization
- 🔗 finding correlation engine

#### Categories

- 🔐 Authentication flaws
- ⚙️ Configuration weaknesses
- 📂 Exposure findings
- 🧱 Missing security controls
- 🚦 Transport security issues

---

### 💥 Exploitation Tracking (Authorized Labs Only)

Supported environments:

- 🍹 OWASP Juice Shop
- 🧨 DVWA
- 🧪 TryHackMe Labs
- 🎯 Hack The Box

#### Features

- 📝 payload logging
- 📸 proof-of-concept storage
- 📡 request/response snapshots
- 🏷️ authorization scope tagging
- 🗂️ evidence management

---

### 🧠 Post-Exploitation Analysis

#### Post-Exploitation Features

- 🔄 session tracking
- 🔑 token analysis
- 🛂 privilege mapping
- 📦 exposed data cataloging
- 👤 access-level documentation
- ⏱️ timeline correlation

---

### 📑 Reporting System

#### Reporting Features

- 📝 Markdown report generation
- 📄 PDF export support
- 📊 severity summaries
- 🛠️ remediation recommendations
- 👔 executive summaries
- 🔬 technical findings
- 📸 evidence screenshots
- 🕒 engagement timelines

---

## 🧭 Dashboard Workflow

SentinelScope organizes engagements into six operational stages:

1. 🛰️ Reconnaissance
2. 🔎 Enumeration
3. ⚠️ Vulnerability Analysis
4. 💥 Exploitation
5. 🧠 Post-Exploitation
6. 📑 Reporting

---

## 🧰 Tech Stack

### 🎨 Frontend

- ⚛️ React
- ⚡ Vite
- 📈 Recharts
- 🔄 Axios
- 🧭 React Router

### ⚙️ Backend

- 🟢 Node.js
- 🚂 Express
- 🔧 child_process orchestration
- 🌐 REST API architecture

### 🗄️ Database

- 🍃 MongoDB
- 🧩 Mongoose

### 🔐 Security Tooling

- 🛠️ Nmap
- 🗺️ Zenmap
- 📜 NSE Scripts
- 🛠️ Burp Suite
- 📂 Gobuster
- ⚡ FFUF

---

## 🏗️ Project Structure

```text
sentinelscope/
│
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   ├── dashboard-preview.png
│   │   │   ├── recon-stage.png
│   │   │   ├── enumeration-stage.png
│   │   │   ├── vuln-analysis.png
│   │   │   ├── reporting-engine.png
│   │   │   └── topology-map.png
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── services/
│   │   ├── contexts/
│   │   ├── assets/
│   │   └── styles/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── scanners/
│   ├── parsers/
│   ├── reports/
│   ├── utils/
│   └── app.js
│
└── README.md
