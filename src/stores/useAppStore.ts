import { create } from "zustand"
import { devtools } from 'zustand/middleware'
import { createMovieSlice, MovieSliceType } from "./movieSlice"
import { FavoriteSliceType, createFavoriteSlice } from './favoriteSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

// Crea el store de Zustand combinando los slices de películas, favoritos y notificaciones con el middleware de devtools
export const useAppStore = create<MovieSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createMovieSlice(...a), // Combina el slice de películas y expande los argumentos pasados
    ...createFavoriteSlice(...a), // Combina el slice de favoritos y expande los argumentos pasados
    ...createNotificationSlice(...a), // Combina el slice de notificaciones y expande los argumentos pasados
})))
