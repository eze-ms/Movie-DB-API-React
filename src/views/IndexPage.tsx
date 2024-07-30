import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import MovieCard from "../Components/MovieCard";
import { getRecentMovies } from "../services/MovieService";
import { Movie } from "../types";

const IndexPage = () => {
  const [recent, setRecent] = useState<Movie[]>([]);
  const movies = useAppStore((state) => state.movies);
  const hasMovies = useMemo(() => movies?.results?.length > 0, [movies]);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      const recentMovies = await getRecentMovies();
      setRecent(recentMovies);
    };
    fetchRecentMovies();
  }, []);

  return (
    <div>
      <h1 className="text-white text-6xl font-bold">Películas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 my-10 gap-8">
        {hasMovies ? (
          movies.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          recent.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>

      {!hasMovies && recent.length === 0 && (
        <p className="my-10 text-center text-2xl text-white">No hay resultados</p>
      )}
    </div>
  );
};

export default IndexPage;
