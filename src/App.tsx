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
import CallOfDutyBO6Page from './components/CallOfDutyBO6Page';
import RedDeadRedemption2Page from './components/RedDeadRedemption2Page';
import GrandTheftAutoVPage from './components/GrandTheftAutoVPage';
import FIFA25Page from './components/FIFA25Page';
import Cyberpunk2077Page from './components/Cyberpunk2077Page';
import TheLastOfUsPartIIPage from './components/TheLastOfUsPartIIPage';
import EldenRingPage from './components/EldenRingPage';
import AssassinsCreedValhallaPage from './components/AssassinsCreedValhallaPage';
import ResidentEvil4RemakePage from './components/ResidentEvil4RemakePage';
import GodOfWarRagnarokPage from './components/GodOfWarRagnarokPage';

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
                  <Route path="/call-of-duty-black-ops-6" element={<CallOfDutyBO6Page />} />
                  <Route path="/red-dead-redemption-2" element={<RedDeadRedemption2Page />} />
                  <Route path="/grand-theft-auto-v" element={<GrandTheftAutoVPage />} />
                  <Route path="/fifa-25" element={<FIFA25Page />} />
                  <Route path="/cyberpunk-2077" element={<Cyberpunk2077Page />} />
                  <Route path="/the-last-of-us-part-ii" element={<TheLastOfUsPartIIPage />} />
                  <Route path="/elden-ring" element={<EldenRingPage />} />
                  <Route path="/assassins-creed-valhalla" element={<AssassinsCreedValhallaPage />} />
                  <Route path="/resident-evil-4-remake" element={<ResidentEvil4RemakePage />} />
                  <Route path="/god-of-war-ragnarok" element={<GodOfWarRagnarokPage />} />
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