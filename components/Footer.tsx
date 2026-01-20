import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rose-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fashion Flesta</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop destination for premium girls and women clothing. Dress your vibe!
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/new-arrivals" className="text-gray-600 hover:text-rose-500 text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-600 hover:text-rose-500 text-sm">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-rose-500 text-sm">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/dresses" className="text-gray-600 hover:text-rose-500 text-sm">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/categories/tops" className="text-gray-600 hover:text-rose-500 text-sm">
                  Designer Tops
                </Link>
              </li>
              <li>
                <Link href="/categories/ethnic" className="text-gray-600 hover:text-rose-500 text-sm">
                  Ethnic Wear
                </Link>
              </li>
              <li>
                <Link href="/categories/western" className="text-gray-600 hover:text-rose-500 text-sm">
                  Western Wear
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-gray-600 hover:text-rose-500 text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-rose-200 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Fashion Flesta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
