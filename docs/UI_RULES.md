# 🛡️ SentinelScope — UI_RULES.md

## 🎯 SentinelScope UI Engineering System

> “Don’t design for decoration.
> Design for clarity, hierarchy, speed, and scalability.”

---

## 🧠 Core Philosophy

SentinelScope is a professional cybersecurity intelligence platform.

The UI must feel:

* 🛰️ tactical
* ⚡ fast
* 🧠 intelligent
* 🧱 structured
* 🌑 modern
* 📊 data-focused
* 🔍 highly readable

The system should prioritize:

1. Clarity
2. Hierarchy
3. Consistency
4. Scalability
5. Low visual noise

---

## 🚀 Rule #1 — Function Before Appearance

Always design around:

* user goals
* workflows
* actions
* information hierarchy

Never start by “making things pretty.”

Start with:

```text
What does the user need to accomplish?
```

---

## 🧩 Feature-First Development

Build:

* cards
* widgets
* forms
* tables
* shells
* panels

BEFORE:

* full pages
* complex layouts
* decorative styling

---

## 🔄 Development Workflow

Every feature follows this cycle:

### 1️⃣ Plan

Define:

* purpose
* inputs
* outputs
* primary action

---

### 2️⃣ Build

Create:

* structure
* spacing
* hierarchy
* responsiveness

WITHOUT over-styling.

---

### 3️⃣ Refactor

Improve:

* hierarchy
* clarity
* spacing
* consistency
* accessibility

---

### 4️⃣ Polish

Only AFTER functionality is stable:

* animations
* glow
* gradients
* visual enhancements

---

## 🧠 Visual Hierarchy Rules

Every screen must answer:

> “What should the user notice FIRST?”

---

## 🎯 Hierarchy Levels

### 🟥 Primary

Main action or critical data.

Examples:

* Start Scan
* Run Enumeration
* Active Threat Alert

Rules:

* largest emphasis
* highest contrast
* strongest spacing
* boldest typography

---

### 🟨 Secondary

Supporting actions or contextual data.

Examples:

* filters
* tabs
* metadata
* summaries

Rules:

* medium emphasis
* reduced contrast
* smaller typography

---

### ⬜ Tertiary

Background/supporting information.

Examples:

* timestamps
* labels
* helper text
* inactive states

Rules:

* low contrast
* smaller size
* visually quiet

---

## 📏 Spacing System

Never use random spacing values.

---

## 📐 Approved Spacing Scale

```text
4px
8px
12px
16px
24px
32px
48px
64px
96px
```

---

## 📦 Spacing Rules

### Inside Component Groups

Use:

* 4px
* 8px
* 12px

---

### Between Sections

Use:

* 24px
* 32px
* 48px

---

### Major Layout Separation

Use:

* 64px
* 96px

---

## 🚫 Forbidden

* random spacing
* inconsistent padding
* equal spacing everywhere
* cramped layouts

---

## 🔤 Typography System

Typography must remain minimal and consistent.

---

## 🔠 Approved Font Sizes

```text
12px
14px
16px
20px
24px
32px
48px
```

---

## ✍️ Typography Rules

### Body Text

Use:

* 14px
* 16px

---

### Headers

Use:

* 24px
* 32px
* 48px

---

### Font Weights

Only use:

* 400 (Regular)
* 700 (Bold)

---

## 🚫 Forbidden Typography Choices

* ultra-thin fonts
* excessive font sizes
* decorative fonts
* inconsistent line heights

---

## 🎨 Color System

SentinelScope uses a structured tactical dark theme.

---

## 🌑 Core Palette

### Neutral Greys

Used for:

* backgrounds
* cards
* borders
* typography

Must include:

* 8–10 grey shades

---

## 🟦 Primary Accent

Used ONLY for:

* buttons
* active states
* highlights
* focused interactions

---

## 🟩 Success

Used for:

* completed scans
* successful actions
* healthy systems

---

## 🟨 Warning

Used for:

* cautions
* elevated risks
* unstable states

---

## 🟥 Error

Used for:

* vulnerabilities
* failures
* destructive actions

---

## 🚫 Forbidden Color Usage

* random colors
* oversaturation
* rainbow UI
* excessive gradients
* neon overload

---

## 🌑 Depth & Shadows

Shadows indicate elevation — NOT decoration.

---

## 📦 Elevation Levels

### Level 1

Subtle panel elevation.

### Level 2

Interactive cards.

### Level 3

Modals and overlays.

