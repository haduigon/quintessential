import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "@/types/all-types";

export const usePokemon = (id: string) =>
  useQuery<Pokemon>({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
