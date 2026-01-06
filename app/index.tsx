import React from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      <View className="bg-white/20 p-10 rounded-full">
        <View className="bg-white/20 p-8 rounded-full">
          <Image
            source={require("../assets/foodie.png")}
            accessibilityLabel="food bg"
            className="h-52 w-52"
          />
        </View>
      </View>
      <View className="items-center space-y-4 mt-10">
        <Text className="text-7xl font-bold tracking-widest text-white">
          Biteme
        </Text>
        <Text className="text-white tracking-widest font-medium">
          Food is always right
        </Text>
      </View>
    </View>
  );
}
