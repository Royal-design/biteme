import { getMealByCategory } from "@/services/mealApi";
import { useQuery } from "@tanstack/react-query";

export function useMealByCategory(category: string) {
  return useQuery({
    queryKey: ["meals", category],
    queryFn: () => getMealByCategory(category),
    enabled: !!category,
  });
}
