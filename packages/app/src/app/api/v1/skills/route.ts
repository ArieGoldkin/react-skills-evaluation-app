import { handleGetSkills, handleCreateSkill } from "./handlers";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";

// GET /api/v1/skills - Get all skills for the authenticated user
export const GET = withAuthLogging(
  withApiSecurity(handleGetSkills),
  "skills-get"
);

// POST /api/v1/skills - Create a new skill
export const POST = withAuthLogging(
  withApiSecurity(handleCreateSkill),
  "skills-create"
);
