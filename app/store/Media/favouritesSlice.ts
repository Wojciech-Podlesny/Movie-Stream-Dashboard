import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
};

interface FavoritesState {
  items: Movie[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (!state.items.some((m) => m.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
  },
});


export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favouritesReducer = favoritesSlice.reducer;


//add information(comunicate) about the movie
//poprawic nazwy