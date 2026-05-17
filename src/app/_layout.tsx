import React from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persister, queryClient } from "@/lib/query-client";
import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritesProvider } from "@/context/favorites-context";
import "@/lib/i18n";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister,
            dehydrateOptions: {
              shouldDehydrateQuery: () => false,
            },
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="pokemon/[id]"
              options={({
                headerShown: true,
                animation: "slide_from_bottom",
                headerBackButtonDisplayMode: "minimal",
              })}
            />
          </Stack>
        </PersistQueryClientProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
