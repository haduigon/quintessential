import { usePokemonList } from "@/hooks/use-pokemons-list";
import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFavorites } from "@/context/favorites-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { PokemonListItem, PokemonPage } from "@/types/all-types";
import { PokemonRow } from "@/components/pokemon-row";

function getIdFromUrl(url: string) {
  return url.split("/").filter(Boolean).pop();
}

export default function HomeScreen() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();
  const { toggle, isFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const pokemons =
    data?.pages.flatMap((page: PokemonPage) => page.results) ?? [];
  const { t, i18n } = useTranslation();
  const filtered = pokemons.filter((item: PokemonListItem) =>
    item?.name.toLowerCase().includes(search.toLowerCase()),
  );
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const renderItem = useCallback(
    ({ item, index }: { item: PokemonListItem; index: number }) => {
      const id = getIdFromUrl(item.url) ?? "";
      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      return (
        <PokemonRow
          id={id}
          name={item.name}
          sprite={sprite}
          index={index}
          isFavorite={isFavorite(id)}
          imageStyle={{
            width: SCREEN_WIDTH * 0.18,
            height: SCREEN_HEIGHT * 0.1,
          }}
          onPress={() =>
            router.push({
              pathname: "/pokemon/[id]",
              params: { id, name: item.name },
            })
          }
          onToggleFavorite={() => toggle({ id, name: item.name, sprite })}
        />
      );
    },
    [isFavorite, toggle, SCREEN_WIDTH, SCREEN_HEIGHT],
  );
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("loading")}...</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t("error")}</Text>
      </View>
    );

  if (filtered.length === 0 && search.length > 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">{t("noResults")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-row items-center mx-4 mb-2 gap-2">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={t("search")}
          placeholderTextColor="#888"
          className="flex-1 px-4 py-2 rounded-xl"
          style={{ backgroundColor: "#f0f0f0", color: "#000" }}
        />
        <Pressable
          onPress={() =>
            i18n.changeLanguage(i18n.language === "en" ? "el" : "en")
          }
        >
          <Text>{i18n.language === "en" ? "🇬🇧 EN" : "🇬🇷 EL"}</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.name}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Text className="text-center py-4">{t("loading")}...</Text>
            ) : null
          }
          renderItem={renderItem}
        />
        <LinearGradient
          colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
          pointerEvents="none"
        />
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
          pointerEvents="none"
        />
      </View>
    </SafeAreaView>
  );
}
