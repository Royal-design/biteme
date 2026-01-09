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

    let isMounted = true;
    setLoading(true);

    const fetchMeals = async () => {
      try {
        const res = await mealDBApi.get("/filter.php", {
          params: { c: category },
        });

        if (isMounted) {
          setMeals(res.data.meals || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : "Failed to load categories";
          setError(message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMeals();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { meals, loading, error };
}
