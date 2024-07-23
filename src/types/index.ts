import { z } from 'zod'
import { CategoriesAPIResponseSchema, MovieAPIResponse, MoviesAPIResponse, SearchFilterSchema } from '../utils/movies-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Movies = z.infer<typeof MoviesAPIResponse>
export type Movie = z.infer<typeof MovieAPIResponse>