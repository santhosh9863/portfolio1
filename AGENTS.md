<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Typro OS Portfolio — Build Log

## Final state (Phase 3E complete)

### What exists
- Single-page neumorphic OS interface at `/` composed entirely of mechanical components
- **One inset well** (`well-typro`) housing all content: SYSTEM PROFILE, PULSE SYSTEM + CORE ENGINE module bays, TECHNOLOGY MATRIX grid, SYSTEM HISTORY terminal, COMMUNICATION controls
- **One raised bar** (`surface-raised`) below the well with 3 nav SidebarNodes (WORK/CRAFT/SYSTEM)
- Footer branding text

### Component inventory
| Component | Depth | Role |
|-----------|-------|------|
| InsetPanel | inset | Main workspace well |
| RaisedPanel | raised | Bottom nav bar |
| TactileButton | raised→inset on press | Comm channel buttons |
| ModuleBay | raised→inset on press → 5-phase mechanical expansion | Operational engineering subsystem with internal tab navigation, DisplayMonitor, SubsystemChips, engineering notes, runtime logs |
| DisplayMonitor | raised frame + inset cavity | Industrial mounted monitor — 6-layer architecture (frame, cavity, screen, glass reflection, noise texture, operational glow). Multi-channel hardware source selectors with power-down/power-up transitions. Status strip. Terminal-display pulse synchronization. Activation sequence (off→powering→online, 300ms). Hover brightness/reflection response. |
| SubsystemChip | raised-sm → inset-sm on press | Tactile component matrix chip with hover lift |
| SystemNode | raised-sm→inset-sm when open | Tech tile with utilization reveal |
| SidebarNode | raised-sm→inset when active | Nav control with accent bar |
| StatusIndicator | neutral (text) | ONLINE/PROCESSING/ERROR state |
| DataRow | neutral (text) | Fixed-width label+value pair |
| TerminalCore | surface-cavity | 7-channel log stream with prompt and blink cursor |
| HeaderBar | neutral (text) | OS title + version + status rail + clock |
| BootSequence | overlay (fixed) | 5-stage industrial boot sequence |
| CursorTracker | null (passive) | Mousemove → CSS custom properties for cursor-aware effects |
| SystemClock | neutral (text) | Real-time HH:MM:SS + date |

### Spacing rule enforced
All spacing values restricted to: **0px, 8px, 16px, 24px, 40px**. Phase 1F fixed 12 violations across 4 files.

### Mechanical expansion physics (Phase 3B)
ModuleBay now uses 5-phase mechanical expansion:
1. **idle** — button is raised (btn-typro default)
2. **pressed** (t=0ms) — button inverts to inset shadow, scale(0.985)
3. **opening** (t=40ms) — button softens slightly, grid expansion begins (400ms cubic-bezier)
4. **open** (t=440ms) — content sections stagger in with 80ms intervals (8 sections over 560ms)
5. **closing** — content fades (200ms), grid collapses, returns to idle

Closing reverses the sequence: content hides instantly, grid collapses, button returns to raised.

### Active module focus system (Phase 3B)
- `activeModule` state tracked in page.tsx
- When one module opens, all other modules get `module-dimmed` class (opacity 0.55, grayscale 0.15)
- Active module gains full clarity + local contrast
- Dimmed module shadows also reduce intensity
- Only one module feels fully active at a time

### DisplayMonitor component (Phase 3C)
6-layer industrial mounted monitor:
1. **Outer frame** — raised neumorphic housing (4px/8px shadow, 12px border-radius)
2. **Inset cavity** — deeper screen well (12px margin, 6px radius, stronger inset shadow)
3. **Screen content** — active content with activation brightness transition
4. **Glass reflection** — upper-left light source gradient, shifts on hover (140deg drift)
5. **Screen noise** — imperceptible horizontal scanlines (repeating-linear-gradient, 0.2 opacity)
6. **Operational glow** — blue-white ambient aura (24px spread, 0.06 opacity, 500ms fade)

Activation sequence (when module opens):
- **off** → **powering** (0ms): screen dims to 0.5 opacity, 0.6 brightness
- **powering** → **online** (300ms): screen reaches full brightness, glow emerges
- Hover: brightness 1.02, glass reflection shifts from 135° to 140°

Multi-screen channel system:
- Channels defined as `DisplayChannelDef[]` with `id`, `label`, `content`
- Hardware source selector buttons below the status strip (raised neumorphism, active = depressed)
- Channel change sequence: dim (100ms) → content swap → brightness recovery (200ms total)
- Selectors only visible when `powerState === "online"`
- PULSE SYSTEM has 3 channels (OVERVIEW, ANALYTICS, DASHBOARD); CORE ENGINE has 2 (OVERVIEW, ANALYTICS)

Status strip:
- Tiny monospace labels + values (`8px` font, `0.06em` tracking)
- Separated from screen by border-top (rgba 0.035)
- Shows RUNTIME, SYNC, FPS status

