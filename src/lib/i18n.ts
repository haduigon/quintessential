import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  en: {
    translation: {
      search: "Search Pokémon...",
      loading: "Loading...",
      error: "Error",
      noFavorites: "No favorites yet ★",
      favorites: "Favorites",
      list: "List",
      height: "Height",
      weight: "Weight",
      types: "Types",
      noResults: "No Pokémon found",
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
      favoritesList: "Your Favorite Pokémon",
    },
  },
  el: {
    translation: {
      search: "Αναζήτηση Pokémon...",
      loading: "Φόρτωση...",
      error: "Σφάλμα",
      noFavorites: "Δεν υπάρχουν αγαπημένα ★",
      favorites: "Αγαπημένα",
      list: "Λίστα",
      height: "Ύψος",
      weight: "Βάρος",
      types: "Τύποι",
      noResults: "Δεν βρέθηκαν Pokémon",
      hp: "ΖΩΗ",
      attack: "Επίθεση",
      defense: "Άμυνα",
      "special-attack": "Ειδ. Επίθεση",
      "special-defense": "Ειδ. Άμυνα",
      speed: "Ταχύτητα",
      favoritesList: "Τα Αγαπημένα Σου Pokémon",
    },
  },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
