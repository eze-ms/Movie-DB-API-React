import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { SearchFilter } from "../types";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    title: '',
    category: ''
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchMovies = useAppStore((state) => state.searchMovies);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (category: string) => {
    setSearchFilters({
      ...searchFilters,
      category: category
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchFilters.title === '') {
      console.log('El campo de título es obligatorio...');
      return;
    }

    console.log('Filters:', searchFilters);
    searchMovies(searchFilters);
  };

  const mainCategories = [
    { id: '', name: 'Todo' },
    { id: '28', name: 'Acción' },
    { id: '12', name: 'Aventura' },
    { id: '16', name: 'Animación' },
    { id: '35', name: 'Comedia' }
  ];

  return (
    <header>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo_cinema.webp" alt="logo" />
          </div>
          <form className="md:w-1/2 2xl:w-1/3 text-right" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                id="title"
                name="title"
                className="bg-custom-bg p-2 w-1/2 rounded focus:outline-none text-md border text-white"
                placeholder="Busca por título, reparto, tema..."
                onChange={handleChange}
                value={searchFilters.title}
              />
            </div>
          </form>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary-orange uppercase font-medium' : 'text-white uppercase font-medium'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? 'text-primary-orange uppercase font-medium' : 'text-white uppercase font-medium'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form className="md:w-1/2 2xl:w-1/2 pt-5" onSubmit={handleSubmit}>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mainCategories.map(category => (
                <input
                  type="button"
                  className={`uppercase bg-custom-button hover:bg-custom-hover text-white text-sm font-normal py-3 px-3 rounded ${searchFilters.category === category.id ? 'bg-gray-400' : ''}`}
                  key={category.id}
                  value={category.name}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </div>

            <input
              type="submit"
              value='Buscar título'
              className="cursor-pointer bg-primary-orange hover:bg-orange-800 text-white font-medium w-1/3 p-2 rounded uppercase mt-5"
            />
          </form>
        )}
      </div>
    </header>
  );
}
