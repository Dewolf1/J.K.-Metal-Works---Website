# J.K. Metal Works — Official Website

High-performance website showcasing **J.K. Metal Works’** sheet metal fabrication, powder coating, stabilizer cabinets, inverter enclosures, CCTV accessories, and custom metal engineering solutions.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router v7 (`createBrowserRouter`)
- **Deployment**: Render (Render Blueprint Ready)

---

## Getting Started

### Prerequisites

- Node.js 20+ or 22+
- npm (or pnpm)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The output will be bundled in the `dist/` directory.

### Local Preview

```bash
npm run preview
# or
npm start
```

---

## Deploying to Render

This repository is **Render Ready** and includes a [`render.yaml`](file:///home/dewolf/OpenSource/Premium Metal Works Website/render.yaml) Blueprint configuration.

### Option 1: Automatic Blueprint Deployment (Recommended)

1. Log in to [Render](https://dashboard.render.com).
2. Click **New +** and select **Blueprint**.
3. Connect your repository: `https://github.com/Dewolf1/J.K.-Metal-Works---Website.git`.
4. Render automatically parses `render.yaml` and sets up:
   - **Service Type**: Static Site
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./dist`
   - **SPA Routing Rewrite**: `/*` &rarr; `/index.html` (prevents 404s on page refresh)
5. Click **Apply** to deploy!

### Option 2: Manual Static Site Setup

If you prefer to configure manually in Render:

1. Click **New +** &rarr; **Static Site**.
2. Connect `https://github.com/Dewolf1/J.K.-Metal-Works---Website.git`.
3. Configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - Add a rewrite rule:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
5. Click **Create Static Site**.
