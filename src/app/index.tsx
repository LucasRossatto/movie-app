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
import CardMovie from "../components/CardMovie";
import CardHorizontalMovie from "../components/CardHorizontalMovie";
import Header from "../components/Header";

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
      const response = await api.get(url, { params: { page } });
      log.info("Filmes carregados com sucesso");
      setData(prevMovies =>
        [...prevMovies, ...response.data.results]);
      setPage(prevPage => 
        prevPage + 1);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCardVertical = ({ item }: { item: Movie }) => <CardMovie data={item} />;
  const renderCardHorizontal = ({ item }: { item: Movie }) => <CardHorizontalMovie data={item} />;

  useEffect(() => {
    loadMovies("/movie/popular", setPopularMovies);
    loadMovies("/movie/upcoming", setUpcomingMovies);
    loadMovies("/movie/top_rated", setTopRatedMovies);
  }, []);

  return (
    <ScrollView style={styles.screenBackground}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Mais Populares</Text>
        <FlatList
          horizontal
          data={popularMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardVertical}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => loadMovies("/movie/popular", setPopularMovies)}
          onEndReachedThreshold={0.5}
        />

        <Text style={styles.sectionTitle}>Próximos Lançamentos</Text>
        <FlatList
          horizontal
          data={upcomingMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardHorizontal}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => loadMovies("/movie/upcoming", setUpcomingMovies)}
          onEndReachedThreshold={0.5}
        />

        <Text style={styles.sectionTitle}>Mais Bem Avaliados</Text>
        <FlatList
          horizontal
          data={topRatedMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardVertical}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => loadMovies("/movie/top_rated", setTopRatedMovies)}
          onEndReachedThreshold={0.5}
        />

        {loading && <ActivityIndicator size={60} color="#F47521" />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: "#000000",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});
