import mongoose from 'mongoose';

const beautySpaSchema = new mongoose.Schema({
  typeOfBusiness: {
    type: String,
    enum: [
      'Unisex Salon',
      'Ladies Only',
      'Gents Only',
      'Spa',
      'Beauty Parlour'
    ],
    required: true
  },

  establishedYear: { type: Date },
  businessCategory: {
    type: String,
    enum: ['Salon', 'Spa', 'Parlour', 'Bridal Studio', 'Hair Clinic']
  },

  whatsappNumber: String,
  alternateContactNumber: String,

  // Working Hours – businessHours comes from Business.js

  appointmentBased: Boolean,
  homeServiceAvailable: Boolean,

  // Services Offered (multi-select checklist)
  servicesOffered: {
    hairServices: [String],           // e.g., ['Cut', 'Color', 'Keratin']
    skinTreatments: [String],
    spaServices: [String],
    makeupServices: [String],         // Bridal / Party Makeup
    nailServices: [String],           // Nail Art, Extensions
    waxingThreading: [String],
    manicurePedicure: [String],
    tattooPiercing: [String]
  },

  // Staff
  staffDetails: {
    numberOfStaff: Number,
    certifiedProfessionals: Boolean,
    staffPhotos: [String]
  },

  // Pricing & Packages
  pricing: {
    priceListUploads: [String], // URLs or paths to PDFs/images
    hasServicePackages: Boolean,
    hasMembershipPlans: Boolean,
    discountsOrOffers: String
  },

  // Facilities
  facilities: {
    ac: Boolean,
    nonAc: Boolean,
    hygienicTools: Boolean,
    privateRooms: Boolean,
    waitingArea: Boolean,
    beveragesAvailable: Boolean,
    parkingAvailable: Boolean,
    wheelchairAccess: Boolean,
    separateMaleFemaleStaff: Boolean
  },

  // Media Uploads
  media: {
    interiorPhotos: [String],
    beforeAfterPhotos: [String],
    logo: String,
    video: String
  },

  // Online Booking & Platforms
  onlineBooking: {
    bookingAvailable: Boolean,
    websiteLink: String,
    listedPlatforms: [String] // UrbanClap, Justdial, Zoylee, etc.
  },

  // Reviews
  reviews: {
    googleReviewLink: String,
    testimonials: [String],
    starRating: Number // optional
  },

  // Legal & Consent
  legal: {
    gstNumber: String,
    salonLicense: String,
    consentAuthorized: { type: Boolean, default: false }
  }
});

const BeautySpa = mongoose.model('BeautySpa', beautySpaSchema);
export default BeautySpa;
