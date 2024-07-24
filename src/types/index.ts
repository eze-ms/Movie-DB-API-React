import { z } from 'zod'
import { CategoriesAPIResponseSchema, MovieAPIResponse, MovieAPIResponseSchema, MoviesAPIResponse, SearchFilterSchema } from '../utils/movies-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Movies = z.infer<typeof MoviesAPIResponse>
export type Movie = z.infer<typeof MovieAPIResponse>
export type Info = z.infer<typeof MovieAPIResponseSchema>