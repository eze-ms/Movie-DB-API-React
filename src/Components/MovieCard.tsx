import type { Movie } from "../types"
import { useAppStore } from "../stores/useAppStore"

type MovieCardProps = {
    movie: Movie
};

export default function MovieCard({ movie }: MovieCardProps) {

  const selectMovie = useAppStore((state) => state.selectMovie)

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="overflow-hidden flex flex-col group">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={`Imagen de ${movie.title}`} 
          className="w-full h-80 object-cover transition-transform duration-300 ease-in-out filter brightness-75 group-hover:brightness-100 group-hover:scale-110" // Aplica el filtro de brillo y transición
        />
      </div>
      <div className="flex-grow">
         {/* <h2 className="text-white truncate font-medium text-sm">{movie.title}</h2> */}
        <button
          type="button"
          className="bg-primary-orange hover:bg-orange-800 w-full mt-3 p-2 font-light text-white text-sm rounded-sm uppercase"
          onClick={() => selectMovie(movie.id)}
        >
          Información
        </button>
      </div>
    </div>
  );
}

