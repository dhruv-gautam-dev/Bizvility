import Business from '../models/Business.js';
import Health from '../models/Health.js';
import Hotel from '../models/Hotel.js';
import BeautySpa from '../models/BeautySpa.js';
import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';

const categoryModels = {
  Health,
  Hotel: Hotel,
  BeautySpa: BeautySpa
};

//controller/businessController.js
export const createBusiness = async (req, res) => {
  try {
    const {
      name,
      ownerName,
      owner,
      location,
      phone,
      website,
      email,
      socialLinks,
      businessHours,
      category, // expecting value: "Health", "Hotel", or "BeautySpa"
      experience,
      description
    } = req.body;

    // Get model to store additional category-specific information
    const categoryModel = category; // e.g. "Health"
    const CategoryModel = categoryModels[categoryModel];
    if (!CategoryModel) {
      return res.status(400).json({ message: 'Invalid category model' });
    }

    // Parse complex fields
    const parsedLocation =
      typeof location === 'string' ? JSON.parse(location) : location;

    const parsedSocialLinks =
      typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

    // Parse businessHours ensuring it's an array
    let parsedBusinessHours = [];
    try {
      parsedBusinessHours =
        typeof businessHours === 'string'
          ? JSON.parse(businessHours)
          : businessHours;

      if (!Array.isArray(parsedBusinessHours)) {
        throw new Error('businessHours must be an array');
      }
    } catch (err) {
      console.error('❌ Invalid businessHours format:', err.message);
      return res.status(400).json({
        message:
          'Invalid businessHours format. It must be an array of objects with day, open, and close.'
      });
    }
    const formattedBusinessHours = parsedBusinessHours.map(entry => ({
      day: entry.day || '',
      open: entry.open || '',
      close: entry.close || ''
    }));

    // Parse services if provided. Expected as a JSON string.
    const parsedServices =
      req.body.services && typeof req.body.services === 'string'
        ? JSON.parse(req.body.services)
        : req.body.services || {};

    // Parse categoryData for additional category model details.
    const parsedCategoryData =
      req.body.categoryData && typeof req.body.categoryData === 'string'
        ? JSON.parse(req.body.categoryData)
        : req.body.categoryData || {};

    // Handle file uploads (if using multer, etc.)
    const files = req.files || {};
    const profileImage = files.profileImage?.[0]?.path || null;
    const coverImage = files.coverImage?.[0]?.path || null;
    const certificateImages =
      files.certificateImages?.map(file => file.path).slice(0, 5) || [];
    const galleryImages =
      files.galleryImages?.map(file => file.path).slice(0, 10) || [];

    // Step 1: Create Business document
    const business = new Business({
      name,
      ownerName,
      owner,
      location: parsedLocation,
      phone,
      website,
      email,
      socialLinks: parsedSocialLinks,
      businessHours: formattedBusinessHours,
      experience,
      description,
      profileImage,
      coverImage,
      certificateImages,
      galleryImages,
      category, // e.g. "Health"
      categoryModel, // using same value as category for now
      // New field: services
      services: parsedServices
    });

    const savedBusiness = await business.save();
    console.log("✅ Business saved with ID:", savedBusiness._id);

    // Step 2: Create category-specific document with business reference.
    const categoryDoc = new CategoryModel({
      ...parsedCategoryData,
      business: savedBusiness._id
    });
    const savedCategoryData = await categoryDoc.save();
    console.log("✅ Category data saved:", savedCategoryData);

    // Step 3: Update Business with categoryRef
    savedBusiness.categoryRef = savedCategoryData._id;
    const finalBusiness = await savedBusiness.save();

    res.status(201).json({
      message: 'Business created successfully',
      business: finalBusiness
    });

  } catch (error) {
    console.error('❌ Error creating business:', error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};



//updateBusiness inside the businessController
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣  Extract raw form-data values
    const {
      name,
      ownerName,
      phone,
      website,
      email,
      category: newCategory,     // in case of category change
      experience,
      description,
      services: rawServices,
      location: rawLocation,
      socialLinks: rawSocialLinks,
      businessHours: rawBusinessHours
    } = req.body;

    // 2️⃣  Parse JSON-stringified fields
    let location = {};
    let socialLinks = {};
    let businessHoursArr = [];
    let categoryData = {};
    let services = {};

    try { location = rawLocation ? JSON.parse(rawLocation) : {}; }        catch { return res.status(400).json({ message: 'Invalid JSON in location' }); }
    try { socialLinks = rawSocialLinks ? JSON.parse(rawSocialLinks) : {}; }catch { return res.status(400).json({ message: 'Invalid JSON in socialLinks' }); }
    try { businessHoursArr = rawBusinessHours ? JSON.parse(rawBusinessHours) : []; } catch { return res.status(400).json({ message: 'Invalid JSON in businessHours' }); }
    try { categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {}; } catch { return res.status(400).json({ message: 'Invalid JSON in categoryData' }); }
    try { services = rawServices ? JSON.parse(rawServices) : {}; } catch { return res.status(400).json({ message: 'Invalid JSON in services' }); }

    // 3️⃣  Fetch existing business
    const business = await Business.findById(id);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    /* ------------------------------------------------------------------ */
    /* 4️⃣  Handle file uploads                                           */
    /* ------------------------------------------------------------------ */
    const files = req.files || {};

    if (files.profileImage?.length)  business.profileImage  = files.profileImage[0].path;
    if (files.coverImage?.length)    business.coverImage    = files.coverImage[0].path;
    if (files.certificateImages?.length)
      business.certificateImages = files.certificateImages.map(f => f.path).slice(0, 5);
    if (files.galleryImages?.length)
      business.galleryImages = files.galleryImages.map(f => f.path).slice(0, 10);

    /* ------------------------------------------------------------------ */
    /* 5️⃣  Update scalar fields                                          */
    /* ------------------------------------------------------------------ */
    business.name        = name        ?? business.name;
    business.ownerName   = ownerName   ?? business.ownerName;
    business.phone       = phone       ?? business.phone;
    business.website     = website     ?? business.website;
    business.email       = email       ?? business.email;
    business.experience  = experience  ?? business.experience;
    business.description = description ?? business.description;

    /* ------------------------------------------------------------------ */
    /* 6️⃣  Update complex object fields                                  */
    /* ------------------------------------------------------------------ */
    if (Object.keys(location).length)      business.location    = location;
    if (Object.keys(socialLinks).length)   business.socialLinks = socialLinks;
    if (Object.keys(services).length)      business.services     = services;

    if (Array.isArray(businessHoursArr) && businessHoursArr.length) {
      business.businessHours = businessHoursArr.map(bh => ({
        day:   bh.day,
        open:  bh.open  || '',
        close: bh.close || ''
      }));
    }

    /* ------------------------------------------------------------------ */
    /* 7️⃣  Category Update (switch or same)                              */
    /* ------------------------------------------------------------------ */
    if (newCategory && newCategory !== business.category) {
      // ✨ Switch to a new category
      const newModelName = newCategory;
      const NewCategoryModel = categoryModels[newModelName];
      if (!NewCategoryModel) {
        return res.status(400).json({ message: `Invalid category "${newCategory}"` });
      }

      const newCatDoc = new NewCategoryModel(categoryData);
      await newCatDoc.save();

      business.category      = newCategory;
      business.categoryModel = newModelName;
      business.categoryRef   = newCatDoc._id;
    } else {
      // ✨ Update existing categoryData
      const CurrentCatModel = categoryModels[business.categoryModel];
      if (CurrentCatModel && Object.keys(categoryData).length && business.categoryRef) {
        const catDoc = await CurrentCatModel.findById(business.categoryRef);
        if (catDoc) {
          catDoc.set(categoryData);
          await catDoc.save();
        }
      }
    }

    /* ------------------------------------------------------------------ */
    /* 8️⃣  Save and respond                                              */
    /* ------------------------------------------------------------------ */
    const updatedBusiness = await business.save();

    res.status(200).json({
      message: '✅ Business listing updated successfully',
      business: updatedBusiness
    });
  } catch (error) {
    console.error('❌ Error updating business listing:', error);
    res.status(500).json({
      message: 'Server Error while updating business listing',
      error: error.message
    });
  }
};

