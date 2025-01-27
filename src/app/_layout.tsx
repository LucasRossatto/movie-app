import { Tabs } from "expo-router";

export default function RootLayout() {
  return(
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarShowLabel:false,
      tabBarActiveTintColor:"#F47521",
      tabBarInactiveTintColor:"#757575"
    }}
  >
    <Tabs.Screen name="index"/>
    <Tabs.Screen name="home"/>

  </Tabs>
  )
}
