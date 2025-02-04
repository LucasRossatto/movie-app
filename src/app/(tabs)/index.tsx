import Header from "@/src/components/Headers/Header";
import { useMovies } from "@/src/hooks/useMovies";
import { Movie } from "@/src/types/movieTypes";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { logger } from "react-native-logs";
import CardVertical from "../../components/Cards/CardVerticalMovie";
import CardHorizontal from "../../components/Cards/CardVerticalMovie";

const log = logger.createLogger();

export default function Index() {
  const { movies: popularMovies, loading: loadingPopular, loadMovies: loadPopularMovies } = useMovies("/movie/popular");
  const { movies: upcomingMovies, loading: loadingUpcoming, loadMovies: loadUpcomingMovies } = useMovies("/movie/upcoming");
  const { movies: topRatedMovies, loading: loadingTopRated, loadMovies: loadTopRatedMovies } = useMovies("/movie/top_rated");
  const { movies: nowPlayingMovies, loading: loadingNowPlaying, loadMovies: loadNowPlayingMovies } = useMovies("/movie/now_playing");

  const renderCardVertical = useCallback(({ item }: { item: Movie }) => <CardVertical data={item} />, []);
  const renderCardHorizontal = useCallback(({ item }: { item: Movie }) => <CardHorizontal data={item} />, []);

  const memoizedPopularMovies = useMemo(() => popularMovies, [popularMovies]);
  const memoizedUpcomingMovies = useMemo(() => upcomingMovies, [upcomingMovies]);
  const memoizedTopRatedMovies = useMemo(() => topRatedMovies, [topRatedMovies]);
  const memoizedNowPlayingMovies = useMemo(() => nowPlayingMovies, [nowPlayingMovies]);

  return (
    <ScrollView style={styles.screenBackground}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Mais Populares</Text>
        <FlatList
          horizontal
          data={memoizedPopularMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardVertical}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadPopularMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingPopular ? <ActivityIndicator size={60} color="#F47521" /> : null}
          ListFooterComponentStyle={styles.loadingIndicator}
          initialNumToRender={5}
          windowSize={5}
        />

        <Text style={styles.sectionTitle}>Próximos Lançamentos</Text>
        <FlatList
          horizontal
          data={memoizedUpcomingMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardHorizontal}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadUpcomingMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingUpcoming ? <ActivityIndicator size={60} color="#F47521" /> : null}
          ListFooterComponentStyle={styles.loadingIndicator}
          initialNumToRender={5}
          windowSize={5}
        />

        <Text style={styles.sectionTitle}>Mais Bem Avaliados</Text>
        <FlatList
          horizontal
          data={memoizedTopRatedMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardVertical}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadTopRatedMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingTopRated ? <ActivityIndicator size={60} color="#F47521" /> : null}
          ListFooterComponentStyle={styles.loadingIndicator}
          initialNumToRender={5}
          windowSize={5}
        />

        <Text style={styles.sectionTitle}>Filmes em exibição</Text>
        <FlatList
          horizontal
          data={memoizedNowPlayingMovies}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCardHorizontal}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadNowPlayingMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingNowPlaying ? <ActivityIndicator size={60} color="#F47521" /> : null}
          ListFooterComponentStyle={styles.loadingIndicator}
          initialNumToRender={5}
          windowSize={5}
        />
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
    justifyContent: "center",
    alignItems: "center", 
    paddingVertical: 20,
  },
});