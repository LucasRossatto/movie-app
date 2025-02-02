import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HeaderWithBackButton() {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
            <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <View style={styles.iconBackground}>
                    <AntDesign name="left" size={18} color="white" />
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>MyMovieList</Text>
            </View>

            <TouchableOpacity style={styles.iconBackground} onPress={() => router.push("/search")}>
                <Octicons name="search" size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 30,
        backgroundColor: "#18191E",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F47521",
            },
    iconBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 50,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
