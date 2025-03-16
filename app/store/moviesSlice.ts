import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Genre, Movie, Series} from '../../types/Movies'

  
type MoviesState = {
  movies: Movie[];
  series: Series[];
  moviesCategories: Genre[];
  seriesCategories: Genre[]
  loading: boolean;
  error: string | null;
};


const initialState: MoviesState = {
  movies: [],
  series: [],
  moviesCategories: [],
  seriesCategories: [],
  loading: false,
  error:null,
};

//  let controller: AbortController | null = null;

export const fetchMoviesInitial = createAsyncThunk(
  "movies/fetchMovies",
  async (_,{rejectWithValue}) => {


    const URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
    
    try {

      // if (controller) {
      //   controller.abort();
      // }

      // controller = new AbortController();
      // const signal = controller.signal;


        const [responseMovies, responseSeries,responseCategoriesMovies,responseCategoriesSeries] = await Promise.all([
          axios.get(`${URL}/movie/popular`, {
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "en-EN" },
          //  signal
          }),

          axios.get(`${URL}/tv/popular`, {
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "en-EN" },
            // signal
          }),

          axios.get(`${URL}/genre/movie/list`, {
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "en-EN" },
            // signal
          }),
          axios.get(`${URL}/genre/tv/list`, {
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "en-EN" },
            // signal
          })
        ])

        return {
            movies: responseMovies.data.results,
            series: responseSeries.data.results,
            moviesCategories: responseCategoriesMovies.data.genres, 
            seriesCategories: responseCategoriesSeries.data.genres,
        }
   
    } catch(error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message || "Nie udało się pobrać danych.");
      } else {
          return rejectWithValue("Wystąpił nieoczekiwany błąd.");
      }
    }
  
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesInitial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchMoviesInitial.rejected, (state,action) => {
      state.loading = false;
      state.error = action.payload as string || 'Error message';
    });

    builder.addCase(fetchMoviesInitial.fulfilled, (state,action) => {
      state.loading = false;
      state.movies = action.payload.movies
      state.series = action.payload.series
      state.moviesCategories = action.payload.moviesCategories
      state.seriesCategories = action.payload.seriesCategories
    });
  },
});

export const moviesReducer = moviesSlice.reducer;
