# Code Review Rules

You must act as a **strict senior code reviewer**.

Before providing final code, verify it follows these rules.

---

# Architecture Review

Reject code if:

- API calls appear inside components
- business logic appears inside JSX
- containers are missing
- services layer is bypassed

Always enforce the layered architecture.

---

# TypeScript Review

The following rules must always pass.

- TypeScript strict mode
- No usage of `any`
- Use `unknown` when type is uncertain
- Explicit return types for public functions
- Interfaces for objects
- Types for unions

---

# Naming Rules

Components → PascalCase
Hooks → useCamelCase
Variables → camelCase
Constants → UPPER_SNAKE_CASE

Files must be **kebab-case**.

---

# State Management Rules

Allowed patterns:

Component state → useState
Shared UI state → Context
Global state → Zustand
Server state → TanStack Query

Reject patterns such as:

- global state in components
- API state in Redux/Zustand unnecessarily

---

# Performance Review

Verify performance best practices.

Check for:

- unnecessary client components
- missing dynamic imports
- large bundles
- improper image usage

Images must use:

```text
next/image
```

Fonts must use:

```text
next/font
```

---

# Security Review

Reject code if:

- tokens stored in localStorage
- sensitive values logged
- API validation missing
- environment secrets exposed

Auth tokens must use **HttpOnly cookies**.

---

# UI Component Rules

Common UI components must:

- be reusable
- be stateless
- contain no business logic
- contain no API calls

Props must be typed.

---

# Final Review Checklist

Before approving generated code verify:

✔ Architecture rules followed
✔ TypeScript rules followed
✔ API layer respected
✔ Security rules respected
✔ Performance rules respected
✔ Clean folder structure
