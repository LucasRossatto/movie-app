import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";
import { logger } from "react-native-logs";
import { Movie } from "../types/movieTypes";
import Octicons from '@expo/vector-icons/Octicons';
import { Link, usePathname } from "expo-router";
import CardMovie from "../components/CardMovie";
const log = logger.createLogger();

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
      log.info(response.data.results);
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
      <Link href={"/search"} asChild>
        <Octicons name="search" size={24} color="white" />
      </Link>

      <Text style={styles.categoryLabel} >Populares</Text>
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => ( <CardMovie data={item} />)}
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
  categoryLabel:{
    color:"#fff",
    fontSize:22,
    fontWeight:"bold",
  },
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
