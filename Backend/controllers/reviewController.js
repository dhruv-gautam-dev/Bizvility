import Review from '../models/Review.js';
import Business from '../models/Business.js';
import asyncHandler from '../utils/asyncHandler.js';
import { updateBusinessRating } from '../utils/calculateAverageRating.js';


// ⭐ Create Review
export const createReview = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { rating, comment } = req.body;


    console.log(businessId, rating, comment);
    console.log(req.body);

    // ✅ Optional: prevent empty reviews
    if (!rating && !comment) {
      return res.status(400).json({ message: 'Rating or comment is required' });
    }

    const review = new Review({
      user: req.user._id,
      business: businessId,
      rating: rating || undefined,
      comment: comment || ''
    });

    await review.save();

    // 🔁 Update average rating after new review
    await updateBusinessRating(businessId);

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// ✏️ Update Review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (!review.user.equals(req.user._id)) {
    return res.status(403).json({ message: 'You are not authorized' });
  }

  review.rating = rating;
  review.comment = comment;

  await review.save();

  // 🔁 Update ratings
  await updateBusinessRating(review.business);

  res.json({ message: 'Review updated', review });
};


// 🗑️ Delete Review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (!review.user.equals(req.user._id)) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const businessId = review.business;

 await Review.findByIdAndDelete(reviewId);


  // 🔁 Update ratings
  await updateBusinessRating(businessId);

  res.json({ message: 'Review deleted' });
};

// 📋 Get All Reviews for a Business
export const getBusinessReviews = asyncHandler(async (req, res) => {
  const { businessId } = req.params;

  // ✅ Validate input
  if (!businessId) {
    res.status(400);
    throw new Error('Business ID is required');
  }

  try {
    // ✅ Fetch all reviews for the business
    const reviews = await Review.find({ business: businessId })
      .populate('user', 'fullName profile.avatar') // Only necessary user fields
      .sort({ createdAt: -1 }); // Newest first

    // ✅ Respond
    res.status(200).json({
      status: 'success',
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(`❌ Failed to get reviews for business ${businessId}:`, error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch business reviews',
      error: error.message,
    });
  }
});

//get all reviews data
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'fullName profile.avatar')
      .populate('business', 'name');

    res.status(200).json({
      status: 'success',
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error('❌ Failed to fetch reviews:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch all reviews',
      error: error.message,
    });
  }
});