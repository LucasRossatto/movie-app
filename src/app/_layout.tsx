import { Tabs } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet, Text, View } from "react-native";


export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#F47521",
        tabBarInactiveTintColor: "#757575"
      }}
    >
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color }) => (
          <View style={styles.views}>
            <FontAwesome6 name="house" size={24} color={color} />
            <Text style={{ color: color, fontSize: 10, fontWeight: "bold" }}>home</Text>
          </View>
        ),
      }} />

      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />

<Tabs.Screen
        name="detailsMovie"
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
  }
});
