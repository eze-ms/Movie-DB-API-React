import { create } from "zustand"
import { devtools } from 'zustand/middleware'
import { createMovieSlice, MovieSliceType } from "./movieSlice"
import { FavoriteSliceType, createFavoriteSlice } from './favoriteSlice'

export const useAppStore = create<MovieSliceType & FavoriteSliceType>()(devtools((...a) => ({
    ...createMovieSlice(...a),
    ...createFavoriteSlice(...a)
})))