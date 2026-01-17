import type { MealSummary } from "@/type/meal";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";

export default function Recipes({
  meals,
  loading,
  error,
}: {
  meals: MealSummary[];
  loading: boolean;
  error: Error | null;
}) {
  if (error) return <Text>{error.message}</Text>;
  return (
    <View className="gap-4">
      <Text className="text-neutral-600 font-semibold text-4xl">Recipes</Text>
      <View>
        {loading ? (
          <Loading size="large" className="mt-24" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item): string => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard index={i} item={item as MealSummary} />
            )}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index }: { item: MealSummary; index: number }) => {
  const router = useRouter();
  const isEven = index % 2 === 0;

  const goToDetail = () => {
    router.push(`/recipes/${item.idMeal}`);
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .springify()
        .damping(12)}
      className=""
    >
      <Pressable
        className="w-full gap-2  mb-4"
        style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        onPress={goToDetail}
      >
        <Image
          source={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 ? 192 : 256,
            borderRadius: 16,
          }}
          accessibilityLabel={item.strMeal}
          contentFit="cover"
          //   placeholder={blurhash}
          transition={300}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="truncate font-semibold text-neutral-600"
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
