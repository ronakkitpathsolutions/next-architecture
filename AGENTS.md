# Project Agent Instructions

This is a **Next.js** project using the **App Router** architecture with **TypeScript**.

## Architecture Rules

Before generating, reviewing, or modifying any code, you **MUST** read and follow all rule files in the `ai/` directory:

| File                                                    | Purpose                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| [system-instructions.md](ai/system-instructions.md)     | Core coding standards, project stack, and architecture principles |
| [architecture-enforcer.md](ai/architecture-enforcer.md) | Strict layered architecture enforcement rules                     |
| [code-review-rules.md](ai/code-review-rules.md)         | Code review checklist and validation rules                        |
| [prompt-patterns.md](ai/prompt-patterns.md)             | Standard patterns for feature generation                          |
| [anti-patterns.md](ai/anti-patterns.md)                 | Forbidden patterns that must never be generated                   |

## Key Architectural Constraints

- **Three-layer architecture**: UI → Container → Business Logic
- **UI components** (`src/components/`) must be pure presentational — no API calls, no business logic, no store access
- **Containers** (`src/containers/`) coordinate screens and connect hooks to UI
- **Business logic** lives in `src/hooks/` and `src/store/` only
- **API layer** uses a two-file pattern: `src/services/client.ts` (Axios instance) + `src/services/api.ts` (typed endpoints)
- **TypeScript strict mode** — `any` is forbidden, use `unknown` instead
- **Files** must use kebab-case naming

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS (preferred), CSS Modules (allowed)
- **State**: Zustand (global), TanStack Query (server), useState (component)
- **Package Manager**: Bun

## Path Aliases

The project uses `@/*` mapping to `src/*`.
