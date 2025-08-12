import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie, Series, PaginatedResponse } from "@/types";

type DiscoverState = {
  loading: boolean;
  error: string | null;
  discoverMovies: Movie[];
  discoverSeries: Series[];
  moviesPage: number;
  seriesPage: number;
  totalPagesMovies: number;
  totalPagesSeries: number;
  selectedCategory: number | null;
};

const initialState: DiscoverState = {
  loading: false,
  error: null,
  discoverMovies: [],
  discoverSeries: [],
  moviesPage: 1,
  seriesPage: 1,
  totalPagesMovies: 0,
  totalPagesSeries: 0,
  selectedCategory: null,
};

export const fetchDiscoverMovies = createAsyncThunk<
  { movies: Movie[]; page: number; totalPages: number },
  number, 
  { rejectValue: string }
>(
  "discover/fetchDiscoverMovies",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get<PaginatedResponse<Movie>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page,
        },
      });

      return {
        movies: response.data.results,
        page,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error) ? error.message : "Unexpected error occurred."
      );
    }
  }
);

export const fetchDiscoverSeries = createAsyncThunk<
  { series: Series[]; page: number; totalPages: number },
  number,
  { rejectValue: string }
>(
  "discover/fetchDiscoverSeries",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get<PaginatedResponse<Series>>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/tv`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page,
        },
      });

      return {
        series: response.data.results,
        page,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error) ? error.message : "Unexpected error occurred."
      );
    }
  }
);

export const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscoverMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.moviesPage = action.payload.page;
      state.totalPagesMovies = action.payload.totalPages;
      if (action.payload.page === 1) {
        state.discoverMovies = action.payload.movies;
      } else {
        state.discoverMovies.push(...action.payload.movies);
      }
    });
    builder.addCase(fetchDiscoverMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error fetching discover movies";
    });

    builder.addCase(fetchDiscoverSeries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDiscoverSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.seriesPage = action.payload.page;
      state.totalPagesSeries = action.payload.totalPages;
      if (action.payload.page === 1) {
        state.discoverSeries = action.payload.series;
      } else {
        state.discoverSeries.push(...action.payload.series);
      }
    });
    builder.addCase(fetchDiscoverSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error fetching discover series";
    });
  },
});

export const discoverReducer = discoverSlice.reducer;
