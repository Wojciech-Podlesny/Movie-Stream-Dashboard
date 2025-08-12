import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateDetails, MovieDetailsType } from "@/types";


type FetchMovieDetailsArgs = { movieId: string };
type FetchMovieDetailsResponse = MovieDetailsType;
type FetchDetailsReject = string;

export const fetchMoviesDetails = createAsyncThunk<
  FetchMovieDetailsResponse,
  FetchMovieDetailsArgs,
  { rejectValue: FetchDetailsReject }
>(
  "details/fetchMoviesDetails",
  async ({ movieId }, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,   
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        return rejectWithValue(error.message || "Failed to fetch movie.");
      }
      return rejectWithValue("Unexpected error occurred.");
    }
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: initialStateDetails,
  reducers: {
    resetMoviesDetails: (state) => {
      state.movie = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = null;
      })
      .addCase(fetchMoviesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMoviesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to download data.";
      });
  },
});

export const { resetMoviesDetails } = detailsSlice.actions;
export const moviesDetailsReducer = detailsSlice.reducer;