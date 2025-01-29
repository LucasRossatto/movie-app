import Octicons from '@expo/vector-icons/Octicons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>MyMovieList</Text>
            <Link href="/search" asChild>
                <Octicons name="search" size={24} color="white" />
            </Link>
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
})