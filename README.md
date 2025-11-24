# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d52e39a5-8003-4358-8310-fc7b61e056a6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d52e39a5-8003-4358-8310-fc7b61e056a6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d52e39a5-8003-4358-8310-fc7b61e056a6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
# anomaly-glance

## Project structure

- `src/` React dashboard that visualizes health checks and anomaly records.
- `server/` Express API responsible for connecting to Postgres.
- `db/schema.sql` Helper script you can run inside `psql` to create the database.
- `env.example` Sample environment variables (copy to `.env`).

## Getting started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Provision Postgres**

   - Start a local Postgres instance (Docker example below) or point `DATABASE_URL` to an existing server.
   - Run `psql -f db/schema.sql` to create the `anomalies` table. The script assumes the `anomaly_glance` database already exists.

   Docker example:

   ```sh
   docker run --name anomaly-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
   createdb -h localhost -U postgres anomaly_glance
   psql -h localhost -U postgres -f db/schema.sql
   ```

3. **Configure environment**

   ```sh
   cp env.example .env
   # adjust DATABASE_URL / PORT as needed
   ```

4. **Run everything**

   ```sh
   npm run dev:full   # starts Vite (8080) + API server (4000)
   ```

   Alternatively, run `npm run server:dev` and `npm run dev` in separate terminals.

## API surface

| Method | Path             | Description                         |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/api/health`    | Verifies API ↔ Postgres connectivity |
| GET    | `/api/anomalies` | Lists the latest 100 anomalies      |
| POST   | `/api/anomalies` | Inserts a new anomaly record        |

Sample payload for `POST /api/anomalies`:

```json
{
  "title": "CPU spike on edge-worker",
  "description": "Worker-3 keeps hitting 95% for 10 minutes.",
  "severity": "high",
  "detectedAt": "2025-01-01T13:37:00.000Z"
}
```