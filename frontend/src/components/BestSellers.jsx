import React from 'react';

// Sample data for best-selling products
const bestSellers = [
  { id: 1, name: 'Photo Mugs', price: '₹199', imageUrl: 'https://via.placeholder.com/300x300/FFC107/000000?Text=Photo+Mug' },
  { id: 2, name: 'T-Shirts', price: '₹299', imageUrl: 'https://via.placeholder.com/300x300/3F51B5/FFFFFF?Text=T-Shirt' },
  { id: 3, name: 'Phone Cases', price: '₹199', imageUrl: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?Text=Phone+Case' },
  { id: 4, name: 'Photo Frames', price: '₹249', imageUrl: 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?Text=Photo+Frame' },
  { id: 5, name: 'Keychains', price: '₹99', imageUrl: 'https://via.placeholder.com/300x300/9C27B0/FFFFFF?Text=Keychain' },
  { id: 6, name: 'Pillows', price: '₹349', imageUrl: 'https://via.placeholder.com/300x300/FF9800/000000?Text=Pillow' },
  { id: 7, name: 'Stickers', price: '₹49', imageUrl: 'https://via.placeholder.com/300x300/607D8B/FFFFFF?Text=Stickers' },
  { id: 8, name: 'Canvas Prints', price: '₹499', imageUrl: 'https://via.placeholder.com/300x300/795548/FFFFFF?Text=Canvas' },
];

function BestSellers() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          <span role="img" aria-label="fire">🔥</span> Best Sellers
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Handpicked best selling personalized products
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="#"
                    className="bg-white text-black py-2 px-4 rounded-full font-semibold"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-800 font-bold mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;