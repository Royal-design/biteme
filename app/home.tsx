import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-4 mt-8 p-4"
      >
        <View className="flex-row justify-between items-center">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=2" }}
            className="w-16 h-16 rounded-full"
            accessibilityLabel="Avatar"
          />
          <Ionicons name="notifications" size={32} />
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
