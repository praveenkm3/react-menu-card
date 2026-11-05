# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

A small single-page React demo app ("project1") that renders a menu card grid.
`App.jsx` holds a hardcoded array of menu-item objects and maps them into
`Recipe` components, each composed of `Header` + `Content` + `Footer`. There is
no backend, no routing, and no external data fetching — everything is static,
client-side, and in-memory.

## Stack

- **Language:** JavaScript (JSX). No TypeScript source files exist, though
  `@types/react` / `@types/react-dom` are present as devDependencies for editor
  type hints only.
- **Framework:** React 19.2.5 + react-dom 19.2.5 (the only runtime
  dependencies).
- **Build tool:** Vite 8.0.10 with `@vitejs/plugin-react`.
- **Package manager:** npm (`package-lock.json` is present — do not introduce
  yarn/pnpm lockfiles).
- **Styling:** Plain CSS with custom properties (no Tailwind/CSS-in-JS/UI
  kit). Global tokens live in `src/index.css`; component/page styles live in
  `src/App.css`.
- **Linting:** ESLint 10 (flat config) with `eslint-plugin-react-hooks` and
  `eslint-plugin-react-refresh`.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint      # eslint .
```

There is **no test suite and no `test` script**. Do not assume Jest/Vitest
exists — if tests are requested, a framework must be added first and that
should be called out explicitly rather than assumed.

## Folder structure

```
src/
  assets/        images (hero.png, react.svg, vite.svg)
  components/    Header.jsx, Content.jsx, Footer.jsx, Navbar.jsx
  App.jsx        root component + hardcoded menu data
  App.css        page/component styles
  index.css      global reset + CSS custom properties (design tokens)
  main.jsx       React root render entry point
public/          static files served as-is (favicon.svg, icons.svg)
dist/            Vite build output — generated, do not hand-edit
```

Keep new components flat inside `src/components/` unless the project grows
enough to justify sub-folders (e.g. `hooks/`, `pages/`) — do not introduce
that structure speculatively.

## Conventions

- Component files use PascalCase (e.g. `Header.jsx`). Note the existing
  mismatch: `Navbar.jsx` exports a component named `NavBar` — follow the
  existing file's export name when editing it rather than "fixing" it as a
  drive-by change.
- Components receive data via `props` (no destructuring pattern currently
  used, e.g. `props.itemname`) — match the existing style within a file
  rather than mixing destructured and non-destructured prop access in the
  same component.
- No global state management (Redux/Zustand/Context) — local `useState` is
  used only where needed (see `Footer.jsx`). Don't introduce a state library
  for small additions.
- No Prettier config exists; formatting is not strictly enforced beyond
  ESLint's rules. Match surrounding code style in the file you're editing
  rather than reformatting unrelated lines.
- Menu data in `App.jsx` is currently hardcoded as individual `obj1`..`obj12`
  variables combined into an array. If extending this data, prefer adding to
  the existing array literal pattern unless asked to refactor it into a
  separate data file.

## Boundaries — do not modify

- `dist/` — generated Vite build output. Never hand-edit; regenerate via
  `npm run build`.
- `package-lock.json` — only change via `npm install`/`npm ci`, never by
  hand.
- `node_modules/` — never edit directly.

## Security notes

- No secrets, `.env` files, or API keys exist in this repo — it is a static
  front-end with no network calls. If a task introduces API calls, env vars,
  or auth, flag that this is new territory for the project and handle
  secrets via `.env` (gitignored), never hardcoded.
- The nav links in `Navbar.jsx` (`Home`, `Login`, `Register`, `Cart`) are
  currently non-functional placeholders (`href="#"`). Don't assume routing
  infrastructure exists when wiring these up — a router (e.g. React Router)
  would need to be added first.

## Known inconsistencies (do not "fix" silently)

- `Footer.jsx` uses `SetCount` (capitalized) as the `useState` setter name
  instead of the conventional `setCount`. Leave as-is unless explicitly asked
  to rename, since an agent-driven rename could be mistaken for an unrelated
  change.
- `dist/` is listed in `.gitignore` but may already exist on disk/in git
  history from before the ignore rule was added — confirm with the user
  before deleting or untracking it.
