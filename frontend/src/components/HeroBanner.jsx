import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const bannerImages = [
  {
    id: 1,
    url: 'https://i.pinimg.com/1200x/5e/91/10/5e91108587d643476395b1ffb7bac43f.jpg',
    alt: 'Custom Mugs Banner',
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/736x/3f/2e/5b/3f2e5b977c1b934d3a7ce905a226940e.jpg',
    alt: 'Custom T-Shirts Banner',
  },
  {
    id: 3,
    url: 'https://i.pinimg.com/736x/28/54/39/285439a7fbc9f7d1e6a7a7a278e86c87.jpg',
    alt: 'Custom Phone Cases Banner',
  },
];

function HeroBanner() {
  return (
    <div className="relative w-full border-4 border-secondary rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {bannerImages.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.url} alt={image.alt} className="w-full h-[30rem] object-cover object-top" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h2 className="text-accent text-6xl font-lobster font-bold text-center drop-shadow-lg">
          Your Perfect Gift, Personalized! ✨
        </h2>
      </div>
    </div>
  );
}

export default HeroBanner;