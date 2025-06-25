import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { useParams } from "react-router-dom";

const ReviewForm = ({ businessId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  // const { businessId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!rating || !review) {
      alert("Please add a rating and a review before submitting.");
      return;
    }

    const formData = new FormData();

    const body = JSON.stringify({
      rating,
      comment: review,
    });
    console.log(rating);
    console.log(review);
    console.log(businessId);

    console.log(formData);

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${businessId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass the token here
          },
          body: body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);
      alert("Thank you for your review!");

      // Optional: Reset form
      setRating(0);
      setReview("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        error.message || "Something went wrong while submitting the review."
      );
    }
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
          rows={1}
          placeholder="Share your experience..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Image Upload */}
        {/* <div className="mb-4">
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
        </div> */}

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
