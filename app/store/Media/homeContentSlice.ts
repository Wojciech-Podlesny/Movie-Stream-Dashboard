import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie, Series, PaginatedResponse } from "@/types";

type HomeContentState = {
  loading: boolean;
  error: string | null;
  popularMovies: Movie[];
  popularSeries: Series[];
  upcomingMovies: Movie[];
  nowPlayingMovies: Movie[];
};

const initialState: HomeContentState = {
  loading: false,
  error: null,
  popularMovies: [],
  popularSeries: [],
  upcomingMovies: [],
  nowPlayingMovies: [],
};
export const fetchHomeContentInitial = createAsyncThunk<
  {
    popularMovies: Movie[];
    popularSeries: Series[];
    upcomingMovies: Movie[];
    nowPlayingMovies: Movie[];
  },
  void,
  { rejectValue: string }
>("home/fetchHomeContent", async (_, { rejectWithValue }) => {
  try {
    
    const [resPopularMovies, resPopularSeries, resUpcoming, resNowPlaying] = await Promise.all([
      axios.get<PaginatedResponse<Movie>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular`, {
        params: { 
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, 
          language: "en-EN" },
      }),
      axios.get<PaginatedResponse<Series>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/popular`, {
        params: { 
          api_key:  process.env.NEXT_PUBLIC_TMDB_API_KEY, 
          language: "en-EN" },
      }),
      axios.get<PaginatedResponse<Movie>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming`, {
        params: { 
          api_key:  process.env.NEXT_PUBLIC_TMDB_API_KEY, 
          language: "en-EN" },
      }),
      axios.get<PaginatedResponse<Movie>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/now_playing`, {
        params: { 
           api_key:  process.env.NEXT_PUBLIC_TMDB_API_KEY, 
          language: "en-EN" },
      }),
    ]);

    return {
      popularMovies: resPopularMovies.data.results,
      popularSeries: resPopularSeries.data.results,
      upcomingMovies: resUpcoming.data.results,
      nowPlayingMovies: resNowPlaying.data.results,
    };
  } catch (error) {
    return rejectWithValue(
      axios.isAxiosError(error) ? error.message : "Unexpected error occurred."
    );
  }
});

export const homeContentSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeContentInitial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHomeContentInitial.fulfilled, (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload.popularMovies;
      state.popularSeries = action.payload.popularSeries;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.nowPlayingMovies = action.payload.nowPlayingMovies;
    });
    builder.addCase(fetchHomeContentInitial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error loading home content";
    });
  },
});

export const homeContentReducer = homeContentSlice.reducer;
