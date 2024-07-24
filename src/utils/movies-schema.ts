import { z } from 'zod'

// Esquema para validar la respuesta de las categorías de la API
export const CategoriesAPIResponseSchema = z.object({
  genres: z.array(z.object({
    id: z.number(),
    name: z.string()
  }))
})

// Esquema para validar los filtros de búsqueda
export const SearchFilterSchema = z.object({
  title: z.string(),
  category: z.string()
})

// Esquema para validar cada película en la respuesta de la API de películas
export const MovieAPIResponse = z.object({
  id: z.number(),
  title: z.string(),
  genre_ids: z.array(z.number()),
  poster_path: z.string().nullable(), 
  overview: z.string().nullable(),   
})

// Esquema para validar la respuesta de las películas de la API
export const MoviesAPIResponse = z.object({
  results: z.array(MovieAPIResponse)
})

// Esquema para validar la respuesta de los detalles de una película
export const MovieAPIResponseSchema = z.object({
  backdrop_path: z.string().nullable(),
  id: z.number(),
  title: z.string(),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string()
  })),
  release_date: z.string(),
  vote_average: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
});
