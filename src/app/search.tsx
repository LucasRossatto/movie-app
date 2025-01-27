import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [resultMovies, setResultMovies] = useState<MoviesProps[]>([]);
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
      setMovies(prevMovies => [...prevMovies, ...response.data.results]); // Mantém filmes anteriores
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

  useEffect(() => {
  }, []);

  return (
    <View style={styles.body}>
      <TextInput placeholder="Buscar" placeholderTextColor={"#fff"} onChangeText={handleSearch} value={search} />
      {noResult && (
        <Text>Nenhum resultado encontrado para "{search}"</Text>
      )}
      <FlatList
        horizontal
        data={movieData}
        renderItem={({ item }) => (
          <View>
            <Image
              style={styles.posterPath}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
            />
            <Text style={{ fontSize: 14, color: "#fff", paddingVertical: 10 }}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => !loading && loadMovies()} // Evita chamadas de loadMovies enquanto já está carregando
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
