import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "@/src/services/api";
import { logger } from "react-native-logs";
import { Movie } from "@/src/types/movieTypes";
import SearchCard from "../components/SearchCard";

var log = logger.createLogger();

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [resultMovies, setResultMovies] = useState<Movie[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
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
      setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
      setLoading(false);
    }
  };

  const searchMovies = async (query: String) => {
    try {
      setLoading(true);
      const response = await api.get("/search/movie", {
        params: {
          query,
        }
      });
      log.info(response.data);
      if (response.data.results.length === 0) {
        setNoResult(true);
      } else {
        setResultMovies(response.data.results);
      }
      setLoading(false);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
      setNoResult(false);
    } else {
      setResultMovies([]);
    }
  };

  const movieData = search.length > 2 ? resultMovies : movies;

  const renderItem = ({ item }: { item: Movie }) => (
    <SearchCard data={item} />
  );

  useEffect(() => {
  }, []);


  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Buscar"
        placeholderTextColor={"#fff"}
        selectionColor={"#F47521"}
        onChangeText={handleSearch}
        value={search}
        style={styles.input}
      />
      {noResult && (
        <Text>Nenhum resultado encontrado para "{search}"</Text>
      )}
      <FlatList
        style={styles.flatilist}
        data={resultMovies}
        renderItem={renderItem}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
      />
      {loading && <ActivityIndicator size={50} color={"#0296e5"} />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#1B1E25",
    flex: 1,
  },
  flatilist: {
    marginHorizontal: 30,
  },
  posterPath: {
    width: 170,
    height: 255,
    marginRight: 10,
  },
  input: {
    backgroundColor: "#18191E",
    height: 84,
    paddingHorizontal: 20
  },
});
