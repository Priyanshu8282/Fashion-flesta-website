import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-rose-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fashion Flesta</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop destination for premium girls and women clothing. Dress your vibe!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-rose-500 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-rose-500 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-rose-500 text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-rose-500 text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-rose-500 text-sm">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-rose-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-600 text-sm mb-2">
              Email: support@fashionflesta.com
            </p>
            <p className="text-gray-600 text-sm">
              Phone: +91 98765 43210
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-rose-200 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Fashion Flesta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