//get the business by id
export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 Step 1: Fetch main business info
    const business = await Business.findById(id).lean(); // plain JS object
    if (!business) {
      console.log('❌ Business not found with id:', id);
      return res.status(404).json({ message: 'Business not found' });
    }

    console.log('✅ Fetched business:', business);

    // 🧠 Step 2: Resolve category model and ref
    const CategoryModel = categoryModels[business.categoryModel];
    let categoryData = {};

    if (!CategoryModel) {
      console.warn(`⚠️ No model found for category: ${business.categoryModel}`);
    } else if (!business.categoryRef) {
      console.warn(`⚠️ categoryRef is missing in business document`);
    } else {
      console.log('✅ Using category model:', business.categoryModel);
      console.log('Looking for categoryRef:', business.categoryRef);

      const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
      if (!categoryDoc) {
        console.warn(`⚠️ No category document found with ID: ${business.categoryRef}`);
      } else {
        const { _id, __v, ...rest } = categoryDoc;
        categoryData = rest;
        console.log('✅ Fetched category document:', categoryData);
      }
    }

    // 🧩 Step 3: Merge and return
    const fullData = {
      ...business,
      categoryData
    };

    console.log('✅ Final response object:', fullData);

    res.status(200).json({
      message: 'Business fetched successfully',
      business: fullData
    });

  } catch (error) {
    console.error('❌ Error fetching business:', error);
    res.status(500).json({
      message: 'Server error while fetching business data',
      error: error.message
    });
  }
};


