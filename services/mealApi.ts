import { mealDBApi } from "@/lib/axios";
import type { MealCategory, MealDetail, MealSummary } from "@/type/meal";

export const getMealCategory = async (): Promise<MealCategory[]> => {
  const { data } = await mealDBApi.get("/categories.php");
  return data.categories;
};

export const getMealByCategory = async (
  category: string,
): Promise<MealSummary[]> => {
  const { data } = await mealDBApi.get("/filter.php", {
    params: { c: category },
  });

  return data.meals;
};

export const getMealDetails = async (id: string): Promise<MealDetail> => {
  const { data } = await mealDBApi.get("/lookup.php", {
    params: { i: id },
  });

  return data.meals[0];
};
