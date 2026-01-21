"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  return (
    <div className="category-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link href={category.link} className="group text-center block">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-rose-500 transition-colors">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .category-slider .swiper-button-next,
        .category-slider .swiper-button-prev {
          color: #ec4899;
        }
        
        .category-slider .swiper-pagination-bullet-active {
          background-color: #ec4899;
        }
        
        .category-slider .swiper-button-next:after,
        .category-slider .swiper-button-prev:after {
          font-size: 24px;
        }
        
        /* Hide navigation arrows and pagination on mobile */
        @media (max-width: 767px) {
          .category-slider .swiper-button-next,
          .category-slider .swiper-button-prev,
          .category-slider .swiper-pagination {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
