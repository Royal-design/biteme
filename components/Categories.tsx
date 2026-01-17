import { useCategory } from "@/hooks/useMealCategory";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";

export default function Categories({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { data: categories, error, isLoading } = useCategory();

  if (isLoading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="mt-4"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 6 }}
      >
        {categories?.map((cat) => {
          const isActive = activeCategory === cat.strCategory;
          const activeBg = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={cat.idCategory}
              activeOpacity={0.6}
              className="items-center"
              onPress={() => setActiveCategory(cat.strCategory)}
            >
              <View className={`rounded-full p-2 ${activeBg}`}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  accessibilityLabel={cat.strCategory}
                  className="w-16 h-16 rounded-full"
                />
              </View>
              <Text className="text-xs">{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
