// Slice Pattern

import { StateCreator } from "zustand"
import { Info } from "../types"

export type FavoriteSliceType = {
    favorites: Info[]
    handleClickFavorite: (info: Info) => void
    favoriteExists: (id: Info['id']) => boolean
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (info) => {
        if(get().favoriteExists(info.id)){
            set((state) => ({
                favorites: state.favorites.filter( favorite =>  favorite.id !== info.id)
            }))
        } else {
            console.log('No Existe...')
            set((state) => ({
                favorites: [ ...state.favorites, info ]
            }))
            
        }    
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.id === id)
    }
})