//get all businesses
export const getAllBusinesses = async (req, res) => {
  try {
    // ✅ Fetch all businesses with categoryRef
    const businesses = await Business.find().lean(); // lean = plain object for merging

    // 🧠 Fetch category details for each business
    const businessesWithCategoryDetails = await Promise.all(
      businesses.map(async (business) => {
        const CategoryModel = categoryModels[business.categoryModel];
        let categoryDetails = {};

        if (CategoryModel && business.categoryRef) {
          const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
          if (categoryDoc) {
            categoryDetails = categoryDoc;
          }
        }

        return {
          ...business,
          categoryDetails // or rename to 'categoryData' if preferred
        };
      })
    );

    res.status(200).json({
      message: 'Businesses fetched successfully',
      businesses: businessesWithCategoryDetails
    });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({
      message: 'Server error while fetching businesses',
      error: error.message
    });
  }
};
  
//get the business by id with reveiws data
export const getBusinessId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔍 1. Find the business by ID
  const business = await Business.findById(id).lean();
  if (!business) {
    console.log('❌ Business not found with id:', id);
    return res.status(404).json({ message: 'Business not found' });
  }

  // 🧠 2. Resolve dynamic category model and fetch category-specific data
  const CategoryModel = categoryModels[business.categoryModel];
  let categoryData = {};

  if (CategoryModel && business.categoryRef) {
    const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
    if (categoryDoc) {
      const { _id, __v, ...rest } = categoryDoc;
      categoryData = rest;
    }
  }

  // 💬 3. Fetch reviews related to this business
  const reviews = await Review.find({ business: id })
    .populate('user', 'fullName profile.avatar')
    .sort({ createdAt: -1 }) // latest first
    .lean();

  // 🧾 4. Format reviews
  const formattedReviews = reviews.map((r) => ({
    reviewerName: r.user?.fullName || 'Anonymous',
    reviewerAvatar: r.user?.profile?.avatar || null,
    rating: r.rating,
    comment: r.comment,
    time: r.createdAt,
  }));

  // 📦 5. Combine everything
  const fullData = {
    ...business,
    categoryData,
    reviews: formattedReviews,
  };

  res.status(200).json({
    message: 'Business fetched successfully',
    business: fullData,
  });
});