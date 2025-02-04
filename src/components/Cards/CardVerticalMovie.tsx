import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Props } from "../../types/movieTypes";

export default function CardVerticalMovie({ data }: Props) {
    return (
        <Link href={`/details/${data.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.card}>
                    <Image
                        style={styles.posterPath}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
                        }}
                    />
                    <Text style={styles.cardTitle}>{data.title}</Text>
                    <View style={styles.cardInfo}>
                        <View style={styles.infoItem}>
                            <FontAwesome name="star" size={10} color="#F47521" />
                            <Text style={styles.infoText}>{Number(data.vote_average).toFixed(1)}/10</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <MaterialCommunityIcons name="eye-outline" size={12} color="#F47521" />
                            <Text style={styles.infoText}>{Number(data.popularity).toFixed(1)}K</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    posterPath: {
        width: 170,
        height: 255,
    },
    card: {
        marginRight: 10,
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 14,
        color: "#fff",
        width: 160,
        justifyContent: "center",
        fontWeight: "bold",
        marginTop: 10,
    },
    cardInfo: {
        flexDirection: "row",
        gap:10,
        alignItems: "center",
        marginTop: 5,
        width: 160,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoText: {
        fontSize: 10,
        color: "#dadada",
        marginLeft: 5,
    },
});
