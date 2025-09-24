# CMS

A full-stack course management system.

## Overview
- **Backend** – Java 17 with Spring Boot 3.5, Spring Data JDBC and an SQLite database.
- **Frontend** – Vue 3 + Vite single-page application using Pinia for state and Bootstrap for styling.

## Config Setup
Create 3 env files for prod, dev and preview (satging), Fill in the variables with your own values

### .env.development
```env
VITE_PORT=100
VITE_PREVIEW_PORT=100
```

### .env.preview
```env
VITE_PORT=100
VITE_PREVIEW_PORT=100
```

### .env.production
```env
VITE_API_BASE=https://127.0.0.2
VITE_PREVIEW_PORT=27
```

## Running the project

### Backend
```bash
./gradlew bootRun
```
The service starts on port **8100** and initializes `schema.sql` on first run.

### Frontend
```bash
cd src/frontend
npm install
npm run dev
```
Vite serves the SPA at `http://localhost:5173` by default.

## Project layout
```
cms/
├── build.gradle
├── src/
│   ├── main/
│   │   ├── java/backend/      # Spring Boot source
│   │   └── resources/         # application.properties, schema.sql, static HTML
│   └── frontend/              # Vue 3 app
└── ...
```

See the `docs/` directory for architectural notes and API details.
