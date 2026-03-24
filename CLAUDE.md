# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Type-check and build for production (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

Shanghai Rummy is a single-page React + TypeScript app built with Vite. It has two routes:
- `/` — Rulebook page
- `/validator` — Hand validation tool

**Key modules:**

- `src/types/shanghai.ts` — Core game types (`Card`, `Round`, `ContractRequirement`, `ValidationResult`)
- `src/constants/rules.ts` — Game rules: 7 rounds, scoring (2-9=5pts, 10-K=10pts, A=15pts, Joker=20pts)
- `src/utils/validator.ts` — Game logic for validating Sets and Runs; handles Joker substitution, Ace-high/low duality, and combinatorial run checking
- `src/hooks/useLocalStorage.ts` — Generic hook used to persist theme and language preferences
- `src/i18n.ts` — i18next setup; supports English, Portuguese, Spanish with `localStorage` key `shanghai-language`

**Component structure:**
- `Rulebook.tsx` — Displays rounds, scoring, and rules with search functionality
- `HandValidator.tsx` — Interactive card-picking UI that validates hands against round contracts
- `Card.tsx` — Visual playing card component

**Routing:** TanStack Router (file-based). Routes are defined in `src/main.tsx`.

**Styling:** Radix UI Themes (iris accent, mauve gray) + custom CSS variables in `index.css` for glassmorphism, dark mode, and animations. No CSS-in-JS.

**State management:** Local `useState`/`useEffect` with prop drilling. No global store.
