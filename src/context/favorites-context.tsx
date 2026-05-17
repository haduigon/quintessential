import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { FavoritePokemon } from "@/types/all-types";

const KEY = "favorites";

const FavoritesContext = createContext<{
  favorites: FavoritePokemon[];
  toggle: (p: FavoritePokemon) => Promise<void>;
  isFavorite: (id: string) => boolean;
}>({ favorites: [], toggle: async () => {}, isFavorite: () => false });

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((val) => {
        if (val) setFavorites(JSON.parse(val));
      })
      .catch((e) => console.error("Failed to load favorites", e));
  }, []);

  const toggle = async (pokemon: FavoritePokemon) => {
    const updated = favorites.some((f) => f.id === pokemon.id)
      ? favorites.filter((f) => f.id !== pokemon.id)
      : [...favorites, pokemon];
    setFavorites(updated);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
