# Santhosh Krishna R — Portfolio

A cinematic, neumorphic single-page portfolio built with Next.js and TypeScript. The site presents professional work through an editorial, tactile OS-style interface — client work, projects, technology, and contact — all in one scroll.

## Features

- **Client Work** — production work delivered for real clients (Raahi Global client application)
- **Projects** — expandable project modules with engineering details: story, architecture flow, decisions, components, and live previews
- **Technology** — interactive technology matrix with highlighted core skills
- **Connect** — direct links to GitHub, LinkedIn, email, and resume
- **Neumorphic design system** — CSS-driven shadow engine, warm ivory palette, mechanical interaction physics
- **Fully responsive** — mobile-first layout with no horizontal overflow across breakpoints
- **Accessible** — semantic sections, aria labels, keyboard-focusable controls, reduced-motion support

## Tech Stack

- **Framework** — Next.js (App Router), React, TypeScript
- **Styling** — Tailwind CSS with a custom CSS shadow/variable design system
- **Typography** — Inter + Geist Mono via `next/font`
- **Performance** — static generation, no heavy client animations, native scrolling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start the development server     |
| `npm run build`  | Create an optimized production build |
| `npm run start`  | Serve the production build       |
| `npm run lint`   | Run ESLint checks                |

## Project Structure

```
src/
  app/          # Page, layout, global styles
  components/   # UI components (surfaces, controls, cinematic, previews)
  hooks/        # Section scroll observer
  styles/       # Design system stylesheets (typography, materials, modules)
```

## Contact

- **GitHub** — [santhosh9863](https://github.com/santhosh9863)
- **LinkedIn** — [santhosh-krishna](https://linkedin.com/in/santhosh-krishna-698638372)
- **Email** — santhoshkrishna.r67@gmail.com