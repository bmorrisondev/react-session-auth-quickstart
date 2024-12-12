# React Session Auth Quickstart

A modern full-stack template demonstrating session-based authentication using React, Express, Prisma, and Neon PostgreSQL.

## Features

- 🔒 Secure session-based authentication with HTTP-only cookies
- ⚡️ Fast and modern tech stack
  - React + TypeScript + Vite for the frontend
  - Express + TypeScript for the backend
  - Prisma as the ORM
  - Neon for serverless PostgreSQL
- 🎨 Pre-styled with Tailwind CSS and shadcn/ui
- 🛠️ Development ready with hot reload

## Looking for a Full-Featured Auth Solution?

Check out [Clerk](https://clerk.com) - the comprehensive authentication and user management platform:

- 🎨 Beautiful drop-in UI components for authentication
- 🔑 Social sign-on with multiple providers (Google, GitHub, etc.)
- 🏢 Enterprise-ready B2B configurations
- 📊 Simple user management dashboard
- 📱 Multi-factor authentication
- 🔒 Built-in security best practices

While this template demonstrates session-based auth fundamentals, Clerk provides a production-ready solution that scales with your application.

## Prerequisites

- Node.js 18+
- A Neon account (for PostgreSQL database)
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/bmorrisondev/react-session-auth-quickstart.git
cd react-session-auth-quickstart
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Neon database:
   - Sign up for a free account at [Neon](https://neon.tech)
   - Create a new project
   - In the connection details, find your database URL (it should start with `postgres://`)

4. Create your environment variables:
```bash
cp .env.example .env
```

5. Update your `.env` file with the following:
```env
# Your Neon database URL
DATABASE_URL="postgres://..."

# Development settings (can leave as is)
VITE_API_URL="http://localhost:3000"
NODE_ENV="development"
```

6. Initialize the database:
```bash
npx prisma db push
```

7. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
├── prisma/               # Database schema and migrations
├── server/              # Express backend
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   └── index.ts         # Server entry point
├── src/                 # React frontend
│   ├── components/      # UI components
│   ├── hooks/          # Custom React hooks
│   ├── views/          # Page components
│   └── types/          # TypeScript types
└── package.json
```

## Authentication Flow

1. User signs up/logs in through the frontend
2. Backend validates credentials and creates a session
3. Session ID is stored in an HTTP-only cookie
4. Frontend can check auth status via the `/api/auth/me` endpoint
5. Protected routes/resources check for valid session

## Building for Production

1. Build the project:
```bash
npm run build:all
```

This command will:
- Build the React frontend
- Compile the TypeScript backend
- Move all assets to the correct locations (/dist)

2. Start the production server:
```bash
npm start
```

The production build will be available at the port specified in your environment variables (default: 3000).

### Deployment Options

You can deploy this application to any platform that supports Node.js applications. General steps:

1. Build the project using `npm run build:all`
2. Set up your environment variables
3. Run `npm start` to start the production server

Remember to:
- Use HTTPS in production
- Set up proper security headers
- Configure your database connection string
- Set `NODE_ENV` to "production"

## Contributing

Feel free to submit issues and pull requests!

## License

MIT
