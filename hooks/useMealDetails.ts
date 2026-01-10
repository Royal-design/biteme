import axios from "axios";
import { useEffect, useState } from "react";

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strArea: string;
  strTags: string | null;

  [key: string]: string | null;
};

export function useMealDetail(id?: string) {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchMeal = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php`,
          {
            params: { i: id },
            signal: controller.signal,
          }
        );
        setMeal(data.meals[0]);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch meal details";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
    return () => {
      controller.abort();
    };
  }, [id]);

  return { meal, loading, error };
}
