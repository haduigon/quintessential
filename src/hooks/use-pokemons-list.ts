import { PokemonPage } from "@/types/all-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 20;

export const usePokemonList = () =>
  useInfiniteQuery<
    PokemonPage,
    Error,
    InfiniteData<PokemonPage>,
    ["pokemon", "list"],
    number
  >({
    queryKey: ["pokemon", "list"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${pageParam}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.next ? lastPageParam + LIMIT : undefined,
  });
