import {
  handleGetCategories,
  handleCreateCategory,
} from "../v1/categories/handlers";

// Proxy /api/categories to /api/v1/categories handlers
export const GET = handleGetCategories;
export const POST = handleCreateCategory;
