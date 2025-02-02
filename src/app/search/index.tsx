import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { api } from "@/src/services/api";
import { logger } from "react-native-logs";
import { Movie } from "@/src/types/movieTypes";
import SearchCard from "../../components/SearchCard";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

var log = logger.createLogger();

export default function Index() {
  const [resultMovies, setResultMovies] = useState<Movie[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async (query: string, pageNumber: number = 1) => {
    try {
      setError(null);
      setLoading(true);
      setNoResult(false);

      const response = await api.get("/search/movie", { params: { query, page: pageNumber } });

      if (response.data.results.length === 0) {
        setNoResult(true);
      } else {
        setResultMovies(pageNumber === 1 ? response.data.results : [...resultMovies, ...response.data.results]);
        setPage(pageNumber);
      }
    } catch (error) {
      setError("Erro ao carregar filmes. Tente novamente mais tarde.");
      log.error("Erro ao carregar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loading) return;
    await searchMovies(search, page + 1);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 2) {
        searchMovies(search);
      } else {
        setResultMovies([]);
        setNoResult(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const renderItem = ({ item }: { item: Movie }) => <SearchCard data={item} />;
  const router = useRouter();

  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View style={styles.iconBackground}>
            <AntDesign name="left" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#fff"}
          selectionColor={"#F47521"}
          onChangeText={setSearch}
          value={search}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            isFocused && { borderBottomColor: "#F47521", borderBottomWidth: 1.5 },
          ]}
        />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => searchMovies(search)}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && noResult && search.length > 2 && (
        <Text style={styles.noResult}>Nenhum resultado encontrado para "{search}"</Text>
      )}

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#F47521" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          style={styles.flatilist}
          data={resultMovies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color="#F47521" /> : null
          }
        />
      )}
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
    paddingRight: 30,
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
  },
  noResult: {
    color: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    fontSize: 18,
    textAlign: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 16,
  },
  retryText: {
    color: "#F47521",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  iconBackground: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 0,
  },
});