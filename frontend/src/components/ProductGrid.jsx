import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

// Mock data for products. In a real app, this would come from an API.
const MOCK_PRODUCTS = {
  mugs: [
    { id: 'mug-classic', name: 'Classic White Mug', price: 15.99, rating: 4.5, imageUrl: 'https://i.etsystatic.com/44223983/r/il/a91157/5049388326/il_794xN.5049388326_8390.jpg' },
    { id: 'mug-black', name: 'Matte Black Mug', price: 17.99, rating: 4.8, imageUrl: 'https://i.etsystatic.com/18367398/r/il/b6459e/3483220811/il_794xN.3483220811_g22r.jpg' },
    { id: 'mug-magic', name: 'Magic Color-Changing Mug', price: 22.5, rating: 4.9, imageUrl: 'https://i.etsystatic.com/23383926/r/il/17325b/3186811033/il_794xN.3186811033_h55n.jpg' },
    { id: 'mug-travel', name: 'Insulated Travel Mug', price: 25.0, rating: 4.7, imageUrl: 'https://i.etsystatic.com/34342458/r/il/851443/4789350395/il_794xN.4789350395_f61i.jpg' },
    { id: 'mug-enamel', name: 'Vintage Enamel Camp Mug', price: 19.5, rating: 4.6, imageUrl: 'https://i.etsystatic.com/13611039/r/il/b4f743/4790139823/il_794xN.4790139823_t17w.jpg' },
  ],
  tshirts: [
    { id: 'tshirt-white', name: 'Basic Cotton Tee', price: 19.99, rating: 4.6, imageUrl: 'https://www.pngall.com/wp-content/uploads/2016/04/T-Shirt-PNG-Image.png' },
    { id: 'tshirt-black', name: 'Premium V-Neck Tee', price: 24.99, rating: 4.8, imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-black-t-shirtclothingblack-t-shirtfashion-dress-shirt-black-cloth-tshirt-6315223268846vrv6.png' },
    { id: 'tshirt-red', name: 'Performance Sport Tee', price: 29.99, rating: 4.7, imageUrl: 'https://pluspng.com/img-png/t-shirt-png-red-t-shirt-png-image-2000.png' },
    { id: 'tshirt-blue', name: 'Heather Blue Crewneck', price: 22.0, rating: 4.5, imageUrl: 'https://www.seekpng.com/png/full/15-151843_blank-t-shirt-png-blue-plain-t-shirt.png' },
  ],
  'mobile-cases': [
    { id: 'case-clear', name: 'Crystal Clear Case', price: 14.99, rating: 4.5, imageUrl: 'https://i.etsystatic.com/24653315/r/il/a75142/5482302324/il_794xN.5482302324_b32j.jpg' },
    { id: 'case-leather', name: 'Vegan Leather Wallet Case', price: 29.99, rating: 4.8, imageUrl: 'https://i.etsystatic.com/21935758/r/il/b99457/4981944338/il_794xN.4981944338_m71i.jpg' },
    { id: 'case-tough', name: 'Tough Armor Protective Case', price: 24.99, rating: 4.9, imageUrl: 'https://i.etsystatic.com/24653315/r/il/928869/5530268573/il_794xN.5530268573_k1cf.jpg' },
    { id: 'case-eco', name: 'Eco-Friendly Compostable Case', price: 26.5, rating: 4.7, imageUrl: 'https://i.etsystatic.com/21935758/r/il/9547fb/3709587178/il_794xN.3709587178_cv6p.jpg' },
  ],
  // Add other categories as needed
};

// Mock category details
const CATEGORY_DETAILS = {
  mugs: { label: 'Photo Mugs', icon: '☕' },
  tshirts: { label: 'T-Shirts', icon: '👕' },
  'mobile-cases': { label: 'Mobile Cases', icon: '📱' },
  default: { label: 'Products', icon: '✨' },
};

function ProductGrid() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'mugs';

  const [sortOrder, setSortOrder] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(50);
  const [minRating, setMinRating] = useState(0);

  const categoryInfo = CATEGORY_DETAILS[category] || CATEGORY_DETAILS.default;
  const baseProducts = MOCK_PRODUCTS[category] || [];

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...baseProducts];

    // Filter by price and rating
    products = products.filter(p => p.price <= maxPrice && p.rating >= minRating);

    // Sort products
    switch (sortOrder) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        break;
    }

    return products;
  }, [baseProducts, sortOrder, maxPrice, minRating]);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {categoryInfo.icon} {categoryInfo.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Choose Your {categoryInfo.label}
          </h2>
          <p className="text-lg text-gray-600">Select a product to start designing</p>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Price Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="price-filter" className="font-medium text-sm text-gray-700">Price:</label>
            <input
              type="range"
              id="price-filter"
              min="10"
              max="50"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm font-semibold text-gray-800">₹{maxPrice}</span>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="font-medium text-sm text-gray-700">Rating:</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setMinRating(star)} className={`text-2xl ${minRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="sort-order" className="font-medium text-sm text-gray-700">Sort by:</label>
            <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border-gray-300 rounded-md shadow-sm text-sm">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-4">No products match your filters. Try adjusting them.</p>
            <Link
              to="/"
              className="inline-block bg-[#FF6B35] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-lg transition"
            >
              ← Back to Categories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;