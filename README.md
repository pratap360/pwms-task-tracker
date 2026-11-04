# PWMS - Personal Web Management Suite (FinTech Core)

> An enterprise-grade, offline-first Banking & IT Work Tracker featuring **6 distinct UI design languages** backed by a shared local database engine.

![PWMS Multi-UI Suite](https://img.shields.io/badge/PWMS-v2.0-0052cc?style=for-the-badge)
![UI Paradigms](https://img.shields.io/badge/Designs-6%20Variations-6366f1?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-100%25%20LocalStorage-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-amber-500?style=for-the-badge)

---

## 🌟 Overview

**PWMS (Personal Web Management Suite)** is a work tracking and daily reporting application created specifically for engineers, tech leads, and consultants handling high-stakes banking and IT platforms (Core Banking, Payments, Collateral, Treasury, and Regulatory interfaces).

Rather than forcing a single appearance, PWMS features **6 self-contained UI implementations** representing modern web aesthetics. Regardless of which UI you open, **your data remains 100% synced** through your browser's persistent `localStorage`.

---

## 🎨 6 UI Design Languages Included

| # | Interface | File | Aesthetic Highlights |
|---|---|---|---|
| **0** | **Design System Hub (Landing Page)** | `index.html` | Showcase portal to preview and launch any UI design with system metrics. |
| **1** | **Enterprise Jira UI** | `PWMS.html` | Authentic Atlassian Jira look-and-feel with standard banking color coding, compact tables, and classic side navigation. |
| **2** | **Neo-Brutalism UI** | `PWMS_Brutalism.html` | High-contrast 3px solid black outlines, flat hard offset shadows, monospace type, and terminal hacker dark mode. |
| **3** | **Glassmorphism UI** | `PWMS_Glassmorphism.html` | Multi-layer frosted acrylic panels, ambient mesh gradients, translucent dropzones, and specular highlights. |
| **4** | **Spatial UI (visionOS)** | `PWMS_Spatial.html` | Apple Vision Pro inspired volumetric depth, squircle radii, capsule pills, and top-edge ambient specular lighting. |
| **5** | **Liquid Glass UI** | `PWMS_LiquidGlass.html` | Molten asymmetric glass bevels, water-tension borders, organic curvatures, and bioluminescent ocean abyss dark mode. |
| **6** | **Hacker Style UI** | `PWMS_BentoGrid.html` | Apple, Linear & Vercel inspired modular compartments, razor-sharp 1px hairline borders, and subtle top sheens. |

---

## 🚀 Key Functional Capabilities

- **Drag-and-Drop Kanban Board**: Move issues between *Backlog*, *In Progress*, *UAT / Testing*, *Ready for Prod*, *Blocked*, and *Closed*.
- **Pending-With Bottleneck Tracking**: Track dependencies across **BSG (Business Solutions)**, **Testers / QA**, **DEV**, **DBA Team**, **Third-Party Vendors**, and **Client / Ops**.
- **Past-Tense Manager Timesheet**: Hour-by-hour weekly work log aligned with corporate banking POD Excel formats (captures Standard vs. Overtime hours).
- **One-Click EOD Updates**: Formats your daily activities into a clean bulleted report ready to paste into Microsoft Teams or Outlook.
- **Analytics & SLA Ageing**: Live Chart.js distributions and automatic flagging for tasks ageing past 5 and 7 days.
- **Full Excel & JSON Export/Import**: Export Master Task Lists (CSV), Weekly Timesheets (CSV), or complete JSON backups with instant restore.
- **Zero Server Overhead**: 100% client-side. Zero telemetry, zero external database setup required, works offline.

---

## 📁 Repository Structure

```text
├── index.html              # Landing Page & Design System Showcase Hub
├── PWMS.html               # 1. Enterprise Jira UI
├── PWMS_Brutalism.html     # 2. Neo-Brutalism UI
├── PWMS_Glassmorphism.html # 3. Glassmorphism UI
├── PWMS_Spatial.html       # 4. Spatial UI (visionOS)
├── PWMS_LiquidGlass.html   # 5. Liquid Glass UI
├── PWMS_BentoGrid.html     # 6. Bento Grid UI
└── README.md               # Project documentation & hosting guide
```

---

## 🌐 How to Host on GitHub Pages (Free & Instant)

You can host this entire suite on GitHub Pages in under 2 minutes:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) and click **New Repository**.
2. Name it (for example, `pwms-banking-suite`).
3. Set visibility to **Public** and click **Create repository**.

### Step 2: Push Your Files
Open your terminal inside the folder containing all HTML files and run:

```bash
git init
git add .
git commit -m "Initial commit: PWMS 6-UI Banking Suite"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top tab) -> **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and keep the folder set to `/(root)`.
4. Click **Save**.
5. Within 30–60 seconds, your site will be live at:
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

Because `index.html` is the landing page, visitors will arrive directly at the Design System Hub and can launch any of the 6 interfaces with one click.

---

## ⚡ Alternative Free Hosting Options

### Deploy with Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder and follow the prompts.
3. Your app is deployed instantly with an SSL certificate.

### Deploy with Netlify
1. Drag and drop the project folder directly into [Netlify Drop](https://app.netlify.com/drop).
2. Netlify will deploy all 7 HTML files immediately.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `c` / `C` | Quick-create a new Banking Task / Issue |
| `/` | Focus the Global Search bar |
| `Esc` | Close any active modal or confirmation prompt |

---

## 🔒 Data Privacy & Persistence

- All data entries (Tasks, Timesheets, Assignees, Resource Configurations) are saved in browser **`localStorage`**.
- Data is preserved across page refreshes, tab closures, and interface switches.
- To prevent accidental data loss, use the **Backup / Excel -> Download Full Backup (JSON)** option periodically.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).