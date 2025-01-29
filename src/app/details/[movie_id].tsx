import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { logger } from "react-native-logs";
import { api } from "@/src/services/api";
import { Movie } from '@/src/types/movieTypes';

const log = logger.createLogger();

export default function TestID() {
  const { movie_id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recomendedMovies, setRecomendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (movie_id) {
      loadMovieInfos();
      loadRecomendedMovies();
    }
  }, [movie_id]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID recebido: {movie_id}</Text>
      {loading ? (
        <ActivityIndicator size={60} color="#F47521" />
      ) : (
        <View>
          {
          movie && 
          <Text style={styles.text}>Título: {movie.title}</Text>
          }
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1E25',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
