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

// export const createBusiness = async (req, res) => {
//   try {
//     const {
//       name,
//       ownerName,
//       owner,
//       location,
//       phone,
//       website,
//       email,
//       socialLinks,
//       businessHours,
//       category,
//       experience,
//       description,

//     } = req.body;

// const categoryModel = category; // derive from category
//  CategoryModel = categoryModels[categoryModel];
//     if (!CategoryModel) {
//       return res.status(400).json({ message: 'Invalid category model' });
//     }

//     const categoryDoc = new CategoryModel(categoryData);
//     const savedCategoryData = await categoryDoc.save();

//     // ✅ Handle file uploads
//     const files = req.files || {};

//     const profileImage = files.profileImage?.[0]?.path || null;
//     const coverImage = files.coverImage?.[0]?.path || null;

//     const certificateImages = files.certificateImages
//       ? files.certificateImages.map((file) => file.path).slice(0, 5) // max 5
//       : [];

//     const galleryImages = files.galleryImages
//       ? files.galleryImages.map((file) => file.path).slice(0, 10) // max 10
//       : [];

//     const business = new Business({
//       name,
//       ownerName,
//       owner,
//       location,
//       phone,
//       website,
//       email,
//       socialLinks,
//       businessHours,
//       profileImage,
//       coverImage,
//       certificateImages,
//       galleryImages,
//       category,
//       categoryModel,
//       categoryRef: savedCategoryData._id
//     });

//     const savedBusiness = await business.save();

//     res.status(201).json({
//       message: 'Business created successfully',
//       business: savedBusiness
//     });
//   } catch (error) {
//     console.error('Error creating business:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// export const createBusiness = async (req, res) => {
//   try {
//     const {
//       name,
//       ownerName,
//       owner,
//       location,
//       phone,
//       website,
//       email,
//       socialLinks,
//       businessHours,
//       category,
//       experience,
//       description
//     } = req.body;

//     // 🧠 Get model
//     const categoryModel = category;
//     const CategoryModel = categoryModels[categoryModel];
//     if (!CategoryModel) {
//       return res.status(400).json({ message: 'Invalid category model' });
//     }

//     // ✅ Parse complex fields
//     const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
//     const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
//     const parsedBusinessHours = typeof businessHours === 'string' ? JSON.parse(businessHours) : businessHours;
//     const parsedCategoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {};

//     // ✅ Handle file uploads
//     const files = req.files || {};
//     const profileImage = files.profileImage?.[0]?.path || null;
//     const coverImage = files.coverImage?.[0]?.path || null;
//     const certificateImages = files.certificateImages?.map(file => file.path).slice(0, 5) || [];
//     const galleryImages = files.galleryImages?.map(file => file.path).slice(0, 10) || [];

//     const formattedBusinessHours = Array.isArray(parsedBusinessHours)
//   ? parsedBusinessHours.map((entry) => ({
//       day: entry.day,
//       open: entry.open || '',
//       close: entry.close || ''
//     }))
//   : [];


//     // ✅ Step 1: Create Business without categoryRef
//     const business = new Business({
//       name,
//       ownerName,
//       owner,
//       location: parsedLocation,
//       phone,
//       website,
//       email,
//       socialLinks: parsedSocialLinks,
//       businessHours: formattedBusinessHours,
//       experience,
//       description,
//       profileImage,
//       coverImage,
//       certificateImages,
//       galleryImages,
//       category,
//       categoryModel
//     });

//     const savedBusiness = await business.save();
//     console.log("✅ Business saved with ID:", savedBusiness._id);

//     // ✅ Step 2: Create category model with business reference
//     const categoryDoc = new CategoryModel({
//       ...parsedCategoryData,
//       business: savedBusiness._id
//     });
//     const savedCategoryData = await categoryDoc.save();
//     console.log("✅ Category saved:", savedCategoryData);

//     // ✅ Step 3: Update business with categoryRef
//     savedBusiness.categoryRef = savedCategoryData._id;
//     const finalBusiness = await savedBusiness.save();

//     res.status(201).json({
//       message: 'Business created successfully',
//       business: finalBusiness
//     });

