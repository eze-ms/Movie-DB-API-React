import { StateCreator } from "zustand";
import { getCategories, getMovies } from "../services/MovieService";
import type { Categories, Movies, SearchFilter } from "../types";

// Definición del tipo para el slice
export type MovieSliceType = {
  categories: Categories;
  movies: Movies;
  fetchCategories: () => Promise<void>;
  searchMovies: (searchFilters: SearchFilter) => Promise<void>;
};

export const createMovieSlice: StateCreator<MovieSliceType> = (set) => ({
  categories: {
    genres: []
  },
  movies: {
    results: [] // Asegúrate de que esta estructura coincida con la definición de Movies
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchMovies: async (filters) => {
    const movies = await getMovies(filters);
    set({ movies }); // Asegúrate de que la estructura de movies que obtienes de la API sea correcta
  }
});
