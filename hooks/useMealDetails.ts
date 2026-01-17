import { getMealDetails } from "@/services/mealApi";
import { useQuery } from "@tanstack/react-query";

export function useMealDetails(id: string) {
  return useQuery({
    queryKey: ["mealDetails", id],
    queryFn: () => getMealDetails(id),
    enabled: !!id,
  });
}
