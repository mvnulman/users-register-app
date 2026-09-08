# react-node-fullstack-app

Full-stack monorepo project with React on the client and Node.js on the server, focused on API development, backend fundamentals, and full-stack architecture.

It is a complete user management system composed of two independently developed parts that communicate over HTTP:

- **Express + Prisma (MongoDB) REST API** — exposes a JSON-only CRUD interface (`GET`, `POST`, `PUT`, `DELETE /users`) with search/filter support through query parameters, CORS enabled for cross-origin consumption, and duplicate-email handling (HTTP 409).
- **React (Vite) single-page application** — a modern, type-driven frontend styled with Tailwind CSS that consumes the API through TanStack Query, validates input with Zod, and manages forms with React Hook Form.

## Goal

The main goal of this project is to strengthen backend development skills — especially Node.js, API design, database modeling, and REST conventions — while exercising the full-stack relationship between an API and a consumer application.

Beyond learning the server side, the project also explores how frontend and backend integrate around shared contracts:

| Concern | How it is handled |
|---|---|
| **Data contract** | The Prisma model (`User`) defines the shape of the records; the frontend mirrors it in a `Zod` schema so both sides agree on the payload. |
| **Input validation** | Zod validates on the client (required fields, e-mail format, and age range) and the database enforces constraints on the server (non-null fields, unique e-mail). |
| **Server communication** | All requests are centralized in `client/src/api/userService.js`, which exposes hooks (`useAddUser`, `useUsers`) built on TanStack Query. |
| **Asynchronous state** | React Query abstracts loading/error/success states and keeps the UI synchronized through cache invalidation after a registration. |
| **Form state** | React Hook Form drives controlled inputs and field-level errors, integrating with Zod through a resolver. |

### Learning objectives

- Design RESTful APIs with clear routes, status codes, and error handling.
- Model data with an ORM (Prisma) and persist it in MongoDB.
- Build a client that depends on the API through a typed validation layer.
- Separate concerns across the monorepo: `client/`, `server/`, and documentation in `docs/`.
- Apply recognized React patterns: hooks, component composition, routing, and server-state management.

## Tech Stack

### Backend
- Node.js
- Express
- Prisma (MongoDB)

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Zod
- TanStack Query (React Query)

## Project Structure

```
react-node-fullstack-app/
├── client/    # React application (Vite)
│   └── src/
│       ├── api/          # React Query services (userService)
│       ├── components/   # Pages and form components
│       └── validation/   # Zod schemas
├── server/    # Node.js API (Express + Prisma)
├── docs/      # Documentation and screenshots
├── .gitignore
└── README.md
```

## Running Locally

### Server

```bash
cd server
npm install
npm run db:generate
npm run db:push
npm run dev
```

The API runs on `http://localhost:3000`.

### Client

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173`.

## Screenshots

### User registration form

![User registration form](docs/screenshots/form-cadastro.png)

### Registered users list

![Registered users list](docs/screenshots/lista-usuarios.png)

## Features

### Backend (`server/`)

- **REST API in Express 5** with JSON responses and global CORS support.
- **CRUD for users** — create, list, update, and delete records through `server/server.js`.
- **Search and filtering** — `GET /users` accepts `name`, `email`, and `age` query parameters (case-insensitive match).
- **Duplicate e-mail handling** — returns `409` with `{ "message": "Email already exists" }` for unique-constraint violations.
- **Prisma + MongoDB** — schema-driven persistence with automatic `ObjectId` generation.

### Frontend (`client/`)

- **Registration form** (`UserRegistrationForm`) with `name`, `email`, and `age` fields, all marked as required with an asterisk.
- **Zod schema validation** (`validation/userSchema.js`) — required fields, e-mail format, and age between 18 and 120, with PT-BR messages.
- **React Hook Form** — controlled inputs, field-level errors, and form reset after successful registration.
- **TanStack Query hooks** (`api/userService.js`) — `useAddUser` mutation and `useUsers` query, with automatic re-fetch of the list after a new registration (cache invalidation).
- **Full-page users table** (`UsersPage`) — search by name, result counter, and loading/error/empty states.
- **Router-based navigation** — home (`/`) for registration and `/usuarios` for the registered users page.
- **Responsive Tailwind UI** with light/dark theme support.

## Learning Journey

Development notes and technical concepts are documented as the project evolves.

## Credits

Project initially based on a tutorial. Additional features, refactoring, and documentation were developed as part of personal studies.
