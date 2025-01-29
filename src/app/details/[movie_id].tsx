import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { logger } from "react-native-logs";
import { api } from "@/src/services/api";
import { Movie } from '@/src/types/movieTypes';
import Header from '@/src/components/Header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CardHorizontalMovie from '@/src/components/CardHorizontalMovie';

const log = logger.createLogger();

export default function TestID() {
  const { movie_id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recomendedMovies, setRecomendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeMoreOverView, setSeeMoreOverView] = useState(false);

  const loadMovieInfos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movie_id}`);
      if (!response || !response.data) {
        log.error("Filme inválido");
        return;
      }
      setMovie(response.data);
      log.info("Detalhes do filme carregados com sucesso");
    } catch (error) {
      log.error("Erro ao carregar detalhes do filme", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecomendedMovies = async () => {
    try {
      setRecomendedMovies([]);
      setLoading(true);
      const response = await api.get(`/movie/${movie_id}/recommendations`);
      if (!response || !response.data) {
        log.error("Lista de recomendações inválida");
        return;
      }
      setRecomendedMovies(response.data.results);
      log.info("Lista de recomendações carregada com sucesso");
    } catch (error) {
      log.error("Erro ao carregar lista de recomendações", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCardHorizontal = ({ item }: { item: Movie }) => <CardHorizontalMovie data={item} />;

  useEffect(() => {
    if (movie_id) {
      loadMovieInfos();
      loadRecomendedMovies();
    }
    setSeeMoreOverView(false);
  }, [movie_id]);

  return (
    <ScrollView style={{ backgroundColor: "#000000" }}>
      <Header />
      <View style={styles.screenContainer}>
        {loading ? (
          <ActivityIndicator size={60} color="#F47521" />
        ) : (
          movie && (
            <View style={styles.movieDetailsWrapper}>
              <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                style={styles.movieBackground}
                blurRadius={10}
              >
                <View style={styles.overlayContainer}>
                  <Image
                    style={styles.posterImage}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                  />
                </View>
              </ImageBackground>
              <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <View style={styles.ratingAndViewsContainer}>

                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={18} color="#F47521" />
                    <Text style={styles.ratingText}>{Number(movie.vote_average).toFixed(1)}/10</Text>
                  </View>

                  <View style={styles.viewsContainer}>
                    <MaterialCommunityIcons name="eye-outline" size={20} color="#F47521" />
                    <Text style={styles.viewsText}>{Number(movie.popularity).toFixed(1)}K </Text>
                    <Text style={styles.viewsLabel}>de Visualizações</Text>
                  </View>
                </View>

                <View style={styles.overviewContainer}>
                  <Text style={styles.overviewText} numberOfLines={seeMoreOverView ? undefined : 3}>
                    {movie.overview}
                  </Text>
                  <TouchableOpacity onPress={() => setSeeMoreOverView(!seeMoreOverView)}>
                    <Text style={styles.showMoreButton}>
                      {seeMoreOverView ? "Ver menos" : "Ver mais"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.genreTitle}>Gêneros</Text>
                {movie.genres && movie.genres.length > 0 && (
                  <View style={styles.genreListContainer}>
                    {movie.genres.map((genre) => (
                      <Text key={genre.id} style={styles.genreItem}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.recomendedContainer}>
                <Text style={styles.sectionTitle}>Recomendações</Text>
                <FlatList
                  horizontal
                  data={recomendedMovies}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderCardHorizontal}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          )
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  movieDetailsWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  movieBackground: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: 290,
    height: 433,
    borderRadius: 10,
  },
  movieInfoContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingAndViewsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 5,
    width: 160,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#dadada",
    marginLeft: 5,
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewsText: {
    fontSize: 16,
    color: "#dadada",
    marginLeft: 5,
  },
  viewsLabel: {
    fontSize: 16,
    color: "#dadada",
  },
  overviewContainer: {
    marginVertical: 20,
  },
  overviewText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
  },
  showMoreButton: {
    color: "#F47521",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left"
  },
  genreListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genreItem: {
    color: "#F47521",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  genreTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom:10,
  },
  recomendedContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start"
  },
});
