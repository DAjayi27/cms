# Architecture

## Backend (Spring Boot)

`src/main/java/backend/`

- **config/** – JDBC converters and configuration mapping enums and `LocalDateTime` so SQLite can persist them as text.
- **controllers/** – REST controllers exposing `/api/courses` and `/api/tasks` endpoints.
- **course/** – `Course` entity and `CourseRepository` for CRUD operations.
- **task/** – `Task`, `TaskWithCourse` DTO and `TaskRepository` combining tasks with their courses.
- **utils/** – Enum types used across the domain (`Priority`, `TaskStatus`, `CourseStatus`, `Term`).
- **BackendApplication.java** – Spring Boot entry point.

`src/main/resources/` holds configuration and database schema. `schema.sql` defines tables `course` and `task` with foreign key constraints.

## Frontend (Vue 3 + Vite)

`src/frontend/`

- **src/router/** – Vue Router configuration mapping URLs to dashboard, course and task views.
- **src/views/** – Page-level components (`Dashboard.vue`, `Courses.vue`, `Tasks.vue`, etc.).
- **src/components/** – Reusable UI elements, modals, cards and tables.
- **src/stores/** – Pinia stores for application state.
- **src/utils/** – Shared helpers such as `fetchData` for HTTP calls and string utilities.
