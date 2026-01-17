import Loading from "@/components/Loading";
import { useMealDetails } from "@/hooks/useMealDetails";
import type { MealDetail } from "@/type/meal";
import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";

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
const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
};

const info = [
  {
    icon: <Ionicons name="time-outline" size={24} color="black" />,
    label: "Mins",
    value: "35",
  },
  {
    icon: <Ionicons name="people" size={24} color="black" />,
    label: "Servings",
    value: "03",
  },
  {
    icon: <SimpleLineIcons name="fire" size={24} color="black" />,
    label: "Cal",
    value: "103",
  },
  {
    icon: <Octicons name="stack" size={24} color="black" />,
    label: "Easy",
  },
];

export default function RecipeDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  const { data: meal, isLoading, error } = useMealDetails(id);
  const router = useRouter();

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;
  if (!meal) return <Text>No meal found</Text>;
  const videoId = getYoutubeId(meal?.strYoutube);

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
        <Animated.View
          entering={FadeInDown.delay(100).duration(700).damping(12)}
          className="flex-row gap-8 mt-4"
        >
          {info.map((item, idx) => (
            <View
              key={idx}
              className="flex-1 items-center rounded-full bg-yellow-400 py-4"
            >
              <View className="rounded-full p-3 bg-white mb-2">
                {item.icon}
              </View>

              <Text className="text-sm text-neutral-700">{item.label}</Text>

              <Text className="font-bold text-lg">{item.value}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(700).damping(12)}
          className="mt-6"
        >
          <Text className="text-2xl font-bold mb-3">Ingredients</Text>

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
        </Animated.View>
        {meal?.strInstructions && (
          <Animated.View
            entering={FadeInDown.delay(300).duration(700).damping(12)}
            className="mt-4 pb-12"
          >
            <Text className="text-2xl font-bold mb-2">Instructions</Text>

            <Text className="mt-2 text-neutral-600">
              {meal.strInstructions}
            </Text>
          </Animated.View>
        )}
        {videoId && YoutubePlayer && (
          <Animated.View
            entering={FadeInDown.delay(400).duration(700).damping(12)}
            className="mt-6 pb-12"
          >
            <Text className="text-2xl font-bold mb-3">Video</Text>

            <View className="rounded-2xl overflow-hidden">
              <YoutubePlayer
                height={220}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
              />
            </View>
          </Animated.View>
        )}
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}
