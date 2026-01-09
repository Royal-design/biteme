import axios from "axios";
import { useEffect, useState } from "react";

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
};

export function useMealDetail(id?: string) {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMeal = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(data.meals[0]);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch meal");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  return { meal, loading, error };
}
