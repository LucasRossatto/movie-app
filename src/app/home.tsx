import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";
import { logger } from "react-native-logs";
import { Movie } from "../types/movieTypes"

var log = logger.createLogger();


export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get("/movie/popular", {
        params: {
          page,
        }
      });
      log.info(response.data);
      setMovies(response.data.results);
      setPage(page + 1);
      setLoading(false);
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
          <View>
            <Image
              style={styles.posterPath}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
            />
            <Text style={{fontSize:14,color:"#fff", paddingVertical:10}}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadMovies()}
      />
      {loading && <ActivityIndicator size={50} color={"#0296e5"} />}
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
    width: 170,
    height: 255,
    marginRight: 10,
  },
});
