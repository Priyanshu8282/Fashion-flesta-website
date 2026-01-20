"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export default function HeroSlider() {
  const slides: HeroSlide[] = [
    {
      id: "1",
      title: "New Arrival",
      subtitle: "Spring Summer 2024",
      description: "Browse our latest collection that defines the vibe of the new season",
      image: "/hero-banner.png",
      primaryButtonText: "Shop the Collection",
      primaryButtonLink: "/new-arrivals",
      secondaryButtonText: "View Lookbook",
      secondaryButtonLink: "/categories",
    },
    {
      id: "2",
      title: "Trending Styles",
      subtitle: "Fashion Week 2024",
      description: "Discover the hottest trends straight from the runway",
      image: "/hero-banner.png",
      primaryButtonText: "Shop Trending",
      primaryButtonLink: "/trending",
      secondaryButtonText: "Explore More",
      secondaryButtonLink: "/categories",
    },
    {
      id: "3",
      title: "Exclusive Sale",
      subtitle: "Up to 50% Off",
      description: "Limited time offer on selected items - Don't miss out!",
      image: "/hero-banner.png",
      primaryButtonText: "Shop Sale",
      primaryButtonLink: "/categories",
      secondaryButtonText: "View All Deals",
      secondaryButtonLink: "/new-arrivals",
    },
  ];

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover animate-ken-burns"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-3xl">
                  <p className="text-sm md:text-base tracking-widest mb-4 uppercase animate-fade-in-down">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay">
                    <Link
                      href={slide.primaryButtonLink}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
                    >
                      {slide.primaryButtonText}
                    </Link>
                    <Link
                      href={slide.secondaryButtonLink}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center border border-white border-opacity-50 transform hover:scale-105"
                    >
                      {slide.secondaryButtonText}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: white;
          background: rgba(236, 72, 153, 0.8);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .hero-slider .swiper-button-next:hover,
        .hero-slider .swiper-button-prev:hover {
          background: rgba(236, 72, 153, 1);
        }

        .hero-slider .swiper-button-next:after,
        .hero-slider .swiper-button-prev:after {
          font-size: 20px;
        }

        .hero-slider .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }

        .hero-slider .swiper-pagination-bullet-active {
          background: #ec4899;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
