import { CATEGORIES } from "@/lib/categories";
import { CATEGORICAL_ORDER } from "@/lib/chart-theme";
import type { CategoryName } from "@/types/product";

// Fixed identity -> color mapping (assigned once, by category declaration
// order) so a sort/filter that changes rank never repaints a category's color.
export const CATEGORY_COLOR: Record<CategoryName, string> = Object.fromEntries(
  CATEGORIES.map((c, i) => [c, CATEGORICAL_ORDER[i % CATEGORICAL_ORDER.length]])
) as Record<CategoryName, string>;
