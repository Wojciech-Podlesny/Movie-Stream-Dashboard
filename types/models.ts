
export type Category = {
    id: number;
    name: string;
  };
  
  export type Genre = {
    id: number;
    name: string;
  };
  

  export type Movie = {
    type: "movie" | "series";
    isFavorite: boolean;
    genres: boolean;
    genres: any;
    overview: string;
    release_date: string;
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    releaseDate: string;
    category: number | null;
    genre_ids: number[];
  };
  


  export type Series = {
    first_air_date: string;
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    category: number | null;
    genre_ids: number[];
  };
  

  export type MovieDetails = {
    movie: Movie[];
    id: number;
    title: string;
    poster_path: string;
    overview?: string | null;
    release_date?: string;
    vote_average?: number;
    genres?: { id: number; name: string }[];
    status?: string;
    tagline?: string;
    popularity?: number;
    runtime?: number;
    budget?: number;
    revenue?: number;
    backdrop_path?: string | null;
    videos?: { key: string }[];
  };

  export type MovieDetailsType = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
  };
  
  export type TvDetailsType = {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
    poster_path: string;
  };
  
  export type VideoResult = {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  };
  