Terminal-display pulse:
- `pulseKey` prop increments when runtime logs update in ModuleBay
- Triggers 400ms brightness pulse (1.04) + glow boost (0.6 opacity)
- Creates psychological synchronization between terminal and display

`--typro-text-rgb: 45, 52, 54` added to CSS variables for text-based shadow classes.

### SubsystemChip component (Phase 3B)
- Raised neumorphic chip (3px shadow)
- Hover: lift (+1px shadow, -0.5px translateY)
- Press: inset inversion + scale(0.985)
- 40ms mechanical transition

### Internal module navigation (Phase 3B)
Each ModuleBay has 3 hardware mode selector tabs:
- **OVERVIEW** — system header, status, architecture diagnostics, component matrix, DisplayMonitor
- **DISPLAY** — full DisplayMonitor with diagnostic screen overlay
- **DEPLOYMENT** — engineering notes, access controls, runtime logs
- Tabs use raised/inset neumorphism (active = depressed)
- Tab switch preserves mechanical feel

### Enhanced project structure (Phase 3B)
Every module contains:
1. SYSTEM HEADER — name + subtitle + build status with LED
2. STATUS STRIP — inline indicators in header
3. SYSTEM OVERVIEW — diagnostic rows (architecture, deployment, runtime, database)
4. COMPONENT MATRIX — tactile SubsystemChip grid
5. LIVE DISPLAY PANEL — DisplayMonitor with operational readout
6. ENGINEERING NOTES — log-style engineering language
7. ACCESS CONTROLS — machined TactileButtons with bracket labels
8. RUNTIME LOGS — sparse operational updates with channel tags
9. TAB NAVIGATION — 3 hardware mode selectors

### Environmental atmosphere system (Phase 3D)
- **Secondary atmosphere layer** (`body::after`): linear gradient (180°, transparent→rgba(0,0,0,0.008)→rgba(0,0,0,0.015)), opacity controlled by `--env-depth` CSS variable (0→1), transitions at 600ms to create operational depth as user scrolls through sections
- **Section-based depth shifts** via `:root[data-active-section]`: profile=0, modules=0.3, matrix=0.15, history=0.6 (terminal zone deeper), communication=0.1 (calmer)
- **Surface tension** via `:root[data-focused]`: when `activeModule` is set, `--env-tension: 1` increases vignette opacity by 0.015 via `calc()` in body::before, and `well--focused` class tightens well shadow (+1px inset, slight intensity increase)
- **Vignette responds to tension**: body::before uses `calc(0.04 + var(--env-tension, 0) * 0.015)` for dynamic edge darkening

### Section tracking (Phase 3D)
- `useSectionObserver` hook uses IntersectionObserver with 11 thresholds (0–1) on `[data-section]` elements
- Tracks 5 workstation zones: profile, modules, matrix, history, communication
- Sets `data-active-section` on `:root` via `useEffect`
- Header displays active section context as bracketed monospace label (e.g. `[HISTORY]`) in status rail

### Idle detection system (Phase 3E)
- `useIdleDetector` hook listens for mousemove, mousedown, keydown, scroll, touchstart, wheel events
- 10s inactivity timeout sets `data-idle` on `:root`
- Active state restores immediately on any user interaction
- Idle effects: terminal pauses 2.5× longer between log entries, LED indicators slow from 4s→8s and use `led-pulse-idle` keyframe (softer opacity range), cursor blink slows 1s→2.5s, shadow-breathe slows 8s→14s, raised-breathe slows 10s→18s

### Hover attention response (Phase 3E)
- `body:has([data-section])` selectors detect which zone is being hovered
- **Modules hover**: `body::after` opacity increases by 0.1 — nearby atmosphere deepens
- **History hover**: opacity increases by 0.15 — terminal zone further compresses
- **Matrix hover**: opacity increases by 0.08 — slight density increase
- **Communication hover**: opacity increases by 0.08 — calmer atmosphere
- Changes transition at 350ms — feels like environmental focus shift, not animation
- Terminal cavity hover (`surface-cavity:hover .cursor-blink`): `--cursor-speed` drops to 0.4s, cursor blinks faster when user is near

### Micro-interaction refinement (Phase 3E)
- **btn-typro hover enhanced**: translateY(-0.5px→-0.8px) + scale(1.002) for more pronounced "lifting before pressing" feel
- **system-node CSS class**: dedicated class with 3px/6px raised shadow, hover pushes to 5px/10px with -0.5px Y lift, active inverts to 3px/6px inset with scale(0.985)
- **system-node--open class**: persistent pressed state when node is expanded
- **SystemNode active indicator**: `─── ACTIVE ───` label appears below utilization data when node is opened
- **Interactive elements now use CSS classes** (`cursor-blink`, `led-indicator`) instead of inline `animate-[...]` Tailwind syntax, enabling idle-state overrides via CSS custom properties (`--cursor-speed`, `--led-speed`)

