---
description: how to generate a new feature following the project architecture
---

# Feature Generation Workflow

Follow these steps in order when creating a new feature.

## 1. Define Types

Create or update type definitions in `types/`:

```text
types/feature-name.ts
```

Define request, response, and domain model interfaces.

## 2. Create API Endpoints

Add typed API functions in `services/api.ts` using the central client:

```text
services/api.ts
```

Do NOT use `fetch` or `axios` directly — always go through `services/client.ts`.

## 3. Create Business Logic Hook

Create a custom hook in `hooks/`:

```text
hooks/use-feature-name.ts
```

The hook should:

- Call services for data
- Manage state
- Return `{ data, loading, error, actions }`
- Never return JSX

## 4. Create Container

Create a container component in `containers/`:

```text
containers/feature-name-container.tsx
```

The container should:

- Call hooks
- Prepare data for the UI
- Pass props and callbacks to UI components

## 5. Create UI Component

Create a presentational component in `components/`:

```text
components/feature-name.tsx
```

The UI component should:

- Accept typed props only
- Render UI
- Emit events via callbacks
- Contain NO business logic, NO API calls, NO store access

## 6. Wire to Page

Add the container to a page in `app/`:

```text
app/feature-name/page.tsx
```

Pages must only render containers. No business logic in pages.

## 7. Verify

- Confirm TypeScript strict mode passes with no errors
- Confirm no `any` types are used
- Confirm the layered architecture is respected
- Confirm file names use kebab-case
