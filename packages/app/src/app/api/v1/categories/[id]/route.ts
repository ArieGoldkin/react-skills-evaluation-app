import { NextRequest } from "next/server";
import { withApiSecurity } from "@/lib/middleware/with-security";
import { withAuthLogging } from "@/lib/middleware/with-logging";
import { handleApiError } from "@/lib/errors/handlers";
import {
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from "./handlers";

// GET /api/v1/categories/[id] - Get a single category with full details
async function getCategoryHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleGetCategory(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/v1/categories/[id] - Update a category (admin only)
async function updateCategoryHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleUpdateCategory(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/v1/categories/[id] - Delete a category (admin only)
async function deleteCategoryHandler(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await handleDeleteCategory(request, context);
  } catch (error) {
    return handleApiError(error);
  }
}

// Export handlers with middleware
export const GET = withAuthLogging(
  withApiSecurity(getCategoryHandler),
  "categories-get-by-id"
);

export const PUT = withAuthLogging(
  withApiSecurity(updateCategoryHandler),
  "categories-update"
);

export const DELETE = withAuthLogging(
  withApiSecurity(deleteCategoryHandler),
  "categories-delete"
);
