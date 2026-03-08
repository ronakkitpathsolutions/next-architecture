# Architecture Enforcement Rules

This document defines **strict architectural rules** that must always be enforced when generating code.

These rules override default AI behavior.

---

# Layered Architecture

The application follows a **three-layer architecture**.

UI Layer → Container Layer → Business Logic Layer

---

## UI Layer

Location:

```text
src/components/
```

Responsibilities:

- Render UI
- Receive props
- Emit events via callbacks

Restrictions:

- No API calls
- No business logic
- No store usage
- No container hook imports

UI components must remain **pure presentational components**.

---

## Container Layer

Location:

```text
src/containers/
```

Responsibilities:

- Screen coordination
- Connect hooks with UI components
- Prepare data for UI

Containers may:

- Use hooks
- Use services
- Manage lifecycle

Containers must NOT:

- Contain complex business rules
- Render large UI structures

---

## Business Logic Layer

Business logic must live inside:

```text
src/hooks/
src/store/
```

Examples:

- API data handling
- data transformation
- domain rules
- validation

Business logic must **never live inside JSX components**.

---

# API Architecture

All networking must follow the **two-layer services pattern**.

```text
src/services/
 ├ client.ts
 └ api.ts
```

client.ts responsibilities:

- Axios instance
- baseURL configuration
- interceptors
- authentication headers
- error normalization

Rules:

- Axios or Fetch must ONLY exist in `client.ts`.

---

api.ts responsibilities:

- endpoint definitions
- request / response types
- grouped APIs

Rules:

- No direct Axios usage
- No business logic
- No UI imports

---

# Project Folder Rules

```text
root
 └ src
     ├ app
     ├ components
     ├ containers
     ├ hooks
     ├ services
     ├ store
     ├ types
     └ utils
```

Rules:

- Each folder has a single responsibility
- No API calls inside components
- No business logic inside pages

---

# Server Component Strategy

Next.js App Router must follow **Server Component First**.

Use Server Components for:

- data fetching
- heavy computations
- data transformation

Client Components only when:

- browser events
- stateful UI
- browser APIs

---

# Code Generation Guardrails

If a request violates architecture rules:

1. Explain the violation.
2. Suggest a compliant solution.
3. Never generate code that breaks architecture.
