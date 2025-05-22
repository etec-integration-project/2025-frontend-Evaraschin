import React from 'react';
import { Game } from '../data/games';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  results: Game[];
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onBack }) => {
  const navigate = useNavigate();

  // Cuando el usuario hace click en el logo, limpiar resultados
  React.useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      // Solo limpiar si el click es en el logo principal
      const target = e.target as HTMLElement;
      if (target.closest('a.flex.items-center')) {
        onBack();
      }
    };
    document.addEventListener('click', handleLogoClick);
    return () => document.removeEventListener('click', handleLogoClick);
  }, [onBack]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className="text-gray-400 mb-4">${game.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchResults;
