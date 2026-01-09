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
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await mealDBApi.get("/categories.php");

        if (isMounted) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Failed to load categories";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
