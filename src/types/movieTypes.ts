
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  original_language: string;
  backdrop_path: string;
  popularity: number;
  belongs_to_collection: Collection | null; 
  status: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Props {
  data: Movie;
}