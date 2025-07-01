import React, { useState, useEffect, useRef } from "react";
const imageUrl = import.meta.env.VITE_Image_URL;

const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const isEventPast = (endTime) => {
  return new Date(endTime) < new Date();
};

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const autoSlideInterval = 5000; // 5 seconds

  // Handle automatic sliding
  useEffect(() => {
    if (events.length <= 1) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [events.length]);

  // Smooth scroll to current card
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Handle touch events for sliding
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? events.length - 1 : prevIndex - 1
      );
    }
  };

  if (!events || events.length === 0) {
    return <div className="text-center text-gray-600"></div>;
  }

  return (
    <div
      ref={carouselRef}
      className="flex overflow-x-hidden snap-x snap-mandatory touch-pan-x"
      style={{ scrollBehavior: "smooth" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {events.map((event) => (
        <div key={event._id} className="flex-shrink-0 w-full snap-center">
          <div className="max-w-lg p-6 mx-auto transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-xl">
            {event.bannerImage && (
              <img
                src={`${imageUrl}/${event.bannerImage}`}
                alt={event.title}
                className="object-cover w-full h-48 mb-4 rounded-t-xl"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {event.description || "No description available"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {formatDateTime(event.startTime)} -{" "}
              {formatDateTime(event.endTime)}
              {isEventPast(event.endTime) && (
                <span className="ml-2 text-red-500">(Past Event)</span>
              )}
            </p>
            {event.location && (
              <p className="mt-1 text-sm text-gray-600">{event.location}</p>
            )}
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-600 underline hover:text-indigo-800"
              >
                Read More
              </a>
            )}
            {!event.isApproved && (
              <p className="mt-2 text-sm text-yellow-600">Pending Approval</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCarousel;
