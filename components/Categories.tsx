import { useMealCategories } from "@/hooks/useMealCategories";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { categories, loading, error } = useMealCategories();
  const formattedCategories = categories.map((cat) => ({
    id: cat.idCategory,
    name: cat.strCategory,
    image: cat.strCategoryThumb,
  }));
  //   useEffect(() => {
  //     if (!activeCategory && formattedCategories.length > 0) {
  //       setActiveCategory(formattedCategories[0].name);
  //     }
  //   }, [formattedCategories, activeCategory, setActiveCategory]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

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
        {formattedCategories.map((cat) => {
          const isActive = activeCategory === cat.name;
          const activeBg = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.6}
              className="items-center"
              onPress={() => setActiveCategory(cat.name)}
            >
              <View className={`rounded-full p-2 ${activeBg}`}>
                <Image
                  source={{ uri: cat.image }}
                  accessibilityLabel={cat.name}
                  className="w-16 h-16 rounded-full"
                />
              </View>
              <Text className="text-xs">{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
