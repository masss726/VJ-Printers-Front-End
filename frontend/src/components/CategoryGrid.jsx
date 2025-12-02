import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'mugs', label: 'Photo Mugs', description: 'Custom printed mugs for every mood', icon: '☕', color: 'from-orange-100 to-orange-200' },
  { id: 'tshirts', label: 'T-Shirts', description: 'Personalised tees for him & her', icon: '👕', color: 'from-blue-100 to-blue-200' },
  { id: 'frames', label: 'Photo Frames', description: 'Memories for your wall', icon: '🖼️', color: 'from-purple-100 to-purple-200' },
  { id: 'mobile-cases', label: 'Mobile Cases', description: 'Protective & stylish cases', icon: '📱', color: 'from-green-100 to-green-200' },
  { id: 'apparel', label: 'Apparel', description: 'Hoodies, sweatshirts & more', icon: '🧥', color: 'from-red-100 to-red-200' },
  { id: 'home', label: 'Home Decor', description: 'Cushions, blankets & throws', icon: '🏠', color: 'from-pink-100 to-pink-200' },
  { id: 'gifts', label: 'Gift Sets', description: 'Perfect combo packs', icon: '🎁', color: 'from-yellow-100 to-yellow-200' },
  { id: 'tech', label: 'Tech Accessories', description: 'Mouse pads, cables & more', icon: '⌨️', color: 'from-indigo-100 to-indigo-200' },
];

function CategoryGrid() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">🛍️ Shop</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-lg text-gray-600">Hundreds of products you can personalize</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`group bg-gradient-to-br ${cat.color} rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-orange-400`}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 transform group-hover:scale-125 transition">{cat.icon}</div>

              {/* Content */}
              <h3 className="font-bold text-lg text-gray-900 mb-1">{cat.label}</h3>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{cat.description}</p>

              {/* Button */}
              <button className="w-full bg-gray-900 hover:bg-black text-white text-sm font-semibold py-2 rounded transition">
                Design Now
              </button>
            </Link>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-[#FF6B35] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-lg transition transform hover:scale-105"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
