"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import categoryService, { Category } from "@/services/category.service";
import { getImageUrl } from "@/services/index";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  link: string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback categories (manual data)
  const fallbackCategories: CategoryProps[] = [
    {
      id: "1",
      name: "Dresses",
      image: "/category-dresses.png",
      link: "/categories/dresses",
    },
    {
      id: "2",
      name: "Designer Tops",
      image: "/category-tops.png",
      link: "/categories/tops",
    },
    {
      id: "3",
      name: "Ethnic Wear",
      image: "/category-ethnic.png",
      link: "/categories/ethnic",
    },
    {
      id: "4",
      name: "Western Wear",
      image: "/category-western.png",
      link: "/categories/western",
    },
    {
      id: "5",
      name: "Accessories",
      image: "/category-accessories.png",
      link: "/categories/accessories",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiCategories = await categoryService.getAllCategories();
        
        // Map API categories to CategoryProps format
        if (apiCategories && apiCategories.length > 0) {
          const mappedCategories: CategoryProps[] = apiCategories.map((category: Category) => ({
            id: category._id,
            name: category.name,
            image: getImageUrl(category.image), // Convert API image path to full URL
            link: `/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
          }));
          setCategories(mappedCategories);
        } else {
          // Use fallback if no categories from API
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Failed to load categories from API, using fallback:", error);
        // Use fallback categories on error
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="text-gray-600">Loading categories...</div>
      </div>
    );
  }

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
