import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.jsx';

function HomePage() {
  const [currentBg, setCurrentBg] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 5 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    { icon: '⚡', title: 'Same Day Delivery', desc: 'Available in selected cities' },
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹499' },
    { icon: '✨', title: '100% Satisfaction', desc: 'Guaranteed or your money back' },
  ];

  const deals = [
    {
      id: 1,
      name: 'Photo Mugs',
      discount: '50% OFF',
      image: 'https://i.pinimg.com/1200x/5e/91/10/5e91108587d643476395b1ffb7bac43f.jpg',
    },
    {
      id: 2,
      name: 'T-Shirts',
      discount: '40% OFF',
      image: 'https://i.pinimg.com/736x/3f/2e/5b/3f2e5b977c1b934d3a7ce905a226940e.jpg',
    },
    {
      id: 3,
      name: 'Phone Cases',
      discount: '60% OFF',
      image: 'https://i.pinimg.com/736x/28/54/39/285439a7fbc9f7d1e6a7a7a278e86c87.jpg',
    },
    {
      id: 4,
      name: 'Photo Frames',
      discount: '45% OFF',
      image:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Key Chains',
      discount: '60% OFF',
      image: 'https://i.pinimg.com/1200x/8f/b2/79/8fb279340c70d41b173002f2528b91c3.jpg',
    },
    {
      id: 6,
      name: 'Water Bottles',
      discount: '60% OFF',
      image: 'https://i.pinimg.com/1200x/ed/e2/c6/ede2c654df79d6302a33ca95118e32a7.jpg',
    },
    {
      id: 7,
      name: 'Jewellery',
      discount: '60% OFF',
      image: 'https://i.pinimg.com/1200x/7c/2c/c2/7c2cc2d46f49b1b536c69b7b42c69539.jpg',
    },
    {
      id: 8,
      name: 'Bags',
      discount: '60% OFF',
      image: 'https://i.pinimg.com/1200x/ed/e2/63/ede26302fca98c9271df69f2dce03ce0.jpg',
    },
  ];

  const features = [
    { icon: '📦', title: 'Express Delivery', desc: 'Same day & next day delivery available' },
    { icon: '🎨', title: 'Easy Customization', desc: 'Simple designer tool for everyone' },
    { icon: '🛡️', title: 'Quality Assured', desc: 'Premium products with best printing' },
    { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing with regular offers' },
  ];

  const stats = [
    { number: '10 Lakh+', label: 'Happy Customers' },
    { number: '25 Lakh+', label: 'Products Delivered' },
    { number: '2 Lakh+', label: 'Customized Orders' },
    { number: '1000+', label: '5-Star Ratings' },
  ];

  const bestsellers = [
    {
      id: 1,
      name: 'Photo Mugs',
      price: '₹199',
      icon: '☕',
      image: 'https://i.pinimg.com/1200x/5e/91/10/5e91108587d643476395b1ffb7bac43f.jpg',
    },
    {
      id: 2,
      name: 'T-Shirts',
      price: '₹299',
      icon: '👕',
      image: 'https://i.pinimg.com/736x/3f/2e/5b/3f2e5b977c1b934d3a7ce905a226940e.jpg',
    },
    {
      id: 3,
      name: 'Phone Cases',
      price: '₹199',
      icon: '📱',
      image: 'https://i.pinimg.com/736x/28/54/39/285439a7fbc9f7d1e6a7a7a278e86c87.jpg',
    },
    {
      id: 4,
      name: 'Photo Frames',
      price: '₹249',
      icon: '🖼️',
      image:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Keychains',
      price: '₹99',
      icon: '🔑',
      image: 'https://i.pinimg.com/1200x/8f/b2/79/8fb279340c70d41b173002f2528b91c3.jpg',
    },
    {
      id: 6,
      name: 'Pillows',
      price: '₹349',
      icon: '🛏️',
      image: 'https://i.pinimg.com/1200x/ed/e2/c6/ede2c654df79d6302a33ca95118e32a7.jpg',
    },
    {
      id: 7,
      name: 'Stickers',
      price: '₹49',
      icon: '🎯',
      image: 'https://i.pinimg.com/1200x/7c/2c/c2/7c2cc2d46f49b1b536c69b7b42c69539.jpg',
    },
    {
      id: 8,
      name: 'Canvas Prints',
      price: '₹499',
      icon: '🖼️',
      image: 'https://i.pinimg.com/1200x/ed/e2/63/ede26302fca98c9271df69f2dce03ce0.jpg',
    },
  ];

  return (
    <>
      {/* This adds the sliding hero banner to the top of your page */}
      <HeroBanner />

      {/* Deals / Categories Section */}
      <section className="py-6 md:py-8 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-5 md:mb-6">
            <span className="inline-block bg-red-100 text-red-600 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-tight">
              🎁 Categories
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-1 text-gray-600 text-xs sm:text-sm">
              Explore our most popular personalized products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {deals.map((deal) => (
              <Link
                key={deal.id}
                to={`/shop?category=${encodeURIComponent(deal.name)}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <div className="rounded-2xl overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>

                <div className="px-2.5 pb-2.5 pt-2">
                  <h2 className="font-semibold text-gray-900 text-xs sm:text-sm tracking-tight">
                    {deal.name}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-rose-600 font-semibold">
                    {deal.discount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-6 md:py-8 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-5 md:mb-6">
            <span className="inline-block bg-orange-100 text-orange-600 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-tight">
              🔥 Best Sellers
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Most Loved Gifts
            </h2>
            <p className="mt-1 text-gray-600 text-xs sm:text-sm">
              Handpicked best selling personalized products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                to="/designer"
                className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <div className="rounded-2xl overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>

                <div className="px-2.5 pb-3 pt-2">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm tracking-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-[#FF6B35] mb-2">
                    {product.price}
                  </p>
                  <button className="w-full bg-[#004E89] text-white py-1.5 rounded-full font-semibold hover:bg-[#003366] transition text-[11px] sm:text-xs">
                    View
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-6 md:py-8 bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-5 md:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-1">
              Why Choose VJ Printers?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              We are the perfect choice for personalized gifts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 tracking-tight mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-white py-6 md:py-8 font-sans">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Ready to Create Your Gift?
          </h2>
          <p className="text-xs sm:text-sm mb-4 opacity-90">
            Join thousands of happy customers who have created beautiful personalized gifts
          </p>
          <Link
            to="/designer"
            className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition transform hover:scale-105 text-sm sm:text-base"
          >
            🎨 Design Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
