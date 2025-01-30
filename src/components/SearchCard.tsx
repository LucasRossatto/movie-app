import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { logger } from "react-native-logs";
import { Props } from "../types/movieTypes";
import FontAwesome from '@expo/vector-icons/FontAwesome';
const log = logger.createLogger();


export default function SearchCard({ data }: Props) {

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
                    <View style={styles.movieInfosContainer}>
                        <Text style={styles.movieTitle}>{data.title}</Text>
                        <Text style={styles.movieInfo}><FontAwesome name="star" size={14} color="#F47521" /> {data.vote_average}/10</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    posterPath: {
        width: 126,
        height: 194,
    },
    card: {
        flexDirection: "row",
        marginRight: 10,
        marginVertical: 20,
        gap: 20,
    },
    movieInfo: {
        fontSize: 16,
        color: "#A0A0A0",
        width: 160,
    },
    movieInfosContainer: {
        width: 100,
        flex: 1,
        gap: 52,
        justifyContent: "center"
    },
    movieTitle: {
        fontSize: 18,
        color: "#fff"
    },
});
