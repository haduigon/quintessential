# Pokédex – Quintessential Challenge

Hello! This is a Pokémon app built with React Native Expo SDK 55 managed workflow.

## What's inside

- **PokeAPI** as the data source
- **TanStack Query v5** for data fetching and caching, with `useInfiniteQuery` for infinite scroll
- **Infinite scroll** — loads 20 Pokémon at a time, fetches more as you reach the bottom
- **Search** — filter Pokémon by name with an empty state when nothing matches
- **Dynamic route** `/pokemon/[id]` for Pokémon detail — sprite, height, weight, types, base stats
- **Favorites tab** — add or remove Pokémon from any screen, persisted across app restarts via AsyncStorage so favorites survive reload
- **Animations** — list items animate in with `FadeInDown`, press scale animation when selecting a Pokémon, powered by react-native-reanimated
- **i18n** — English and Greek, auto-detected from device locale, switchable in-app

## Getting started

```bash
npm install
npx expo start