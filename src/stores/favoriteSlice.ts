import { StateCreator } from "zustand"
import { Info } from "../types"
import {createMovieSlice, MovieSliceType } from './movieSlice'
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

// Define el tipo de estado para el slice de favoritos
export type FavoriteSliceType = {
    favorites: Info[] // Array de favoritos
    handleClickFavorite: (info: Info) => void // Función para manejar el clic en favoritos
    favoriteExists: (id: Info['id']) => boolean // Función para verificar si un favorito existe
    loadFromStorage: () => void // Función para cargar favoritos desde el almacenamiento local
}

// Crea el slice de favoritos usando Zustand
export const createFavoriteSlice : StateCreator<
    FavoriteSliceType & MovieSliceType & NotificationSliceType, 
    [], 
    [], 
    FavoriteSliceType
> = (set, get, api) => ({

    favorites: [], // Estado inicial del array de favoritos

    // Maneja el clic en favoritos, agregando o eliminando de la lista
    handleClickFavorite: (info) => {
        // Verifica si el favorito ya existe
        if(get().favoriteExists(info.id)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.id !== info.id)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos', 
                error: false
            })
        } else {
            set((state) => ({
                favorites: [...state.favorites, info]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos', 
                error: false
            })
        }
        createMovieSlice(set, get, api).closeModal()

        // Actualiza el almacenamiento local con la lista de favoritos
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    // Verifica si un favorito ya existe en la lista
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.id === id)
    },

    // Carga los favoritos desde el almacenamiento local al iniciar
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})
