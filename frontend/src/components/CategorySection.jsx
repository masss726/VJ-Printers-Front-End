import React from 'react';

// Sample data for categories. You can replace this with data from an API.
const categories = [
  {
    id: 1,
    name: 'Business Cards',
    imageUrl: 'https://via.placeholder.com/300x200/FFC107/000000?Text=Business+Cards',
    alt: 'A stack of business cards',
  },
  {
    id: 2,
    name: 'Flyers & Brochures',
    imageUrl: 'https://via.placeholder.com/300x200/3F51B5/FFFFFF?Text=Flyers',
    alt: 'A folded brochure',
  },
  {
    id: 3,
    name: 'Banners & Posters',
    imageUrl: 'https://via.placeholder.com/300x200/E91E63/FFFFFF?Text=Banners',
    alt: 'A large format banner',
  },
  {
    id: 4,
    name: 'Custom Mugs',
    imageUrl: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?Text=Mugs',
    alt: 'A custom printed mug',
  },
];

function CategorySection() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
        <p className="text-center text-gray-500 mb-10">Explore our most popular personalized products</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="text-center">
              <a href="#" className="group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={category.imageUrl}
                    alt={category.alt}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;