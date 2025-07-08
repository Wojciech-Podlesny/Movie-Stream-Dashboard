import { VideoResult, MovieDetails, TvDetailsType } from "./models";


export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};


export type GenresResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};

export type SearchResponse = {
  page: number;
  results: Array<{
    id: number;
    title?: string; 
    name?: string; 
  }>;
  total_pages: number;
  total_results: number;
};


export type VideosResponse = {
  id: number;
  results: VideoResult[];
};


export type MovieDetailsResponse = MovieDetails;


export type TvDetailsResponse = TvDetailsType;
