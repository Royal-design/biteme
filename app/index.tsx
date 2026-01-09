import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Index() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const router = useRouter();

  const startAnimation = () => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    ring1Padding.value = withSpring(40, {
      damping: 12,
      stiffness: 120,
    });

    setTimeout(() => {
      ring2Padding.value = withSpring(32, {
        damping: 12,
        stiffness: 120,
      });
    }, 200);
  };

  useEffect(() => {
    startAnimation();
    setTimeout(() => {
      router.replace("/recipes");
    }, 2500);
  }, []);

  const ring1Style = useAnimatedStyle(() => ({
    padding: ring1Padding.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    padding: ring2Padding.value,
  }));

  return (
    <View className="flex-1 justify-center items-center bg-amber-500">
      <Animated.View style={ring1Style} className="bg-white/20 rounded-full">
        <Animated.View style={ring2Style} className="bg-white/20 rounded-full">
          <Image
            source={require("../assets/foodie.png")}
            accessibilityLabel="food bg"
            className="h-52 w-52"
          />
        </Animated.View>
      </Animated.View>

      <View className="items-center space-y-4 mt-10">
        <Text className="text-7xl font-bold tracking-widest text-white">
          Biteme
        </Text>
        <Text className="text-white tracking-widest font-medium">
          Food is always right
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
