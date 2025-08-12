import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type FetchSeriesDetailsArgs = { seriesId: string };
type FetchSeriesDetailsResponse = SeriesDetailsType;
type FetchDetailsReject = string;

type SeriesDetailsType = {
  id: number;
  name: string;
  overview: string;
  genres: { id: number; name: string }[];
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
  number_of_episodes: number;
};

const initialStateSeriesDetails: {
  loading: boolean;
  error: string | null;
  series: SeriesDetailsType | null;
} = {
  loading: false,
  error: null,
  series: null,
};

export const fetchSeriesDetails = createAsyncThunk<
  FetchSeriesDetailsResponse,
  FetchSeriesDetailsArgs,
  { rejectValue: FetchDetailsReject }
>(
  "seriesDetails/fetchSeriesDetails",
  async ({ seriesId }, { rejectWithValue }) => {
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${seriesId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        return rejectWithValue(error.message || "Failed to fetch series.");
      }
      return rejectWithValue("Unexpected error occurred.");
    }
  }
);

const seriesDetailsSlice = createSlice({
  name: "seriesDetails",
  initialState: initialStateSeriesDetails,
  reducers: {
    resetSeriesDetails: (state) => {
      state.series = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.series = null;
      })
      .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload;
      })
      .addCase(fetchSeriesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to download series data.";
      });
  },
});

export const { resetSeriesDetails } = seriesDetailsSlice.actions;
export const seriesDetailsReducer = seriesDetailsSlice.reducer;
