import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Review:", review);
    console.log("Image:", image);
    // Add API call or action here
  };

  return (
    <div className="w-full max-w-4xl py-6 mx-auto bg-white shadow-sm rounded-xl sm:px-6 md:px-8 sm:py-8 md:py-10">
      <form onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          <span className="mr-4 font-semibold text-gray-700">Your Rating:</span>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                  className="hidden"
                />
                <FaStar
                  className={`cursor-pointer text-2xl transition-colors duration-200 ${
                    starValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        {/* Review Text */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={5}
          placeholder="Share your experience..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
          />
          {image && <p className="mt-2 text-sm text-gray-600">{image.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
