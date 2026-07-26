# Meridian.AI

A SaaS AI Agent platform called Meridian.AI. The project focuses on creating an AI-powered video conferencing application equipped with custom AI agents that can participate in real-time calls.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Sequence Diagrams](#sequence-diagrams)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage / Running the project](#usage--running-the-project)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication & User Management**: Secure user login, registration, and session management powered by Better Auth.
- **Custom AI Agents**: Create and configure AI agents with custom instructions that can participate in user workflows or meetings.
- **Video Conferencing**: Real-time video meetings integrated via Stream Video SDK.
- **Meeting Management**: Track meeting lifecycles including upcoming, active, and completed statuses.
- **Meeting Insights**: Stores and tracks meeting recordings and transcript URLs.
- **Type-Safe API**: End-to-end type safety using tRPC, React Query, and Zod.

## Architecture

```mermaid
graph TD
    Client[Web Browser / Client]
    NextJS[Next.js App Router]
    tRPC[tRPC API Layer]
    BetterAuth[Better Auth Service]
    Stream[Stream Video Service]
    Neon[(Neon Postgres DB)]
    
    Client -->|Renders UI / Interacts| NextJS
    NextJS -->|TRPC Calls| tRPC
    NextJS -->|Auth Requests| BetterAuth
    Client <-->|WebRTC / WebSocket| Stream
    tRPC <-->|SQL / Drizzle ORM| Neon
    BetterAuth <-->|SQL / Drizzle ORM| Neon
    tRPC -->|Server SDK| Stream
```

## Sequence Diagrams

### User Authentication Lifecycle

```mermaid
sequenceDiagram
    actor User
    participant Client as Next.js Client
    participant Auth as Better Auth API
    participant DB as Neon Database

    User->>Client: Enters credentials / OAuth
    Client->>Auth: POST /api/auth
    Auth->>DB: Validate / Upsert User & Session
    DB-->>Auth: Session created
    Auth-->>Client: Set Session Cookie & Return User
    Client-->>User: Redirect to Dashboard
```

### Video Meeting Creation & Joining

```mermaid
sequenceDiagram
    actor User
    participant Client as Next.js Client
    participant API as tRPC API
    participant Stream as Stream Video API
    participant DB as Neon Database

    Note over User, DB: 1. Meeting Creation
    User->>Client: Click "Create Meeting"
    Client->>API: tRPC mutation (meetings.create)
    API->>DB: Insert new meeting (status: upcoming)
    DB-->>API: Meeting Details
    API-->>Client: Meeting ID

    Note over User, DB: 2. Joining Meeting
    User->>Client: Click "Join Meeting"
    Client->>API: tRPC mutation (meetings.generateToken)
    API->>Stream: Upsert user & generate token
    Stream-->>API: Stream Video Token
    API-->>Client: Token
    Client->>Stream: Connect to call via WebRTC
    Stream-->>User: Active Video Call
```

## Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **API**: [tRPC](https://trpc.io/) with TanStack React Query
- **Database & ORM**: [Neon Serverless Postgres](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Real-time Video**: [Stream Video SDK](https://getstream.io/video/)
- **Validation**: [Zod](https://zod.dev/)

## Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- A Neon Database instance (or local PostgreSQL)
- Stream API Keys
- Better Auth setup (OAuth providers if any)

## Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd meridian-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Environment Variables

Copy the `.env.example` file (if provided) to `.env.local` or create a new `.env.local` file and add the following necessary environment variables. Based on the tech stack, you will typically need:

```env
# Database
DATABASE_URL=postgres://user:password@hostname/dbname

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000 # Your app URL

# Stream
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

## Usage / Running the project

1. **Push Database Schema**:
   Sync your Drizzle schema with your Neon database:
   ```bash
   npm run db:push
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

3. **Database Studio**:
   To view and manage your database visually:
   ```bash
   npm run db:studio
   ```

## Project Structure

```text
meridian-ai/
├── src/
│   ├── app/           # Next.js App Router pages and API routes (/api/auth, /api/trpc)
│   ├── components/    # Reusable UI components (shadcn/ui, base components)
│   ├── db/            # Drizzle ORM schema, migrations, and database connection logic
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions (e.g., Stream initialization, generic helpers)
│   ├── modules/       # Feature-based domains (agents, auth, call, dashboard, meetings, etc.)
│   └── trpc/          # tRPC initialization, routers, and client/server integrations
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
├── drizzle.config.ts  # Drizzle ORM configuration
└── next.config.ts     # Next.js configuration
```

## Testing

Currently, no testing framework is explicitly set up in `package.json`. You can add tools like Jest, Vitest, or Playwright for your testing needs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

This project is proprietary or licensed as specified by the repository owner.
