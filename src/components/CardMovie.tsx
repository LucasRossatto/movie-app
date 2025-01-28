import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Props } from "../types/movieTypes";

export default function CardMovie({ data }: Props) {
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
                    <Text style={styles.cardInfo}>
                        {Number(data.vote_average).toFixed(1)}/10  <FontAwesome name="star" size={12} color="#dadada" />  ({Number(data.popularity).toFixed(1)}K) <MaterialCommunityIcons name="menu-down" size={18} color="#dadada" />
                    </Text>

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
        marginTop: 10
    },
    cardInfo: {
        fontSize: 12,
        color: "#dadada",
        width: 160,
        justifyContent: "center",
    },
});
