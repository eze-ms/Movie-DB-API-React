import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import MovieCard from "../Components/MovieCard"

export default function IndexPage() {
  const movies = useAppStore((state) => state.movies)

  const hasMovies = useMemo(() => movies?.results?.length > 0, [movies])

  return (
    <div> 
      <h1 className="text-white text-6xl font-bold">Películas</h1>

      {hasMovies ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 my-10 gap-8">
          {movies.results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl text-white">No hay resultados</p>
      )}
    </div>
  )
}

