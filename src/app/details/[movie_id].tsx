import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { logger } from "react-native-logs";
import { api } from "@/src/services/api";
import { Movie } from '@/src/types/movieTypes';

const log = logger.createLogger();

export default function TestID() {
  const { movie_id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const loadMovieInfos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movie_id}`);
      if(!response){
        log.error("Filme inválido");
      }
      log.info("Detalhes do filme carregado com sucesso");
    } catch (error) {
      log.error("Erro ao carregar filmes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovieInfos();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID recebido: {movie_id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1E25',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
