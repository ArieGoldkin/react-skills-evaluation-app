// Note: Current schema doesn't support hierarchical categories
// This function is disabled until parent-child relationships are added to schema
export async function getDescendantIds(_categoryId: string): Promise<string[]> {
  // Return empty array since no parent-child relations exist in schema
  return [];
}
