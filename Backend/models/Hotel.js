import mongoose from 'mongoose';

const hotelsCafesRestaurantsSchema = new mongoose.Schema({
  type: { type: String, enum: ['Hotel', 'Café', 'Restaurant', 'Bar', 'Lounge', 'Bakery', 'Food Truck'], required: true },
  establishedYear: { type: Date },
  foodCategory: { type: String }, // Veg, Non-Veg, etc.
  whatsappNumber: String,
  alternateContactNumber: String,



  cuisineTypes: [String],
  menuUploads: [String], // file URLs or paths
  signatureDishes: [String],
  pricingLevel: { type: String, enum: ['Low', 'Mid-range', 'Premium'] },

  facilities: {
    indoorSeating: Boolean,
    outdoorSeating: Boolean,
    ac: Boolean,
    nonAc: Boolean,
    liveMusic: Boolean,
    dj: Boolean,
    rooftop: Boolean,
    gardenSeating: Boolean,
    wifi: Boolean,
    parking: Boolean,
    petFriendly: Boolean,
    kidsZone: Boolean,
    privateDining: Boolean,
    danceFloor: Boolean,
    bar: Boolean
  },

  bookingAndDelivery: {
    onlineReservation: Boolean,
    zomatoLink: String,
    swiggyLink: String,
    inhouseDelivery: Boolean,
    tableBookingLink: String
  },

  hotelRoomDetails: {
    numberOfRooms: Number,
    roomTypes: [String],
    checkinTime: String,
    checkoutTime: String,
    facilities: [String],
    roomPhotos: [String],
    priceRange: String
  },

  mediaUploads: {
    logo: String,
    premisePhotos: [String],
    promoVideos: [String]
  },

  reviews: {
    googleReviewLink: String,
    tripAdvisorLink: String,
    zomatoReviewLink: String,
    testimonials: [String]
  },

  paymentAndPolicies: {
    paymentModes: [String],
    gstNumber: String,
    taxInvoiceAvailable: Boolean,
    refundPolicy: String
  },

  eventsServices: {
    availableForEvents: Boolean,
    cateringAvailable: Boolean,
    livePerformances: Boolean,
    loyaltyPrograms: Boolean
  }
});

const Hotel = mongoose.model('Hotel', hotelsCafesRestaurantsSchema);
export default Hotel;
