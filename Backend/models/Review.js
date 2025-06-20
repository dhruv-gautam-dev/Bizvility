// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating:    { type: Number, required: true, min: 1, max: 5 },
  comment:   { type: String },
  business:  { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  reviewer:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
