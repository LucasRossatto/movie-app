import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { logger } from "react-native-logs";

import { Props } from "../types/movieTypes";
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
                        <Text style={styles.cardTitle}>{data.vote_average}/10</Text>
                        
                      
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
        marginRight: 10,
        marginVertical: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",

    },
    cardTitle: {
        fontSize: 14,
        color: "#fff",
        width: 160,
    },
    movieInfosContainer: {
        width:100,
        backgroundColor:"#f2f2f2",
        flex:1
    },
    movieTitle: {
        fontSize: 18,
        color: "#fff"
    },
});
