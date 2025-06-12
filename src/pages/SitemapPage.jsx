import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'Locations', path: '/locations' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Business Categories',
      links: [
        { name: 'Restaurants & Food', path: '/categories/restaurants' },
        { name: 'Shopping & Retail', path: '/categories/shopping' },
        { name: 'Health & Medical', path: '/categories/health' },
        { name: 'Home Services', path: '/categories/home-services' },
        { name: 'Automotive', path: '/categories/automotive' },
        { name: 'Professional Services', path: '/categories/professional' },
        { name: 'Beauty & Spa', path: '/categories/beauty' },
        { name: 'Fitness & Wellness', path: '/categories/fitness' }
      ]
    },
    {
      title: 'Support & Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Support Center', path: '/support' },
        { name: 'FAQs', path: '/support#faqs' },
        { name: 'Business Resources', path: '/resources' },
        { name: 'Help Center', path: '/help' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Partners', path: '/partners' },
        { name: 'Press', path: '/press' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl text-blue-100">Find everything on our site</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you navigate our website and find exactly what you need.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;