import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AppTabs() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarActiveTintColor: "#FFD700",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 14 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("list"),
          tabBarIcon: ({ color }) => (
            <AntDesign name="bars" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t("favorites"),
          tabBarIcon: ({ color }) => (
            <AntDesign name="star" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
