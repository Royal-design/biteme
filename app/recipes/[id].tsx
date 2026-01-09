import { useMealDetail } from "@/hooks/useMealDetails";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function RecipeDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meal, loading, error } = useMealDetail(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!meal) return <Text>No meal found</Text>;

  return (
    <ScrollView className="p-4">
      <Image
        source={meal.strMealThumb}
        style={{ width: "100%", height: 300, borderRadius: 16 }}
        contentFit="cover"
      />
      <Text className="text-2xl font-bold mt-4">{meal.strMeal}</Text>
      <Text className="mt-2 text-neutral-600">{meal.strInstructions}</Text>
    </ScrollView>
  );
}
