import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import DesignerPage from './pages/DesignerPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import MembershipPage from './pages/MembershipPage.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you would navigate to a search results page
      console.log(`Searching for: ${searchQuery}`);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="app min-h-screen flex flex-col">
      {/* Header - Amazon's dark navy bar */}
      <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-white hover:text-gray-200 transition flex-shrink-0">
            <span className="text-3xl text-yellow-400">🎁</span>
            <span>VJ Printers</span>
          </Link>

          {/* Search Bar - Hidden on mobile, prominent on desktop */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search custom gifts, mugs, t-shirts..." 
                className="flex-1 px-4 py-2 text-gray-900 outline-none rounded-l-md focus:ring-2 focus:ring-yellow-500"
              />
              {/* Amazon's distinctive yellow button */}
              <button type="submit" className="px-5 py-2 bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition rounded-r-md">
                🔍
              </button>
            </form>
          </div>

          {/* Navigation & Cart */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-semibold">
            {/* Links styled with subtle hover effects */}
            <Link to="/shop" className="hover:text-yellow-400 transition">
              Shop
            </Link>
            <Link to="/designer" className="hover:text-yellow-400 transition">
              Designer
            </Link>
            <Link to="/membership" className="hover:text-yellow-400 transition">
              Prime
            </Link>
            <Link to="/checkout" className="flex items-center gap-1 hover:text-yellow-400 transition relative p-2 rounded hover:bg-gray-800">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 p-4 space-y-2">
            <form onSubmit={handleSearchSubmit} className="flex mb-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="flex-1 px-4 py-2 text-gray-900 outline-none rounded-l-md"
              />
              <button type="submit" className="px-4 bg-yellow-400 text-gray-900 rounded-r-md">🔍</button>
            </form>
            <Link to="/shop" className="block py-2 hover:bg-gray-700 px-2 rounded transition">🛍️ Shop</Link>
            <Link to="/designer" className="block py-2 hover:bg-gray-700 px-2 rounded transition">🎨 Designer</Link>
            <Link to="/membership" className="block py-2 hover:bg-gray-700 px-2 rounded transition">👑 Prime</Link>
            <Link to="/checkout" className="block py-2 hover:bg-gray-700 px-2 rounded transition">🛒 Cart</Link>
          </div>
        )}
      </header>

      {/* Main Content Area - Light Gray background for a clean marketplace feel */}
      <main className="app-main flex-grow bg-gray-1000">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/designer" element={<DesignerPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {/* Footer - Multi-level Amazon style footer */}
      <footer className="bg-gray-900 text-white">
        {/* Back to top bar */}
        <div className="bg-gray-700 hover:bg-gray-600 text-center py-4 cursor-pointer transition">
            <a href="#top" className="text-sm font-medium">Back to top</a>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-yellow-400">VJ Printers</h3>
            <p className="text-gray-400 text-sm">Creating personalized gifts with quality. Same-day delivery available!</p>
            <div className="mt-4 flex gap-3 text-lg">
              {/* Links are placeholders */}
              <a href="#" className="hover:text-yellow-400 transition">f</a>
              <a href="#" className="hover:text-yellow-400 transition">🐦</a>
              <a href="#" className="hover:text-yellow-400 transition">📷</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">About VJ Printers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Careers</Link></li>
              <li><a href="#" className="hover:text-white transition">Press Releases</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Sell on VJ Printers</a></li>
              <li><a href="#" className="hover:text-white transition">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-white transition">Advertise Your Products</a></li>
              <li><a href="#" className="hover:text-white transition">Self-Publish with Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ & Help</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Replacements</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-0 pt-8 pb-4 text-center bg-gray-800">
          <p className="text-gray-400 text-sm">&copy; 2025 VJ Printers. All rights reserved.</p>
          <p className="mt-2 text-gray-500 text-xs">A marketplace experience for personalized gifts.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;


