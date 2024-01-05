import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import OptionScreen from "./screens/OptionScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "black" },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "Activités") {
              iconName = "book";
            } else if (route.name === "Options") {
              iconName = "settings";
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Activités"
          component={ActivitiesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Options"
          component={OptionScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
