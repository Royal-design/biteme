import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

export default function Loading(props: ActivityIndicatorProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
}
