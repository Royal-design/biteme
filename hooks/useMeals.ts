import { getMealByCategory } from "@/services/mealApi";
import { useQuery } from "@tanstack/react-query";

export function useMeals(category: string) {
  return useQuery({
    queryKey: ["meals", category],
    queryFn: () => getMealByCategory(category),
  });
}
