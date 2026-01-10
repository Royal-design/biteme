import { mealDBApi } from "@/lib/axios";
import { useEffect, useState } from "react";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export function useMealsByCategory(category: string | null) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;
    const controller = new AbortController();

    const fetchMeals = async () => {
      try {
        setLoading(true);

        const res = await mealDBApi.get("/filter.php", {
          params: { c: category },
          signal: controller.signal,
        });

        setMeals(res.data.meals || []);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch meal";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();

    return () => {
      controller.abort();
    };
  }, [category]);

  return { meals, loading, error };
}
