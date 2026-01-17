import Categories from "@/components/Categories";
import Recipes from "@/components/Recipes";
import { useMeals } from "@/hooks/useMeals";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("Beef");
  const { data: meals, isLoading, error } = useMeals(activeCategory);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, gap: 4 }}
        className="mt-8 p-4 gap-12"
      >
        <View className="flex-row justify-between items-center">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=2" }}
            className="w-16 h-16 rounded-full"
            accessibilityLabel="Avatar"
          />
          <Ionicons name="notifications-outline" size={32} />
        </View>
        <View className="mt-4">
          <Text className="text-neutral-600 text-xl">Hello, Emmy!</Text>
          <Text className="text-neutral-600 font-semibold text-4xl">
            Make your own food,
          </Text>
          <Text className="text-neutral-600 font-semibold text-4xl">
            Stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        <View className="flex-row items-center bg-black/5 rounded-full p-2 mt-4">
          <TextInput
            placeholder="Search recipe..."
            className="flex-1 tracking-wide ml-3 text-base"
          />
          <View className="bg-white rounded-full p-2">
            <Ionicons name="search" size={24} />
          </View>
        </View>
        <View className="gap-6">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Recipes meals={meals || []} loading={isLoading} error={error} />
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
