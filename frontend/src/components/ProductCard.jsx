import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link
      to={`/designer?product=${product.id}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 truncate group-hover:text-orange-600">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
