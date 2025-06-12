import React, { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { featuredListingsData } from '../../data/FeaturedListings';

function FeaturedListings() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(featuredListingsData.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredListingsData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredListingsData.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleListings = featuredListingsData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Businesses</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our hand-picked selection of top-rated businesses across popular categories
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous listings"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next listings"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleListings.map((listing) => (
            <div 
              key={listing.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <img 
                  src={listing.image} 
                  alt={listing.name} 
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {listing.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(listing.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{listing.rating} ({listing.reviewCount} reviews)</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.name}</h3>

                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-600 text-sm">{listing.address}</p>
                </div>

                <p className="text-gray-700 mb-4">{listing.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={listing.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Business <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex / itemsPerPage === i ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(i * itemsPerPage)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedListings;