---

## 🚫 Forbidden Shadow Usage

* giant blurry shadows
* excessive glow
* decorative shadows everywhere

---

## 🧼 Visual Noise Reduction

Always reduce unnecessary UI clutter.

---

## ✅ Preferred

* spacing over borders
* subtle dividers
* grouped information
* quiet secondary text

---

## 🚫 Avoid

* border overload
* excessive outlines
* heavy gradients
* unnecessary labels

---

## 🧱 Layout Rules

### 📐 Layout Philosophy

* Start with MORE spacing
* Reduce only if necessary
* Avoid cramped interfaces
* Use whitespace intentionally

---

### 📊 Dashboard Rules

Dashboards should:

* scan quickly
* prioritize metrics
* surface alerts clearly
* minimize distractions

---

## 🧩 Component Philosophy

Every component must be:

* reusable
* modular
* scalable
* responsive
* accessible

---

## 📦 Preferred Components

* AppShell
* Sidebar
* Topbar
* MetricCard
* DataTable
* ScanPanel
* TerminalPanel
* AlertBanner
* Modal
* Drawer
* Tabs
* Filters

---

## 📱 Responsive Design Rules

Mobile responsiveness is mandatory.

---

## 📐 Breakpoints

```text
320px
480px
768px
1024px
1440px
```

---

## 📲 Mobile Priorities

Prioritize:

* readability
* spacing
* touch targets
* scrolling clarity

---

## 🚫 Avoid Mobile Issues

* horizontal overflow
* tiny buttons
* crowded mobile layouts

---

## 🧠 Interaction Design Rules

Interactive elements must feel responsive.

---

## ✅ Required States

* hover states
* focus states
* active states
* loading states
* disabled states

---

## ⏱️ Animation Rules

Animations must:

* support usability
* guide attention
* feel subtle

---

## 🚫 Avoid Excessive Animation

* distracting animations
* constant motion
* unnecessary transitions

---

## 📊 Tables & Data Visualization

Data should:

* scan quickly
* prioritize readability
* avoid overcrowding

---

## 📈 Charts

Charts must:

* use limited colors
* maintain contrast
* avoid visual overload

---

## 🧪 Accessibility Rules

Accessibility is required.

---

## ✅ Required Accessibility Features

* keyboard navigation
* visible focus states
* proper contrast
* semantic HTML
* aria labels where needed

---

## 🚫 Forbidden Accessibility Issues

* inaccessible color contrast
* hidden focus states
* tiny text
* click-only interactions

---

## 🛡️ Cybersecurity UI Identity

SentinelScope is NOT:

* a gaming UI
* a hacker movie interface
* an RGB overload dashboard

SentinelScope IS:

* professional
* tactical
* intelligence-focused
* data-oriented
* enterprise-inspired

---

## 🧼 Final Pre-Ship Checklist

Before shipping ANY feature:

### 🎯 Clarity

* What is the main action?
* Can users scan this in 3 seconds?

---

### 📏 Consistency

* Is spacing consistent?
* Are typography rules followed?
* Are colors reused correctly?

---

### 🧠 Hierarchy

* Is the primary action obvious?
* Is anything competing for attention?

---

### 🧱 Simplicity

* Is anything visually noisy?
* Can anything be removed?

---

### 📱 Responsiveness

* Does it work at all breakpoints?
* Does mobile feel clean?

---

### ♿ Accessibility

* Is keyboard navigation supported?
* Is contrast sufficient?

---

## 🏁 Golden Rule

> “Make it clear first.
> Clean and structured UI naturally becomes beautiful.”

---

## 🛰️ SentinelScope Design Direction

### Keywords

* Tactical
* Structured
* Minimal
* Professional
* Intelligence-focused
* Cybersecurity operations
* Low-noise
* High readability
* Modular
* Enterprise-grade

---

## 📂 Recommended Project Structure

```text
src/
│
├── app/
├── pages/
├── features/
├── widgets/
├── components/
├── layouts/
├── hooks/
├── services/
├── store/
├── styles/
└── utils/
```

---

## 🎨 Required Global Style Files

```text
styles/
│
├── tokens.css
├── theme.css
├── spacing.css
├── typography.css
├── shadows.css
├── layout.css
├── animations.css
└── utilities.css
```

---

## ⚡ Final Engineering Principle

Every UI decision must improve:

* clarity
* usability
* scalability
* maintainability

If a design choice only adds decoration without improving usability:

❌ Remove it.
