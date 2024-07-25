import { StateCreator } from "zustand"
import { getCategories, getMovieById, getMovies } from "../services/MovieService"
import type { Categories, Info, Movie, Movies, SearchFilter } from "../types"
import { FavoriteSliceType } from "./favoriteSlice"

// Definición del tipo para el slice
export type MovieSliceType = {
  categories: Categories
  movies: Movies
  selectedMovie: Info
  modal: boolean
  fetchCategories: () => Promise<void>
  searchMovies: (searchFilters: SearchFilter) => Promise<void>
  selectMovie: (id: Movie['id'] ) => Promise<void>
  closeModal: () => void
}

export const createMovieSlice: StateCreator<
  MovieSliceType & FavoriteSliceType, 
  [], 
  [], 
  MovieSliceType
> = (set) => ({
  // Inicializa el estado de categorías con un array vacío de géneros
  categories: {
    genres: []
  },

  // Inicializa el estado de películas con un array vacío de resultados
  movies: {
    results: [] // Asegúrate de que esta estructura coincida con la definición de Movies
  },

  // Inicializa para mostrar la pelicula en el estado
  selectedMovie: {} as Info,

  // Inicializa para mostra el modal
  modal: false,

  // Función para obtener las categorías de películas desde la API y actualizar el estado
  fetchCategories: async () => {
    const categories = await getCategories() // Obtiene las categorías de películas desde la API
    set({ categories }) // Actualiza el estado con las categorías obtenidas
  },

  // Función para buscar películas según los filtros proporcionados y actualizar el estado
  searchMovies: async (filters) => {
    const movies = await getMovies(filters) // Obtiene las películas desde la API según los filtros
    set({ movies }) // Actualiza el estado con las películas obtenidas
  },

  // Función placeholder para seleccionar una película y mostrarla
  selectMovie: async (id) => {
    const selectedMovie = await getMovieById(id)
    set({
      selectedMovie,
      modal: true
    })
  },

  closeModal:() => {
    set({
      modal: false,
      selectedMovie: {} as Info
    })
  },
})
