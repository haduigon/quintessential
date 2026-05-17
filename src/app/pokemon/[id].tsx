import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { usePokemon } from "@/hooks/use-pokemon";
import { useFavorites } from "@/context/favorites-context";
import { useTranslation } from "react-i18next";
import { PokemonStat, PokemonType } from "@/types/all-types";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = usePokemon(id);
  const { toggle, isFavorite } = useFavorites();
  const { t } = useTranslation();

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("loading")}</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("error")}</Text>
      </View>
    );

  if (!data)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("error")}</Text>
      </View>
    );

  const sprite =
    data.sprites.front_default ??
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";;

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: data.name,
          headerRight: () => (
            <Pressable
              onPress={() =>
                toggle({ id: String(id), name: data.name, sprite })
              }
            >
              <Text
                style={{
                  fontSize: 24,
                  color: isFavorite(String(id)) ? "#FFD700" : "#888888",
                }}
              >
                ★
              </Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView className="flex-1 px-4">
        <Image
          source={sprite}
          style={{ width: 200, height: 200, alignSelf: "center" }}
          contentFit="contain"
        />
        <Text className="text-3xl font-bold capitalize text-center mb-4">
          {data?.name}
        </Text>
        <Text className="text-base mb-1">{t("height")}: {data.height / 10}m</Text>
        <Text className="text-base mb-1">{t("weight")}: {data.weight / 10}kg</Text>
        <Text className="text-base mb-2">
          {t("types")}: {data?.types.map((type: PokemonType) => type?.type?.name).join(", ")}
        </Text>
        {data?.stats.map((s: PokemonStat) => (
          <View key={s.stat.name} className="mb-2">
            <Text className="text-sm">
              {t(s.stat.name)}: {s.base_stat}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
