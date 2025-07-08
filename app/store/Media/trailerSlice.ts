
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateTrailer, VideoResult, SearchResponse, VideosResponse } from "@/types";


type FetchTrailerArg = string; 
type FetchTrailerResponse = string; 
type FetchTrailerReject = string;


export const fetchTrailer = createAsyncThunk<
  FetchTrailerResponse,
  FetchTrailerArg,
  { rejectValue: FetchTrailerReject }
>(
  "trailer/fetchTrailer",
  async (movieTitle, { rejectWithValue }) => {
    const URL = process.env.NEXT_PUBLIC_TMDB_API_URL;

    try {
      const [movieSearchResponse, seriesSearchResponse] = await Promise.all([
        axios.get<SearchResponse>(`${URL}/search/movie`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: movieTitle,
          },
        }),
        axios.get<SearchResponse>(`${URL}/search/tv`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: movieTitle,
          },
        }),
      ]);

      const movieResults = movieSearchResponse.data.results;
      const seriesResults = seriesSearchResponse.data.results;

      let selectedType: "movie" | "tv" | null = null;
      let selectedId: number | null = null;

      if (movieResults.length > 0) {
        selectedType = "movie";
        selectedId = movieResults[0].id;
      } else if (seriesResults.length > 0) {
        selectedType = "tv";
        selectedId = seriesResults[0].id;
      } else {
        return rejectWithValue("Not found movie or series.");
      }

      const videoResponse = await axios.get<VideosResponse>(
        `${URL}/${selectedType}/${selectedId}/videos`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            language: "en-EN",
          },
        }
      );

      const trailer = videoResponse.data.results.find(
        (video: VideoResult) =>
          video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        return trailer.key;
      } else {
        return rejectWithValue("Not found trailer.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message || "Failed to download data.");
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);


const trailerSlice = createSlice({
  name: "trailer",
  initialState: initialStateTrailer,
  reducers: {
    resetTrailerState: (state) => {
      state.videoKey = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.videoKey = null;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.loading = false;
        state.videoKey = action.payload;
      })
      .addCase(fetchTrailer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to download data.";
      });
  },
});


export const { resetTrailerState } = trailerSlice.actions;
export const trailerReducer = trailerSlice.reducer;