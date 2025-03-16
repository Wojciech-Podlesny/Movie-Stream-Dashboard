
export type Movie = {
    id: number;
    title: string;
    poster_path: string;
  };
  
  export type Series = {
    id: number;
    name: string;
    poster_path: string;
  };
  
  export type Genre = {
    id: number;
    name: string;
  };


  export type MovieDetails = {
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    genres?: { id: number; name: string }[];
  };
  