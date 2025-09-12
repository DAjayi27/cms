# Frontend Overview

The SPA is built with Vue 3 and Vite and uses Pinia for state management.

## Routing

`src/router/index.ts` configures five routes:

- `/` → `Dashboard.vue`
- `/about` → `AboutView.vue`
- `/courses` and `/course/:id` → `Courses.vue`
- `/tasks` → `Tasks.vue`

## Utilities

`src/utils/fetchData.ts` wraps the Fetch API with JSON handling and error propagation. `functions.ts` supplies helpers like `toTitle` for transforming enum strings into human-readable labels.

## State

Pinia stores (e.g., `stores/counter.ts`) demonstrate reactive state modules.

## Components & Views

Views such as `Courses.vue` and `Tasks.vue` assemble reusable components from `src/components/` (cards, tables, modals) to present and manipulate data retrieved from the backend.
