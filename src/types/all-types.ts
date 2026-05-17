export type FavoritePokemon = { id: string; name: string; sprite: string };

export type PokemonListItem = { name: string; url: string };

export type PokemonPage = { results: PokemonListItem[]; next: string | null };

export type PokemonStat = {
  base_stat: number;
  stat: {
    name:
      | "hp"
      | "attack"
      | "defense"
      | "special-attack"
      | "special-defense"
      | "speed";
  };
};

export type PokemonRowProps = {
  id: string;
  name: string;
  sprite: string;
  index: number;
  isFavorite: boolean;
  imageStyle?: { width: number; height: number };
  onPress: () => void;
  onToggleFavorite: () => void;
};

export type PokemonType = {
  type: { name: string };
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: PokemonType[];
  stats: PokemonStat[];
};