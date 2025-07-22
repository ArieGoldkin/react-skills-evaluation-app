import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import { handleGetCategories, handleCreateCategory } from "./handlers";

// GET /api/v1/categories - Get all categories with optional hierarchy
async function getCategoriesHandler(request: NextRequest) {
  try {
    return await handleGetCategories(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/v1/categories - Create a new category (admin only)
async function createCategoryHandler(request: NextRequest) {
  try {
    return await handleCreateCategory(request);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(getCategoriesHandler),
  "categories-get"
);

export const POST = withAuthLogging(
  withApiSecurity(createCategoryHandler),
  "categories-create"
);
