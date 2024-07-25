import { useMemo } from "react"
import MovieCard from "../Components/MovieCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites])

  return (
    <>
      <h1 className="text-white text-6xl font-bold">Mis Peliculas</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 my-10 gap-8">
          {favorites.map((movie) => (
            <MovieCard 
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                genre_ids: movie.genres.map(genre => genre.id)
              }}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl text-white">No hay favoritos, añade y se mostrarán aquí</p>
      )}
    </>
  )
}
