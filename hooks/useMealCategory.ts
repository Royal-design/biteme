import { getMealCategory } from "@/services/mealApi";
import { useQuery } from "@tanstack/react-query";

export function useCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getMealCategory,
  });
}
