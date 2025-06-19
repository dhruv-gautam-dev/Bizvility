// models/Business.js
import mongoose from 'mongoose';

// const mongoose = require('mongoose');
function arrayLimit(val) {
  return val.length <= 10;
}


const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: String,
   // ✅ ADD THIS
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // ensures every listing is tied to a user
  },
  location: {
    address: String,
    pincode: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phone: { type: Number, required: true },
  website: String,
  email: {
    type: String,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String
  },
  // businessHours: {
  // monday: {
  //   open: String,
  //   close: String,
  //   isOpen24Hours: { type: Boolean, default: false }
  // },
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
    // ...repeat for other days
  },
   profileImage: { type: String }, // single file path or URL
   coverImage: { type: String }, // single file path or URL

  certificateImages: [{
    type: String // store paths or URLs to certificates
  }],

 galleryImages: {
  type: [String],
  validate: {
    validator: function (val) {
      return val.length <= 10;
    },
    message: 'galleryImages exceeds the limit of 10'
  }
},

  category: { type: String, required: true }, // e.g., 'health-medical'
  categoryRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'categoryModel'
  },
  categoryModel: { type: String, required: true } // e.g., 'HealthMedical'
});

const Business = mongoose.model('Business', businessSchema);
export default Business;
