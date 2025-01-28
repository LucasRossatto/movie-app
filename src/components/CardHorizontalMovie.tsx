import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router'; // Importa Link para navegação
import { Props } from "../types/movieTypes";

export default function CardHorizontalMovie({ data }: Props) {
    return (
        <Link href={`/details/${data.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.card}>
                    <Image
                        style={styles.posterPath}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
                        }}
                    />
                    <Text style={styles.cardTitle}>{data.title}</Text>

                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    posterPath: {
        width: 260,
        height: 173,
        marginRight: 10,
        marginVertical: 10,
    },
    card: {
    },
    cardTitle: {
        fontSize: 14,
        color: "#fff",
        width: 160,
    },
});
