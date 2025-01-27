import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from "../types/movieTypes";

interface Props {
    data: Movie;
    onPress?: () => void;
}

export default function CardMovie({ data, ...rest }: Props) {

    return (
        <TouchableOpacity>
            <View style={styles.card}>
                <Image
                    style={styles.posterPath}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
                    }}
                />
                <Text style={styles.cardTitle}>{data.title}</Text>
                <Text style={styles.cardTitle}>{data.vote_average}/10</Text>

            </View>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    posterPath: {
        width: 170,
        height: 255,
        marginRight: 10,
        marginVertical: 20,
    },
    card: {
    },
    cardTitle: {
        fontSize: 14,
        color: "#fff",
        width: 160,
    },
});