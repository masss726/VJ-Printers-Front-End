import React from 'react';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import BestSellers from './BestSellers';
// import WhyChooseUs from './WhyChooseUs';
// import CallToAction from './CallToAction';
// import Footer from './Footer';

function HomePage() {
  return (
    <div>
      {/* This is your sliding hero banner at the top */}
      <HeroBanner />
      {/* This is your category section */}
      <CategorySection />

      {/* This is your new Best Sellers section */}
      <BestSellers />
      {/* <WhyChooseUs /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;