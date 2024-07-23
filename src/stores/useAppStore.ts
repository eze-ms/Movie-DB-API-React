import { create } from "zustand"
import { devtools } from 'zustand/middleware'
import { createMovieSlice, MovieSliceType } from "./movieSlice"

export const useAppStore = create<MovieSliceType>()(devtools((...a) => ({
    ...createMovieSlice(...a)
})))