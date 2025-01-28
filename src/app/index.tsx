import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
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
import CardHorizontalMovie from "../components/CardHorizontalMovie";

const log = logger.createLogger();

export default function Index() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMovies = async (url: string, setData: React.Dispatch<React.SetStateAction<Movie[]>>) => {
    try {
      setLoading(true);
      const response = await api.get(url, {
        params: { page },
      });
      log.info("Filmes carregados com sucesso");
      setData((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCardVertical = ({ item }: { item: Movie }) => (
    <CardMovie data={item} />
  );
  const renderCardHorizontal = ({ item }: { item: Movie }) => (
    <CardHorizontalMovie data={item} />
  );

  useEffect(() => {
    loadMovies("/movie/popular", setPopularMovies);
    loadMovies("/movie/top_rated", setTopRatedMovies);
    loadMovies("/movie/upcoming", setUpcomingMovies);
  }, []);

  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>MyMovieList</Text>
        <Link href="/search" asChild>
          <Octicons name="search" size={24} color="white" />
        </Link>
      </View>

      <Text style={styles.categoryLabel}>Mais Populares</Text>
      <FlatList
        horizontal
        data={popularMovies}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCardVertical}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadMovies("/movie/popular", setPopularMovies)}
        onEndReachedThreshold={0.5}
      />

      <Text style={styles.categoryLabel}>Mais Bem Avaliados</Text>
      <FlatList
        horizontal
        data={topRatedMovies}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCardHorizontal}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadMovies("/movie/top_rated", setTopRatedMovies)}
        onEndReachedThreshold={0.5}
      />

      <Text style={styles.categoryLabel}>Próximos Lançamentos</Text>
      <FlatList
        horizontal
        data={upcomingMovies}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCardVertical}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadMovies("/movie/upcoming", setUpcomingMovies)}
        onEndReachedThreshold={0.5}
      />

      {loading && <ActivityIndicator size={50} color="#0296e5" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000000",
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F47521",
  },
});
