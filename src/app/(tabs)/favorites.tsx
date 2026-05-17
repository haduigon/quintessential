import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFavorites } from "@/context/favorites-context";
import { useTranslation } from "react-i18next";
import { PokemonRow } from "@/components/pokemon-row";

export default function FavoritesScreen() {
  const { favorites, toggle, isFavorite } = useFavorites();
  const { t } = useTranslation();
  if (favorites.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">{t("noFavorites")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="mt-[10%] items-center">
        <Text className="text-center font-bold">{t("favoritesList")}</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PokemonRow
            id={item.id}
            name={item.name}
            sprite={item.sprite}
            index={index}
            isFavorite={isFavorite(item.id)}
            onPress={() =>
              router.push({
                pathname: "/pokemon/[id]",
                params: { id: item.id, name: item.name },
              })
            }
            onToggleFavorite={() => toggle(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}