//   } catch (error) {
//     console.error('❌ Error creating business:', error);
//     res.status(500).json({
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };
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
      category,
      experience,
      description
    } = req.body;

    // 🧠 Get model
    const categoryModel = category;
    const CategoryModel = categoryModels[categoryModel];
    if (!CategoryModel) {
      return res.status(400).json({ message: 'Invalid category model' });
    }

    // ✅ Parse complex fields
    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    const parsedCategoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {};

    // ✅ Fix businessHours parsing
    let parsedBusinessHours = [];
    try {
      parsedBusinessHours =
        typeof businessHours === 'string' ? JSON.parse(businessHours) : businessHours;

      if (!Array.isArray(parsedBusinessHours)) {
        throw new Error('businessHours must be an array');
      }
    } catch (err) {
      console.error('❌ Invalid businessHours format:', err.message);
      return res.status(400).json({
        message: 'Invalid businessHours format. It must be an array of objects with day, open, and close.',
      });
    }

    const formattedBusinessHours = parsedBusinessHours.map((entry) => ({
      day: entry.day || '',
      open: entry.open || '',
      close: entry.close || ''
    }));

    // ✅ Handle file uploads
    const files = req.files || {};
    const profileImage = files.profileImage?.[0]?.path || null;
    const coverImage = files.coverImage?.[0]?.path || null;
    const certificateImages = files.certificateImages?.map(file => file.path).slice(0, 5) || [];
    const galleryImages = files.galleryImages?.map(file => file.path).slice(0, 10) || [];

    // ✅ Step 1: Create Business without categoryRef
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
      category,
      categoryModel
    });

    const savedBusiness = await business.save();
    console.log("✅ Business saved with ID:", savedBusiness._id);

    // ✅ Step 2: Create category model with business reference
    const categoryDoc = new CategoryModel({
      ...parsedCategoryData,
      business: savedBusiness._id
    });
    const savedCategoryData = await categoryDoc.save();
    console.log("✅ Category saved:", savedCategoryData);

    // ✅ Step 3: Update business with categoryRef
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



export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣  Pull raw body values (strings from form‑data)
    const {
      name,
      ownerName,
      phone,
      website,
      email,
      category: newCategory,     // user may change category
      experience,
      description,
      location: rawLocation,
      socialLinks: rawSocialLinks,
      businessHours: rawBusinessHours
    } = req.body;

    // 2️⃣  Parse JSON‑string fields
    let location = {};
    let socialLinks = {};
    let businessHoursArr = [];
    let categoryData = {};

    try { location = rawLocation ? JSON.parse(rawLocation) : {}; }        catch { return res.status(400).json({ message: 'Invalid JSON in location' }); }
    try { socialLinks = rawSocialLinks ? JSON.parse(rawSocialLinks) : {}; }catch { return res.status(400).json({ message: 'Invalid JSON in socialLinks' }); }
    try { businessHoursArr = rawBusinessHours ? JSON.parse(rawBusinessHours) : []; } catch { return res.status(400).json({ message: 'Invalid JSON in businessHours' }); }
    try { categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {}; } catch { return res.status(400).json({ message: 'Invalid JSON in categoryData' }); }

    // 3️⃣  Fetch the listing
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
    /* 5️⃣  Update simple scalar fields                                   */
    /* ------------------------------------------------------------------ */
    business.name        = name        ?? business.name;
    business.ownerName   = ownerName   ?? business.ownerName;
    business.phone       = phone       ?? business.phone;
    business.website     = website     ?? business.website;
    business.email       = email       ?? business.email;
    business.experience  = experience  ?? business.experience;
    business.description = description ?? business.description;

    /* ------------------------------------------------------------------ */
    /* 6️⃣  Replace complex objects if sent                               */
    /* ------------------------------------------------------------------ */
    if (Object.keys(location).length)      business.location    = location;
    if (Object.keys(socialLinks).length)   business.socialLinks = socialLinks;
    if (Array.isArray(businessHoursArr) && businessHoursArr.length) {
      business.businessHours = businessHoursArr.map(bh => ({
        day:   bh.day,
        open:  bh.open  || '',
        close: bh.close || ''
      }));
    }

    /* ------------------------------------------------------------------ */
    /* 7️⃣  CATEGORY CHANGE or CATEGORY DATA UPDATE                       */
    /* ------------------------------------------------------------------ */
    if (newCategory && newCategory !== business.category) {
      /* --- user picked a new category --- */
      const newModelName = newCategory;
      const NewCategoryModel = categoryModels[newModelName];
      if (!NewCategoryModel)
        return res.status(400).json({ message: `Invalid category "${newCategory}"` });

      // create fresh category doc
      const newCatDoc = new NewCategoryModel(categoryData);
      await newCatDoc.save();

      business.category      = newCategory;
      business.categoryModel = newModelName;
      business.categoryRef   = newCatDoc._id;
    } else {
      /* --- same category, just update its extra data (if any) --- */
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
    /* 8️⃣  Save & respond                                                */
    /* ------------------------------------------------------------------ */
    const updatedBusiness = await business.save();

    res.status(200).json({
      message: 'Business listing updated successfully',
      business: updatedBusiness
    });
  } catch (error) {
    console.error('Error updating business listing:', error);
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