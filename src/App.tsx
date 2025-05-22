import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeaturedGames from './components/FeaturedGames';
import GameGrid from './components/GameGrid';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import WishList from './pages/WishList';
import { AuthPage } from './pages/AuthPage';
import { CartProvider } from './context/CartContext';
import { WishListProvider } from './context/WishListContext';
import { AuthProvider } from './context/AuthContext';
import { SearchBar } from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { Game } from './data/games';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[] | null>(null);
  const [searchBarKey, setSearchBarKey] = useState(0); // Para forzar el reset

  const handleSearchResults = (results: Game[]) => {
    setSearchResults(results);
  };

  const handleBackFromResults = () => {
    setSearchResults(null);
    setSearchBarKey(prev => prev + 1); // Cambia la key para resetear SearchBar
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishListProvider>
          <Router>
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar onCartClick={() => setIsCartOpen(true)} onSearchResults={handleSearchResults} searchBarKey={searchBarKey} />
              {/* Mostrar resultados y ocultar el resto si hay resultados de búsqueda */}
              {searchResults ? (
                <SearchResults results={searchResults} onBack={handleBackFromResults} />
              ) : (
                <Routes>
                  <Route path="/" element={
                    <main className="container mx-auto px-4 py-8">
                      <FeaturedGames />
                      <GameGrid />
                    </main>
                  } />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<WishList />} />
                </Routes>
              )}
              <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </Router>
        </WishListProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;