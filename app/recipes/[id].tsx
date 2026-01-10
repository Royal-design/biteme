import { useMealDetail, type MealDetail } from "@/hooks/useMealDetails";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function getIngredients(meal: MealDetail) {
  const items: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      items.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return items;
}

export default function RecipeDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);

  const { meal, loading, error } = useMealDetail(id);
  const router = useRouter();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!meal) return <Text>No meal found</Text>;

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row justify-center">
        <Image
          source={meal.strMealThumb}
          style={{
            width: "98%",
            height: 300,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          contentFit="cover"
        />
      </View>
      <View className="absolute flex-row justify-between w-full p-4 mt-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white rounded-full p-2"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#F29D35" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLiked((prev) => !prev)}
          className="bg-white rounded-full p-2 ml-4"
          activeOpacity={0.7}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={28}
            color={liked ? "#E53935" : "#ABA8A6"}
          />
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <Text className="text-3xl font-bold mt-4">{meal.strMeal}</Text>
        <Text className="text-xl">{meal.strArea}</Text>
        <View className="mt-6">
          <Text className="text-xl font-bold mb-3">Ingredients</Text>

          {getIngredients(meal).map((item, index) => (
            <View key={index} className="flex-row items-center gap-2 mb-2">
              <View className="bg-amber-400 h-3 w-3" />
              <View className="flex-row items-center gap-1">
                <Text className="font-bold text-neutral-900 mr-2">
                  {item.measure}
                </Text>
                <Text className="text-neutral-700">{item.ingredient}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* <Text className="mt-2 text-neutral-600">{meal.strInstructions}</Text> */}
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}