### Operational indicator system (Phase 3E)
- `.led-indicator` class uses `animation: led-pulse var(--led-speed, 4s) ease-in-out infinite`
- `.cursor-blink` class uses `animation: blink-cursor var(--cursor-speed, 1s) step-end infinite`
- `--led-speed` and `--cursor-speed` CSS custom properties enable runtime speed control without redefining animations
- Idle state overrides both variables for calmer electrical behavior

### Scroll physics (Phase 3D)
- Lenis duration increased 1.2→1.5, wheelMultiplier reduced 0.8→0.6, touchMultiplier 0.6→0.5
- Same mechanical easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Creates heavier, more controlled inertia with operational drag tension

### Motion system
- **Ambient**: shadow-breathe (8s, 14s idle) on well, raised-breathe (10s, 18s idle) on nav bar — ±1px shadow change, sub-perception
- **Micro-interaction**: hover activation 120–180ms, press 40ms, focus transitions 250–400ms, operational adaptation 500–1200ms
- **Idle transitions**: 4s–12s for environmental relaxation after inactivity
- **Terminal hover**: cursor accelerates (1s→0.4s) when `surface-cavity` is hovered
- **Environmental**: atmosphere shifts 600ms (350ms on hover), surface tension 400ms, depth migration 500ms
- **Mechanical**: 40ms press, 150ms state, 400ms grid expansion with 40-440ms phase delays, 80ms content stagger intervals
- **Display activation**: 300ms power-on sequence (off→powering→online), 200ms channel transition (dim→swap→recover), 150ms brightness ramp, 300ms reflection drift, 400-500ms glow fade-in
- **Display pulse**: 100ms brightness spike, 200ms glow boost, 400ms total pulse duration
- **Feedback**: led-pulse (3s for PROCESSING, 4s for ONLINE), pulse-processing (0.8s comm transmit), pulse-error (0.4s shake)
- **Navigation**: Lenis smooth scroll (duration 1.5, mechanical easing, wheelMultiplier 0.6, touchMultiplier 0.5)
- **Terminal**: blink-cursor (1s step-end), 500-1000ms line reveal with burst/ambient timing
- **No bounce, spring, elastic, or decorative animation**

### Live state machines
- **Idle detection**: 10s inactivity timeout via event listeners (mousemove/mousedown/keydown/scroll/touchstart/wheel), sets `data-idle` on `:root`, immediate restore on any interaction
- **Hover attention**: `body:has()` selectors detect hover on [data-section] zones, adjusts body::after opacity by +0.08 to +0.15 depending on zone
- **Terminal intelligence**: `idle` prop scales all timing by 2.5×, cursor accelerates (1s→0.4s) on terminal cavity hover
- **Environment**: 5-section scroll tracking via IntersectionObserver (profile/modules/matrix/history/communication), updates `data-active-section` on `:root`
- **Environment**: depth variable (0→0.6 depending on section), tension variable (0→1 when module active)
- DisplayMonitor: 3-state activation (off→powering at 0ms→online at 300ms)
- DisplayMonitor: multi-channel source selection with power-transition (dim→swap→recover, 200ms)
- DisplayMonitor: pulse state (400ms, triggered by terminal log updates via pulseKey)
- ModuleBay: 5-phase mechanical expansion (idle→pressed→opening→open→closing)
- ModuleBay: 3-tab internal navigation (overview/display/deployment)
- SystemNode: click-to-reveal utilization
- Comm buttons: IDLE→TRANSMITTING... (0.8s)→LINK ESTABLISHED (1.6s)→IDLE
- SidebarNode: active inset + accent border indicator
- BootSequence: 5-stage 2s boot (INITIALIZING→LOADING→VERIFYING→ESTABLISHING→STABLE→SESSION ESTABLISHED)
- UPTIME ticks every 30s, MEMORY drifts ±2% every 30s, LATENCY fluctuates, NETWORK toggles

### Color system (Typro-exact)
- bg: #e0e5ec, bg-secondary: #d1d9e6, text: #2d3436
- shadow-light: #ffffff, shadow-dark: #a3b1c6
- accent: #0984e3, correct: #00b894, incorrect: #d63031
- Three-tier contrast: foreground (high), muted (secondary), opacity (tertiary)

### Build
`npm run build` compiles clean with Next.js 16.2.6 + Turbopack. TypeScript strict. No lint errors.

### What was removed/deleted
- ScreenFrame.tsx no longer imported (replaced by DisplayMonitor in ModuleBay)
- `overview` prop removed from ModuleBay in Phase 2F
- pulse-online keyframe exists in CSS but unused (StatusIndicator uses led-pulse)
- No decorative elements, glassmorphism, gradients, floating cards, idle animations, or startup aesthetics
