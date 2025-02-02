import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function SearchLayout() {
    const router = useRouter();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "Buscar Filmes",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={{ color: "white", marginLeft: 10 }}>Voltar</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
