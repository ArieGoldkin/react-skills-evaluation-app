# Database Setup Guide

## Prerequisites

- PostgreSQL installed locally (or Docker)
- Node.js and npm installed

## Quick Start

### 1. Set up PostgreSQL

#### Option A: Using Docker (Recommended)

```bash
# Run PostgreSQL in Docker
docker run --name skills-eval-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skills_evaluation_dev \
  -p 5432:5432 \
  -d postgres:16-alpine
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a database:

```sql
CREATE DATABASE skills_evaluation_dev;
```

### 2. Configure Environment

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Update `.env.local` with your database connection:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skills_evaluation_dev
```

### 3. Run Database Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed the database with initial categories
npm run db:seed
```

### 4. Verify Setup

```bash
# Open Prisma Studio to browse your database
npm run db:studio
```

## Available Database Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes (development only)
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio GUI
- `npm run db:reset` - Reset database (WARNING: deletes all data)

## Database Schema

The database includes the following models:

- **User** - User accounts with OAuth integration
- **SkillCategory** - Categories for organizing skills
- **Skill** - Individual skills with proficiency tracking
- **SkillHistory** - Track skill changes over time
- **Assessment** - Skill assessments and evaluations
- **AssessmentQuestion** - Questions for assessments

## Troubleshooting

### Connection Issues

- Ensure PostgreSQL is running: `pg_isready`
- Check connection string in `.env.local`
- Verify database exists and user has permissions

### Migration Issues

- Run `npm run db:reset` to start fresh
- Check Prisma logs: `DEBUG=* npm run db:migrate`

### Docker Issues

- Check if container is running: `docker ps`
- View logs: `docker logs skills-eval-db`
- Restart container: `docker restart skills-eval-db`
