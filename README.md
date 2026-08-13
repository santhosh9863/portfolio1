# Santhosh OS — Portfolio

A single-page, neumorphic OS-style portfolio built with Next.js and TypeScript. The site presents professional work through a tactile, mechanical interface — system profile, engineering modules, technology matrix, system history terminal, and communication controls — all rendered as a working operating-system aesthetic.

## Features

- **System Profile** — personal profile presented as a workstation identity card
- **Engineering Modules** — expandable module bays (Pulse System, Core Engine) with 5-phase mechanical expansion, internal tab navigation, and live display monitors
- **DisplayMonitor** — 6-layer industrial monitor with multi-channel source selectors, power-on sequences, and terminal-synchronized pulse feedback
- **Technology Matrix** — tactile subsystem chips with utilization reveal
- **System History** — 7-channel terminal log stream with prompt and blinking cursor
- **Communication Controls** — tactile buttons with transmit/link-established state machine
- **Neumorphic design system** — CSS-driven shadow engine (raised/inset materials), enforced 0-8-16-24-40px spacing scale
- **Environmental atmosphere** — section-aware depth shifts, hover attention response, idle detection that slows ambient motion
- **Fully responsive** — mobile-first layout with no horizontal overflow across breakpoints
- **Accessible** — semantic sections, aria labels, keyboard-focusable controls, reduced-motion support

## Tech Stack

- **Framework** — Next.js (App Router), React 19, TypeScript
- **Styling** — Tailwind CSS with a custom CSS variable design system (materials, shadows, motion, spacing)
- **Typography** — Inter + Geist Mono via `next/font`
- **Smooth scrolling** — Lenis with mechanical easing
- **Performance** — static generation, no heavy client animations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the development server         |
| `npm run build`  | Create an optimized production build |
| `npm run start`  | Serve the production build           |
| `npm run lint`   | Run ESLint checks                    |

## Project Structure

```
src/
  app/          # Page, layout, global styles
  components/   # UI components (surfaces, controls, cinematic, atmosphere)
  hooks/        # Live metrics, section observer
  styles/       # Design system stylesheets (materials, modules, interactions)
  systems/      # Design tokens (shadows, spacing, motion, typography)
```

## Contact

- **GitHub** — [santhosh9863](https://github.com/santhosh9863)
- **LinkedIn** — [santhosh-krishna](https://linkedin.com/in/santhosh-krishna-698638372)
- **Email** — santhoshkrishna.r67@gmail.com