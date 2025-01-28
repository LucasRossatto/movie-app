export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: string;
  overview: string;  
  release_date: string;  
  genres: Array<{ id: number; name: string }>;  
  runtime: number;  
  original_language: string; 
  backdrop_path: string; 
}


export interface Props {
  data: Movie;
}