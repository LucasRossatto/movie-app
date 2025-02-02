import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Movie } from "../types/movieTypes";
import { logger } from "react-native-logs";

export const useMovies = (url: string) => {
  const log = logger.createLogger();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMovies = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await api.get(url, { params: { page } });
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      log.error("Erro ao carregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return { movies, loading, loadMovies };
};