import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of users trust Bizvility to find the best local businesses
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -left-8 -top-8">
              <Quote className="w-16 h-16 text-blue-200 rotate-180" />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <blockquote className={`text-center transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-xl md:text-2xl text-gray-800 font-medium italic mb-6">
                  "{testimonialsData[currentIndex].quote}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <img
                      src={testimonialsData[currentIndex].avatar}
                      alt={testimonialsData[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonialsData[currentIndex].name}</div>
                    <div className="text-gray-600 text-sm">{testimonialsData[currentIndex].location}</div>
                    <div className="text-blue-600 text-sm mt-1">{testimonialsData[currentIndex].businessType} Customer</div>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === i ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(i);
                    }
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
