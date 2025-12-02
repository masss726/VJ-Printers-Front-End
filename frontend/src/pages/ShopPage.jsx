import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [cart, setCart] = useState([]);

  const categories = ['all', 'mugs', 'tshirts', 'phone-cases', 'frames', 'apparel', 'home', 'tech'];

  const products = [
    // Mugs
    { id: 1, name: 'Personalized Photo Mug', category: 'Photo Mugs', icon: '☕', price: 299, originalPrice: 399, discount: 25, reviews: 1250, prime: true, primeShip: true },
    { id: 2, name: 'Ceramic Mug with Text', category: 'Photo Mugs', icon: '☕', price: 249, originalPrice: 349, discount: 28, reviews: 890, prime: true, primeShip: true },
    { id: 3, name: 'Custom Design Mug', category: 'Photo Mugs', icon: '☕', price: 199, reviews: 450, prime: false },
    { id: 4, name: 'Premium Marble Mug', category: 'Photo Mugs', icon: '☕', price: 399, originalPrice: 499, discount: 20, reviews: 320 },

    // T-Shirts
    { id: 5, name: 'Custom Print T-Shirt', category: 'T-Shirts', icon: '👕', price: 399, originalPrice: 599, discount: 33, reviews: 2100, prime: true, primeShip: true },
    { id: 6, name: 'Photo T-Shirt Unisex', category: 'T-Shirts', icon: '👕', price: 349, originalPrice: 499, discount: 30, reviews: 1680, prime: true, primeShip: true },
    { id: 7, name: 'Cotton Blend T-Shirt', category: 'T-Shirts', icon: '👕', price: 299, reviews: 890 },
    { id: 8, name: 'Premium Fit T-Shirt', category: 'T-Shirts', icon: '👕', price: 449, originalPrice: 649, discount: 30, reviews: 560 },

    // Phone Cases
    { id: 9, name: 'Custom Phone Case', category: 'Phone Cases', icon: '📱', price: 399, originalPrice: 599, discount: 33, reviews: 1890, prime: true, primeShip: true },
    { id: 10, name: 'Protective Photo Case', category: 'Phone Cases', icon: '📱', price: 299, originalPrice: 449, discount: 33, reviews: 1240, prime: true, primeShip: true },
    { id: 11, name: 'Slim Design Case', category: 'Phone Cases', icon: '📱', price: 249, reviews: 670 },
    { id: 12, name: 'Heavy Duty Case', category: 'Phone Cases', icon: '📱', price: 449, originalPrice: 599, discount: 25, reviews: 420 },

    // Photo Frames
    { id: 13, name: 'Wooden Photo Frame', category: 'Photo Frames', icon: '🖼️', price: 349, originalPrice: 499, discount: 30, reviews: 890, prime: true },
    { id: 14, name: 'Glass Photo Frame', category: 'Photo Frames', icon: '🖼️', price: 399, originalPrice: 549, discount: 27, reviews: 650 },
    { id: 15, name: 'Metal Frame Set', category: 'Photo Frames', icon: '🖼️', price: 299, reviews: 420 },
    { id: 16, name: 'Premium Canvas Frame', category: 'Photo Frames', icon: '🖼️', price: 549, originalPrice: 799, discount: 31, reviews: 280 },

    // Apparel
    { id: 17, name: 'Custom Hoodie', category: 'Apparel', icon: '🧥', price: 699, originalPrice: 999, discount: 30, reviews: 890, prime: true },
    { id: 18, name: 'Cozy Sweatshirt', category: 'Apparel', icon: '🧥', price: 549, originalPrice: 799, discount: 31, reviews: 560 },
    { id: 19, name: 'Casual Shirt', category: 'Apparel', icon: '🧥', price: 449, reviews: 340 },
    { id: 20, name: 'Premium Jacket', category: 'Apparel', icon: '🧥', price: 999, originalPrice: 1299, discount: 23, reviews: 210 },

    // Home Decor
    { id: 21, name: 'Custom Pillow', category: 'Home Decor', icon: '🏠', price: 449, originalPrice: 599, discount: 25, reviews: 1230, prime: true },
    { id: 22, name: 'Photo Blanket', category: 'Home Decor', icon: '🏠', price: 699, originalPrice: 999, discount: 30, reviews: 890 },
    { id: 23, name: 'Wall Art Canvas', category: 'Home Decor', icon: '🏠', price: 399, reviews: 560 },
    { id: 24, name: 'Decorative Throw', category: 'Home Decor', icon: '🏠', price: 349, originalPrice: 499, discount: 30, reviews: 430 },

    // Tech
    { id: 25, name: 'Custom Mouse Pad', category: 'Tech Accessories', icon: '⌨️', price: 149, originalPrice: 249, discount: 40, reviews: 2100, prime: true, primeShip: true },
    { id: 26, name: 'Photo Desk Mat', category: 'Tech Accessories', icon: '⌨️', price: 199, originalPrice: 299, discount: 33, reviews: 1450, prime: true },
    { id: 27, name: 'USB Cable Organizer', category: 'Tech Accessories', icon: '⌨️', price: 99, reviews: 890 },
    { id: 28, name: 'Keyboard Wrist Rest', category: 'Tech Accessories', icon: '⌨️', price: 349, originalPrice: 499, discount: 30, reviews: 340 },
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.reviews - a.reviews;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3 max-w-7xl mx-auto">
        <div className="text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Home</a> / 
          <span className="ml-2">All Products</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-5 gap-8">
        {/* Sidebar - Filters */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 space-y-6">
            <h2 className="font-bold text-lg text-gray-900">🔍 Filters</h2>

            {/* Category Filter */}
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{cat === 'all' ? 'All Products' : cat.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Prime Filter */}
            <div className="border-b pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm font-semibold">⚡ Prime Members</span>
              </label>
            </div>

            {/* Ratings Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Customer Ratings</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-4">
          {/* Sort & View Options */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
            <div className="text-gray-700 font-semibold">
              📊 {sortedProducts.length} Results
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-300 rounded px-4 py-2 focus:border-blue-500 outline-none"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-2xl text-gray-500 mb-4">😢 No products found</p>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {sortedProducts.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <button className="px-4 py-2 border rounded hover:bg-gray-100">← Previous</button>
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded ${page === 1 ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border rounded hover:bg-gray-100">Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
