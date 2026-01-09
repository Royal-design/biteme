import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, ImageProps, ImageStyle, StyleProp } from "react-native";

type CachedImageProps = {
  uri: string;
  style?: StyleProp<ImageStyle>;
  className?: string;
  placeholder?: string;
} & Omit<ImageProps, "source">;

export const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  style,
  placeholder,
  className,
  ...props
}) => {
  const [sourceUri, setSourceUri] = useState<string | undefined>(placeholder);

  const cacheKey = `cache_${uri}`;

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        // check cache first
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached && isMounted) {
          setSourceUri(cached);
          return;
        }

        // fetch image as base64
        const response = await fetch(uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          if (isMounted) setSourceUri(base64data);
          await AsyncStorage.setItem(cacheKey, base64data);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.warn("Failed to load cached image:", err);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  return (
    <Image
      source={{ uri: sourceUri }}
      style={style}
      {...props}
      className={className}
    />
  );
};
