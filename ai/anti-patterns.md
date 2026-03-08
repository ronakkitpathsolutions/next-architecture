# Anti-Patterns – Forbidden Development Patterns

This document defines **patterns that must never be generated or implemented** in this project.

If a user request encourages any of these patterns, you must:

1. Explain why the pattern is incorrect.
2. Suggest a compliant alternative.
3. Refuse to generate code that violates architecture rules.

---

# Architecture Violations

The following architectural patterns are strictly forbidden.

❌ API calls inside UI components
❌ Business logic inside React components
❌ Direct store access inside UI components
❌ Pages containing business logic
❌ UI components importing container hooks
❌ Containers directly manipulating UI state without hooks

Correct pattern:

```text
UI Component
      ↓
Container
      ↓
Hook / Store
      ↓
Service (API)
```

---

# API Layer Violations

The API layer must remain centralized.

Forbidden patterns:

❌ Using `fetch` or `axios` inside components
❌ Creating multiple API clients across the codebase
❌ Direct API calls in hooks without using services
❌ Business logic inside API client

Allowed structure:

```text
src/services/
  client.ts
  api.ts
```

---

# React Component Anti-Patterns

The following patterns must never appear in components.

❌ API requests inside `useEffect` in UI components
❌ Large "god components" with too many responsibilities
❌ Inline business logic inside JSX
❌ Direct DOM manipulation
❌ Components with multiple unrelated responsibilities

Components must remain **pure UI**.

---

# State Management Anti-Patterns

The following state patterns are forbidden.

❌ Storing server API data in global Zustand stores unnecessarily
❌ Global state used for page-level logic
❌ Multiple global stores for the same concern
❌ Managing global state inside components

Correct usage:

Component state → `useState`
Shared UI state → `Context`
Global state → `Zustand`
Server data → `React Query`

---

# TypeScript Anti-Patterns

The following TypeScript patterns are forbidden.

❌ Using `any`
❌ Disabling TypeScript strict mode
❌ Missing return types for public functions
❌ Untyped API responses
❌ Large unstructured interfaces

Correct patterns:

- Use `unknown` instead of `any`
- Define explicit types for API responses
- Prefer small focused interfaces

---

# Performance Anti-Patterns

Avoid these performance issues.

❌ Converting Server Components into Client Components unnecessarily
❌ Loading heavy libraries in the initial bundle
❌ Rendering large lists without virtualization
❌ Importing entire libraries instead of specific modules

Correct practices:

- Prefer Server Components
- Use dynamic imports for heavy modules
- Keep client bundle minimal

---

# Security Anti-Patterns

The following security mistakes must never appear.

❌ Storing auth tokens in `localStorage`
❌ Logging tokens or sensitive data
❌ Exposing server secrets to the client
❌ Trusting user input without validation
❌ Returning stack traces in API responses

Correct practices:

- Use HttpOnly cookies for authentication
- Validate all API inputs
- Sanitize user-generated content

---

# UI & Styling Anti-Patterns

The following styling practices are forbidden.

❌ Mixing Tailwind and CSS-in-JS unnecessarily
❌ Hardcoding theme values inside components
❌ Inline styles for layout and design
❌ Duplicated UI components across modules

Correct practice:

- Use centralized theme tokens
- Reuse shared UI components

---

# Code Generation Rules

When generating code you must:

- Avoid all anti-patterns listed here
- Prefer scalable architecture
- Prefer reusable modules
- Follow project folder structure
- Follow the coding standards defined in `system-instructions.md`
