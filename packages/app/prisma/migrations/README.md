# Database Migrations Guide

## Current Schema Changes (Task 1.7 & 1.8)

### New Models Added:

1. **LearningGoal** - Track user learning objectives
   - Target proficiency levels
   - Timeline tracking
   - Goal status management
   - Motivation tracking

2. **SkillProgression** - Weekly skill progress tracking
   - Practice hours
   - Assessment metrics
   - Proficiency changes
   - Milestone achievements

3. **GoalStatus Enum** - Goal states
   - ACTIVE
   - ACHIEVED
   - PAUSED
   - ABANDONED

## Migration Steps

### 1. Development Environment

```bash
# Set your database URL
export DATABASE_URL="postgresql://user:password@localhost:5432/skills_db"

# Create and apply migration
npx prisma migrate dev --name add-skill-progression-models

# Seed the database
npm run db:seed
```

### 2. Production Environment

```bash
# Review migration SQL first
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datasource prisma/schema.prisma \
  --script

# Apply migration to production
npx prisma migrate deploy

# Verify migration status
npx prisma migrate status
```

### 3. Rollback (if needed)

```bash
# Reset to previous migration
npx prisma migrate reset --to-migration <previous_migration_name>

# Or manually with SQL
psql $DATABASE_URL -f prisma/migrations/<migration_name>/down.sql
```

## Database Seeding

The seed script (`prisma/seed.ts`) will:

1. Create 12 default skill categories:
   - Programming Languages
   - Frontend Development
   - Backend Development
   - Databases
   - DevOps & Cloud
   - Mobile Development
   - Data Science & AI
   - Soft Skills
   - Tools & Productivity
   - Security
   - Design
   - Testing & QA

2. In development mode, create sample skills for testing

## Verification Steps

After migration:

1. Check schema is synced:

   ```bash
   npx prisma db pull
   npx prisma validate
   ```

2. Test new models:

   ```bash
   npx prisma studio
   ```

3. Run application tests:
   ```bash
   npm test
   ```

## Troubleshooting

- **Migration fails**: Check DATABASE_URL is correct
- **Foreign key errors**: Ensure related records exist
- **Unique constraint violations**: Clear duplicate data first
- **Connection timeout**: Increase connection pool timeout

## Next Steps

After successful migration:

1. Update API endpoints to use new models
2. Create services for LearningGoal and SkillProgression
3. Add validation schemas
4. Update frontend to display progression data
