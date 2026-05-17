import { Image } from "expo-image";
import { Pressable, Text } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { PokemonRowProps } from "@/types/all-types";

export function PokemonRow({
  id,
  name,
  sprite,
  index,
  isFavorite,
  imageStyle = { width: 64, height: 64 },
  onPress,
  onToggleFavorite,
}: PokemonRowProps) {
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index * 30, 300)).duration(400)}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(0.95, { duration: 100 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 150 });
        }}
      >
        <Animated.View
          style={pressStyle}
          className="flex-row items-center justify-center px-4 py-2 gap-3"
        >
          <Image source={sprite} style={imageStyle} contentFit="contain" />
          <Text className="text-base capitalize flex-1">
            #{String(id).padStart(3, "0")} {name}
          </Text>
          <Pressable onPress={onToggleFavorite}>
            <Text
              style={{
                fontSize: 24,
                color: isFavorite ? "#FFD700" : "#888888",
              }}
            >
              ★
            </Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
