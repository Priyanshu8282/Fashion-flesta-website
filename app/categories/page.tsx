import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AllCategoriesPage() {
  // All categories with their products
  const categorySections = [
    {
      id: "dresses",
      name: "Dresses",
      description: "Elegant dresses for every occasion",
      image: "/category-dresses.png",
      link: "/categories/dresses",
      products: [
        {
          id: "1",
          name: "Vintage Silk Floral Dress",
          price: 1299,
          originalPrice: 2499,
          image: "/product-dress1.png",
          badge: "SALE",
        },
        {
          id: "11",
          name: "Floral Maxi Dress",
          price: 1799,
          originalPrice: 2999,
          image: "/product-maxi-dress.png",
          badge: "HOT",
        },
        {
          id: "6",
          name: "Pleated Midi Skirt",
          price: 999,
          originalPrice: 1699,
          image: "/product-skirt.png",
        },
        {
          id: "1b",
          name: "Vintage Silk Floral Dress",
          price: 1299,
          originalPrice: 2499,
          image: "/product-dress1.png",
        },
      ],
    },
    {
      id: "tops",
      name: "Designer Tops",
      description: "Premium tops and blouses",
      image: "/category-tops.png",
      link: "/categories/tops",
      products: [
        {
          id: "4",
          name: "Embroidered Organza Top",
          price: 1499,
          originalPrice: 2499,
          image: "/product-top.png",
          badge: "TRENDING",
        },
        {
          id: "2",
          name: "Cashmere Knit Sweater",
          price: 899,
          originalPrice: 1599,
          image: "/product-sweater.png",
          badge: "NEW",
        },
        {
          id: "12",
          name: "Silk Bow Blouse",
          price: 1099,
          originalPrice: 1899,
          image: "/product-blouse.png",
        },
        {
          id: "4b",
          name: "Designer Organza Top",
          price: 1499,
          originalPrice: 2499,
          image: "/product-top.png",
        },
      ],
    },
    {
      id: "ethnic",
      name: "Ethnic Wear",
      description: "Traditional elegance meets modern design",
      image: "/category-ethnic.png",
      link: "/categories/ethnic",
      products: [
        {
          id: "5",
          name: "Traditional Pink Kurti",
          price: 799,
          originalPrice: 1499,
          image: "/product-kurti.png",
          badge: "SALE",
        },
        {
          id: "13",
          name: "Mint Green Palazzo Pants",
          price: 899,
          originalPrice: 1599,
          image: "/product-palazzo.png",
        },
        {
          id: "4e",
          name: "Embroidered Top",
          price: 1499,
          originalPrice: 2499,
          image: "/product-top.png",
        },
        {
          id: "5b",
          name: "Floral Print Kurti",
          price: 799,
          originalPrice: 1499,
          image: "/product-kurti.png",
        },
      ],
    },
    {
      id: "western",
      name: "Western Wear",
      description: "Casual and trendy western outfits",
      image: "/category-western.png",
      link: "/categories/western",
      products: [
        {
          id: "10",
          name: "High-Waisted Denim Jeans",
          price: 1599,
          originalPrice: 2499,
          image: "/product-jeans.png",
        },
        {
          id: "7",
          name: "Linen Tailored Blazer",
          price: 2299,
          originalPrice: 3999,
          image: "/product-blazer.png",
        },
        {
          id: "3",
          name: "Elegant Linen Trousers",
          price: 1199,
          originalPrice: 1999,
          image: "/product-trousers.png",
        },
        {
          id: "10b",
          name: "Skinny Fit Jeans",
          price: 1599,
          originalPrice: 2499,
          image: "/product-jeans.png",
          badge: "HOT",
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Complete your look with our curated accessories",
      image: "/category-accessories.png",
      link: "/categories/accessories",
      products: [
        {
          id: "9",
          name: "Cozy Beige Cardigan",
          price: 1299,
          originalPrice: 2199,
          image: "/product-cardigan.png",
          badge: "NEW",
        },
        {
          id: "14",
          name: "Elegant Wool Coat",
          price: 3499,
          originalPrice: 5999,
          image: "/product-coat.png",
          badge: "SALE",
        },
        {
          id: "8",
          name: "Evening Black Jumpsuit",
          price: 1899,
          originalPrice: 2999,
          image: "/product-jumpsuit.png",
        },
        {
          id: "9b",
          name: "Knit Cardigan",
          price: 1299,
          originalPrice: 2199,
          image: "/product-cardigan.png",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Page Header with Banner Image */}
        <section className="relative bg-gradient-to-r from-rose-100 to-pink-100 py-12 md:py-16 overflow-hidden">
          {/* Background Banner Image */}
          <Image
            src="/categories-banner.png"
            alt="Shop by Category"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/80 to-pink-100/80" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Shop by Category
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our complete collection organized by style and occasion
              </p>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {categorySections.map((category, index) => (
          <section
            key={category.id}
            className={`py-12 ${
              index % 2 === 0 ? "bg-white" : "bg-rose-50"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                  {/* Category Icon */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                <Link
                  href={category.link}
                  className="flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors group"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
