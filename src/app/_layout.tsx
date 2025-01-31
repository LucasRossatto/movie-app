import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons'

import { StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#F47521",
        tabBarInactiveTintColor: "#636882",
        tabBarStyle: {
          backgroundColor: '#18191E',
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.views}>
              <MaterialCommunityIcons name="home" size={24} color={color} />
              <Text style={{ color: color, fontSize: 10, fontWeight: "bold" }}>home</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.views}>
              <Octicons name="search" size={24} color={color} />
              <Text style={{ color: color, fontSize: 10, fontWeight: "bold" }}>search</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="details/[movie_id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  views: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    marginTop: 10,
  }
});
