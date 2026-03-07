# Next.js Scalable Architecture

A production-ready Next.js 16 (App Router) starter template engineered for scalability, clean code separation, and seamless AI agent integration.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (14 pre-installed components, fully RTL-migrated)
- **Internationalization (i18n)**: [next-intl](https://next-intl.dev/) (SSR, localized routing `/en`, `/fr`, `/ar`, automatic RTL layout detection)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode via standard `class` attributes)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Global) & [TanStack Query v5](https://tanstack.com/query/latest) (Server/Async State)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), and [jsdom](https://github.com/jsdom/jsdom)
- **Code Quality**: ESLint 9, Prettier, Husky, lint-staged, and commitlint
- **Package Manager**: [Bun](https://bun.sh/)

## ✨ Core Features

- **Strict Three-Layer Architecture**: Deeply integrated separation of concerns:
  - `components/`: Pure, presentational UI components. No API calls or business logic.
  - `containers/`: Coordinates screens and connects custom hooks to UI.
  - `hooks/` & `store/`: Dedicated to business logic and state.
- **AI Agent Preparedness**: Shipped with granular `.md` rule sets residing in the `ai/` folder, instructing coding agents (like Gemini/Antigravity) on precisely how to generate features respecting our architecture. Includes an `AGENTS.md` root file and `.agents/workflows/feature-generation.md`.
- **RTL & Dark Mode Native**: Setup from scratch to effortlessly handle Arabic (or Hebrew) layout shifts using logical properties alongside a beautifully synchronized dark mode.
- **Pre-configured Middleware**: Next.js 16 `proxy.ts` perfectly tailored to handle localization matching without interference from API routes or static assets.

## 📁 Project Structure

```bash
├── .agents/          # Agent workflows (e.g. feature-generation.md)
├── ai/               # Strict markdown instructions & architecture enforcers for AI tools
├── app/              # Next.js App Router (Nested by [locale])
├── components/       # Presentational UI components (shadcn ui primitives, etc)
├── containers/       # Smart components mapping state logic to pure UI
├── hooks/            # Business logic and queries
├── i18n/             # next-intl configuration files
├── lib/              # Utility functions and shared instances
├── messages/         # JSON translation dictionaries (if used locally)
├── public/           # Static assets and locational JSON files
├── services/         # API Layer (Axios clients, typed endpoints)
├── store/            # Global Zustand stores
├── styles/           # Global Tailwind & Theme CSS
└── types/            # Global TypeScript definitions
```

## 🤖 AI Configuration (Agent Rules)

This architecture strictly enforces its layer constraints by guiding AI coding assistants. Before making changes or generating new features, agents are configured to read the `ai/` directory policies:

- `system-instructions.md`: Core standards and stack overview.
- `architecture-enforcer.md`: Strict boundaries for UI, Container, and Logic layers.
- `prompt-patterns.md`: Blueprints for standard files.
- `anti-patterns.md`: Things not to do.
- `code-review-rules.md`: Checklists for validating pull requests.

## 🛠️ Getting Started

First, install dependencies using Bun:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `bun run dev`: Start development server.
- `bun run build`: Create an optimized production build.
- `bun run start`: Start the production server.
- `bun run test`: Run Vitest instances once.
- `bun run test:watch`: Run Vitest in continuous watch mode.
- `bun run test:coverage`: Generate a Vitest test coverage report.
- `bun run lint`: Lint all JavaScript/TypeScript files.
- `bun run lint:fix`: Auto-fix linting errors.
- `bun run format`: Format code using Prettier.
