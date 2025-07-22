#!/usr/bin/env tsx

/**
 * Migration Script: Assessment History Model
 *
 * This script helps migrate to the new AssessmentHistory model:
 * 1. Creates migration for new AssessmentHistory model
 * 2. Validates schema changes
 * 3. Updates Prisma client
 * 4. Provides rollback instructions
 */

import { execSync } from "child_process";
import { existsSync } from "fs";

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
} as const;

function log(message: string, color: keyof typeof COLORS = "reset") {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function execCommand(command: string): string {
  try {
    return execSync(command, { encoding: "utf-8", stdio: "pipe" });
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error}`);
  }
}

async function main() {
  log("\n🔄 Assessment History Migration Script", "cyan");
  log("======================================", "cyan");

  // Check if we're in the right directory
  if (!existsSync("prisma/schema.prisma")) {
    log(
      "❌ Error: This script must be run from the app package directory",
      "red"
    );
    log(
      "Please run: cd packages/app && npm run migrate:assessment-history",
      "yellow"
    );
    process.exit(1);
  }

  try {
    // Step 1: Validate current schema
    log("\n📋 Step 1: Validating Prisma schema...", "blue");
    execCommand("npx prisma format");
    log("✅ Schema validation successful", "green");

    // Step 2: Generate Prisma client with new schema
    log("\n🔄 Step 2: Generating Prisma client...", "blue");
    execCommand("npx prisma generate");
    log("✅ Prisma client generated successfully", "green");

    // Step 3: Show what would be migrated (dry run)
    log("\n🔍 Step 3: Checking migration status...", "blue");
    try {
      const migrationStatus = execCommand("npx prisma migrate status");
      log(migrationStatus, "cyan");
    } catch (error) {
      // Migration status might fail if no DATABASE_URL, which is fine for this step
      log(
        "⚠️  Migration status check skipped (DATABASE_URL not available)",
        "yellow"
      );
    }

    // Step 4: Instructions for actual migration
    log("\n🎯 Migration Instructions:", "bright");
    log("========================", "bright");
    log("");
    log("To complete the migration, run the following commands:", "yellow");
    log("");
    log("1. Set up your database environment:", "cyan");
    log('   export DATABASE_URL="your_database_url_here"', "white");
    log("");
    log("2. Create and apply migration:", "cyan");
    log("   npx prisma migrate dev --name add-assessment-history", "white");
    log("");
    log("3. Run database seeding (if needed):", "cyan");
    log("   npm run db:seed", "white");
    log("");
    log("4. Verify migration:", "cyan");
    log("   npx prisma migrate status", "white");
    log("");

    // Step 5: Schema changes summary
    log("📄 Schema Changes Summary:", "magenta");
    log("=========================", "magenta");
    log("");
    log("✅ Added AssessmentHistory model with:", "green");
    log("  - Assessment tracking (created, updated, completed)", "white");
    log("  - Score change history (previous/new values)", "white");
    log("  - Proficiency level tracking", "white");
    log("  - Action-based audit trail", "white");
    log("  - Proper indexing for performance", "white");
    log("");
    log("✅ Added AssessmentAction enum with actions:", "green");
    log("  - CREATED, STARTED, COMPLETED", "white");
    log("  - UPDATED, DELETED, SCORE_CHANGED", "white");
    log("  - PROFICIENCY_UPDATED, REVIEW_ADDED", "white");
    log("");
    log("✅ Updated relations:", "green");
    log("  - User.assessmentHistory (one-to-many)", "white");
    log("  - Assessment.history (one-to-many)", "white");
    log("");

    // Step 6: Rollback instructions
    log("🔙 Rollback Instructions (if needed):", "yellow");
    log("====================================", "yellow");
    log("");
    log("If you need to rollback this migration:", "yellow");
    log("1. npx prisma migrate reset (⚠️  This will delete ALL data)", "red");
    log("2. Or create a reverse migration manually", "yellow");
    log("");

    log("✅ Migration preparation completed successfully!", "green");
    log(
      "\nNext: Set DATABASE_URL and run the migration commands above",
      "cyan"
    );
  } catch (error) {
    log(`\n❌ Error during migration preparation:`, "red");
    log(String(error), "red");
    process.exit(1);
  }
}

// Handle script execution
if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export { main };
