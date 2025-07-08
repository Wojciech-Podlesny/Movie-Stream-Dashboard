import { configureStore } from '@reduxjs/toolkit'
import { searchReducer} from './Search/searchSlice'
import { categoriesReducer } from './Media/categoriesSlice'
import { trailerReducer } from './Media/trailerSlice'
import { discoverReducer } from './Media/discoverSLice'
import { homeContentReducer } from './Media/homeContentSlice'
import { seriesDetailsReducer } from './Media/detailsSeriesSlice'
import { moviesDetailsReducer } from './Media/detailsMoviesSlice'
import { favouritesReducer } from './Media/favouritesSlice'



export const makeStore = () => configureStore({
  reducer: {
    discover:discoverReducer,
    home:homeContentReducer,
    search:searchReducer,
    categories:categoriesReducer,
    trailer: trailerReducer,
    moviesDetails: moviesDetailsReducer,
    seriesDetails: seriesDetailsReducer,
    favourites: favouritesReducer
  }
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']