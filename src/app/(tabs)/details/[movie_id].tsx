import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { logger } from "react-native-logs";
import { api } from "@/src/services/api";
import { Movie } from '@/src/types/movieTypes';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CardHorizontalMovie from '@/src/components/Cards/CardHorizontalMovie';
import HeaderWithBackButton from '@/src/components/Headers/HeaderWithBackButton';
import YoutubeIframe from 'react-native-youtube-iframe';
import CardVerticalMovie from '@/src/components/Cards/CardVerticalMovie';

const log = logger.createLogger();

export default function TestID() {
  const { movie_id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recomendedMovies, setRecomendedMovies] = useState<Movie[]>([]);
  const [trailers, setTrailers] = useState<any[]>([]);
  const [collection, setCollection] = useState<any>(null);
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

  const loadMovieVideos = async () => {
    try {
      const response = await api.get(`/movie/${movie_id}/videos`);
      if (!response || !response.data) {
        log.error("Vídeos inválidos");
        return;
      }
      const trailers = response.data.results.filter(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailers;
    } catch (error) {
      log.error("Erro ao carregar vídeos", error);
      return [];
    }
  };

  const loadMovieCollection = async (collectionId: number) => {
    try {
      const response = await api.get(`/collection/${collectionId}`);
      if (!response || !response.data) {
        log.error("Coleção inválida");
        return null;
      }
      return response.data;
    } catch (error) {
      log.error("Erro ao carregar coleção", error);
      return null;
    }
  };

  const renderCardHorizontal = ({ item }: { item: Movie }) => <CardHorizontalMovie data={item} />;
  const renderCardVertical = ({ item }: { item: Movie }) => <CardVerticalMovie data={item} />;

  const statusToPtBR = (status: string) => {
    switch (status) {
      case 'Released':
        return 'Lançado';
      case 'Post Production':
        return 'Pós-produção';
      case 'In Production':
        return 'Em produção';
      case 'Planned':
        return 'Planejado';
      case 'Canceled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  useEffect(() => {
    if (movie_id) {
      loadMovieInfos();
      loadRecomendedMovies();
      loadMovieVideos().then((trailers) => setTrailers(trailers || []));
    }
    setSeeMoreOverView(false);
  }, [movie_id]);

  useEffect(() => {
    if (movie && movie.belongs_to_collection) {
      loadMovieCollection(movie.belongs_to_collection.id).then((collection) =>
        setCollection(collection)
      );
    }
  }, [movie]);

  return (
    <ScrollView style={{ backgroundColor: "#000000" }}>
      <HeaderWithBackButton />
      <View style={styles.screenContainer}>
        {loading ? (
          <ActivityIndicator size={60} color="#F47521" style={{ marginTop: 60 }} />
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
                <Text style={styles.genreTitle}>Sinopse</Text>
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
                {movie.genres.length > 0 && (
                  <View style={styles.genreListContainer}>
                    {movie.genres.map((genre) => (
                      <Text key={genre.id} style={styles.genreItem}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.statusContainer}>
                  <Text style={styles.genreTitle}>Estado</Text>
                  <Text style={styles.statusText}>
                    {statusToPtBR(movie.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.trailerContainer}>
                <Text style={styles.sectionTitle}>Trailer</Text>
                {trailers.length > 0 ? (
                  <YoutubeIframe
                    height={200}
                    videoId={trailers[0].key}
                    play={false}
                  />
                ) : (
                  <Text style={styles.noResult}>Nenhum trailer disponível.</Text>
                )}
              </View>

              {collection && (
                <View style={styles.collectionContainer}>
                  <Text style={styles.sectionTitle}>{collection.name}</Text>
                  <FlatList
                    horizontal
                    data={collection.parts}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCardVertical}
                    keyExtractor={(item) => item.id.toString()}
                  />
                </View>
              )}

              <View style={styles.recomendedContainer}>
                <Text style={styles.sectionTitle}>Recomendações</Text>
                {recomendedMovies.length > 0 ? (
                  <FlatList
                    horizontal
                    data={recomendedMovies}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCardHorizontal}
                    keyExtractor={(item) => item.id.toString()}
                  />
                ) : (
                  <Text style={styles.noResult}>Nenhuma recomendação disponível.</Text>
                )}
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
    marginBottom: 10,
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
    marginVertical: 10,
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
    marginBottom: 10,
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    color: "#F47521",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 5,
    paddingVertical: 5,

    borderRadius: 5,
    alignSelf: 'flex-start',

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
  trailerContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  noResult: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 30,
  },
  collectionContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
});