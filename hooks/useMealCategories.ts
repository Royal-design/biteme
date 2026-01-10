import { mealDBApi } from "@/lib/axios";
import { useEffect, useState } from "react";

export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

export function useMealCategories() {
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const res = await mealDBApi.get("/categories.php", {
          signal: controller.signal,
        });

        setCategories(res.data.categories ?? []);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load categories";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return { categories, loading, error };
}
