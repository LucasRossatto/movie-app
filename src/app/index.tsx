import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";
import { logger } from "react-native-logs";

var log = logger.createLogger();

interface MoviesProps {
  id: number;
  title: string;
  poster_path: string;
}

export default function Index() {
  const [movies, setMovies] = useState<MoviesProps[]>([]);

  const loadMovies = async () => {
    try {
      const response = await api.get("/movie/popular");
      log.info(response.data);
      setMovies(response.data.results);
    } catch (error) {
      log.error("Erro ao carregar filmes", error); 
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

 

  return (
    <View style={styles.body}>
      <Text>O que você quer assistir hoje?</Text>
      <FlatList
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <Image
            style={styles.posterPath}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#1B1E25",
    flex: 1,
    padding: 30,
  },
  posterPath: {
    width: 144,
    height: 210,
    marginRight: 10, 
  },
});
