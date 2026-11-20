# AGENTS.md

## Commands
- Install: `npm install` (`package-lock.json` present)
- Dev server: `npm run dev` (Vite)
- Production build: `npm run build` (runs `tsc -b` then `vite build`)
- Lint: `npm run lint` (Oxlint; config in `.oxlintrc.json`)
- Preview build: `npm run preview`
- No test script or CI workflow is configured.

## Project setup
- React 19 + TypeScript 7 + Vite 8 app (`type: module`); source in `src/`, entry `src/main.tsx` -> `src/App.tsx`.
- TypeScript uses project references: `tsconfig.json` -> `tsconfig.app.json` (app, `src`) and `tsconfig.node.json` (`vite.config.ts`). Build runs `tsc -b` (use for type checking).
- Vite plugins: `@tailwindcss/vite` and `@vitejs/plugin-react`. Tailwind v4 is wired via Vite plugin; `src/index.css` uses `@import 'tailwindcss';`.
- Path alias: `@/*` -> `./src/*` (configured in `vite.config.ts` and `tsconfig.app.json`); prefer `@/...` imports for app code when appropriate.

## Conventions (repo-specific)
- Components live in `src/components/` (or a subfolder such as `src/components/landing/`) and are re-exported from `src/components/index.ts` (barrel); add new shared UI components there and export them.
- One React component per file, including icon components; place related components in a subfolder with an `index.ts` barrel that is re-exported from `src/components/index.ts`.
- Use absolute `@/...` imports (and re-exports) everywhere in `src/`; never use relative paths such as `./` or `../`.
- Existing component style: `type XProps = React.ComponentProps<'...'> & {}` and `export let Component: React.FC<XProps> = ...` (named exports, not default).
- Formatting (Prettier, `.prettierrc.json`): no semicolons, single quotes, print width 100.
- Oxlint enforces `react/rules-of-hooks` (error) and `react/only-export-components` (warn, `allowConstantExport: true`).

## Notes
- `README.md` is mostly Vite template text; prefer `package.json` and config files as source of truth for scripts/tooling.
- `src/App.css` contains template/legacy styles that may be unused by current `App.tsx`; check before relying on or extending it.
