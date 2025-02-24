import Octicons from '@expo/vector-icons/Octicons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Header() {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <Text style={styles.title}>MyMovieList</Text>
            <TouchableOpacity style={styles.iconBackground} onPress={() => router.push("/search")}>
            <Octicons name="search" size={18} color="white" />
            </TouchableOpacity>
            </View>)
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // 10% de opacidade
        borderRadius: 50,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})