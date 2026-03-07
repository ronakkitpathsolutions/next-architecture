# Prompt Patterns

These patterns guide how code should be generated.

---

# Feature Implementation Pattern

When implementing a new feature, follow this order.

1. API endpoints

```text
services/api.ts
```

2. Business logic hook

```text
hooks/use-feature-name.ts
```

3. Container

```text
containers/feature-container.tsx
```

4. UI component

```text
components/feature-ui.tsx
```

---

# Container Pattern

Containers should:

- call hooks
- prepare data
- pass props to UI components

Example structure:

```text
containers/user-list-container.tsx
```

Responsibilities:

- data fetching
- event handlers
- loading state
- error handling

---

# Hook Pattern

Hooks should:

- fetch data
- manage state
- return handlers

Hooks must return:

```typescript
{
  (data, loading, error, actions);
}
```

Hooks must never return JSX.

---

# UI Component Pattern

UI components should:

- render props
- emit callbacks

Example:

```text
components/user-table.tsx
```

Props example:

```typescript
type Props = {
  users: User[];
  onDelete: (id: string) => void;
};
```

---

# API Pattern

API endpoints must follow a typed structure.

Example:

```typescript
getUsers(): Promise<User[]>
createUser(data: CreateUserInput): Promise<User>
```

All API calls must go through the central API client.

---

# Error Handling Pattern

Use normalized error handling.

Hooks must return errors like:

```typescript
{
  error: string | null;
}
```

UI decides how to display errors.

---

# State Pattern

Use correct state strategy.

Component state:

```typescript
useState;
```

Server data:

```typescript
React Query
```

Global state:

```typescript
Zustand;
```
