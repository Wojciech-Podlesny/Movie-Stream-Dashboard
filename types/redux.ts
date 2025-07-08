import { Movie, Series, Genre, MovieDetailsType, TvDetailsType } from "./models";

export type MovieListType = "discover";

export type MoviesState = {
  movies: Movie[];
  moviesLists: {
    discover: Movie[];
    totalPages: number;
  };
  seriesLists: {
    discover: Series[];
    totalPages: number;
  };
  series: Series[];
  moviesCategories: Genre[];
  seriesCategories: Genre[];
  loading: boolean;
  error: string | null;
  selectedCategory: number | null;
};

export const initialState: MoviesState = {
  moviesLists: {
    discover: [],
    totalPages: 0,
  },
  seriesLists:{
    discover: [],
    totalPages: 0,
  },
  movies: [],
  series: [],
  moviesCategories: [],
  seriesCategories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};


export type DetailsState = {
  movie: MovieDetailsType | null;
  tvShow: TvDetailsType | null;
  loading: boolean;
  error: string | null;
};

export const initialStateDetails: DetailsState = {
  movie: null,
  tvShow: null,
  loading: false,
  error: null,
};


export type TrailerState = {
  videoKey: string | null;
  loading: boolean;
  error: string | null;
};

export const initialStateTrailer: TrailerState = {
  videoKey: null,
  loading: false,
  error: null,
};
