import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "@/src/services/api";
import { logger } from "react-native-logs";
import { Movie } from "@/src/types/movieTypes";
import SearchCard from "../components/SearchCard";
import Octicons from "@expo/vector-icons/Octicons";

var log = logger.createLogger();

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [resultMovies, setResultMovies] = useState<Movie[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false); // Estado para foco no TextInput

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get("/movie/popular", {
        params: { page },
      });
      log.info(response.data);
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
      setLoading(false);
    }
  };

  const searchMovies = async (query: String) => {
    try {
      setResultMovies([]);
      setLoading(true);
      const response = await api.get("/search/movie", { params: { query } });
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

  const renderItem = ({ item }: { item: Movie }) => <SearchCard data={item} />;

  useEffect(() => { }, []);

  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#fff"}
          selectionColor={"#F47521"}
          onChangeText={handleSearch}
          value={search}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            isFocused && { borderBottomColor: "#F47521", borderBottomWidth: 1.5 },
          ]}
        />
        <Octicons name="search" size={24} color="white" />

      </View>

      {noResult && (
        <Text style={styles.noResult}>Nenhum resultado encontrado para "{search}"</Text>
      )}
      <FlatList
        style={styles.flatilist}
        data={movieData}
        renderItem={renderItem}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
      />
      {loading && <ActivityIndicator size={60} color={"#F47521"} />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000000",
    flex: 1,
  },
  flatilist: {
    marginHorizontal: 30,
  },
  inputContainer: {
    backgroundColor: "#18191E",
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 18,
    color: "#fff",
    borderBottomColor: "transparent",
    borderBottomWidth: 2,
    flex: 1,
    marginRight: 10,
  },
  noResult: {
    color: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    fontSize: 18,
    textAlign: "center",
  },
});
