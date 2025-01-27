import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { api } from "../services/api";
import { logger } from "react-native-logs";
import { Movie } from "../types/movieTypes";
import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
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
        params: { page },
      });
      log.info("Filmes carregados com sucesso");
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Movie }) => (
      <CardMovie data={item} />
    
  );

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.searchIcon}>
        <Link href="/search" asChild>
          <Octicons name="search" size={24} color="white" />
        </Link>
      </View>

      <Text style={styles.categoryLabel}>Populares</Text>
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
      />

      {loading && <ActivityIndicator size={50} color="#0296e5" />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#1B1E25",
    flex: 1,
    padding: 30,
  },
  searchIcon: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
