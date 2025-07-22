import { handleGetSkills, handleCreateSkill } from "../v1/skills/handlers";

// Proxy /api/skills to /api/v1/skills handlers
export const GET = handleGetSkills;
export const POST = handleCreateSkill;
