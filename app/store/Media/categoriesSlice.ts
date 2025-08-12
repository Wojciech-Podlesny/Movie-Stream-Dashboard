import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Genre, GenresResponse } from "@/types";

type FetchCategoriesResponse = {
  moviesCategories: GenresResponse["genres"];
  seriesCategories: GenresResponse["genres"];
};

type FetchCategoriesReject = string;

export interface CategoriesState {
  moviesCategories: Genre[];
  seriesCategories: Genre[];
  selectedMovieCategory: Genre | null;
  selectedSeriesCategory: Genre | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CategoriesState = {
  moviesCategories: [],
  seriesCategories: [],
  selectedMovieCategory: null,
  selectedSeriesCategory: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  FetchCategoriesResponse,
  void,
  { rejectValue: FetchCategoriesReject }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const [responseCategoriesMovies, responseCategoriesSeries] =
      await Promise.all([
        axios.get<GenresResponse>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/movie/list`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
        axios.get<GenresResponse>(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/tv/list`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
      ]);

    return {
      moviesCategories: responseCategoriesMovies.data.genres,
      seriesCategories: responseCategoriesSeries.data.genres,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message || "Failed to download categories.");
    }
    return rejectWithValue("An unexpected error occurred.");
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setSelectedMovieCategory: (state, action) => {
      state.selectedMovieCategory = action.payload;
    },

    setSelectedSeriesCategory: (state, action) => {
      state.selectedSeriesCategory = action.payload;
    },

    clearSelectedCategories: (state) => {
      state.selectedMovieCategory = null;
      state.selectedSeriesCategory = null;
    },
     clearSelectedMovieCategory: (state) => {
      state.selectedMovieCategory = null;
    },
    clearSelectedSeriesCategory: (state) => {
      state.selectedSeriesCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesCategories = action.payload.moviesCategories;
        state.seriesCategories = action.payload.seriesCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to download categories.";
      });
  },
});

export const {
  setSelectedMovieCategory,
  setSelectedSeriesCategory,
  clearSelectedCategories,
  clearSelectedMovieCategory,
  clearSelectedSeriesCategory
} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
