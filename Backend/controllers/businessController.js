
import Business from '../models/Business.js';
import Health from '../models/Health.js';
import Hotel from '../models/Hotel.js';
import BeautySpa from '../models/BeautySpa.js';
import asyncHandler from '../utils/asyncHandler.js';
import Review from '../models/Review.js';
import User from '../models/user.js';
import moment from 'moment'; // Optional for time comparison
import Leads from '../models/Leads.js';


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
//       category, // expecting value: "Health", "Hotel", or "BeautySpa"
//       experience,
//       description,
//       referralCode, // ✅ Optional field for sales tracking
//       services,
//       categoryData
//     } = req.body;

//     // ✅ Resolve category model
//     const categoryModel = category; // e.g. "Health"
//     const CategoryModel = categoryModels[categoryModel];
//     if (!CategoryModel) {
//       return res.status(400).json({ message: 'Invalid category model' });
//     }

//     // ✅ Parse complex fields
//     const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
//     const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

//     let parsedBusinessHours = [];
//     try {
//       parsedBusinessHours =
//         typeof businessHours === 'string' ? JSON.parse(businessHours) : businessHours;
//       if (!Array.isArray(parsedBusinessHours)) {
//         throw new Error('businessHours must be an array');
//       }
//     } catch (err) {
//       console.error('❌ Invalid businessHours format:', err.message);
//       return res.status(400).json({
//         message: 'Invalid businessHours format. It must be an array of objects with day, open, and close.'
//       });
//     }

//     const formattedBusinessHours = parsedBusinessHours.map(entry => ({
//       day: entry.day || '',
//       open: entry.open || '',
//       close: entry.close || ''
//     }));

//     const parsedServices =
//       services && typeof services === 'string' ? JSON.parse(services) : services || {};

//     const parsedCategoryData =
//       categoryData && typeof categoryData === 'string'
//         ? JSON.parse(categoryData)
//         : categoryData || {};

//     // ✅ Handle file uploads
//     const files = req.files || {};
//     const profileImage = files.profileImage?.[0]?.path || null;
//     const coverImage = files.coverImage?.[0]?.path || null;
//     const certificateImages = files.certificateImages?.map(file => file.path).slice(0, 5) || [];
//     const galleryImages = files.galleryImages?.map(file => file.path).slice(0, 10) || [];

//     // ✅ Referral logic: lookup sales executive using referralCode
//     let salesExecutive = null;
//     if (referralCode) {
//       const refUser = await User.findOne({ referralCode });
//       if (!refUser) {
//         return res.status(400).json({ message: 'Invalid referral code' });
//       }
//       salesExecutive = refUser._id;
//     }

//     // ✅ Step 1: Create Business document
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
//       categoryModel,
//       services: parsedServices,
//       salesExecutive // ✅ tracked from referralCode
//     });

//     const savedBusiness = await business.save();
//     console.log("✅ Business saved with ID:", savedBusiness._id);

//     // ✅ Step 2: Create category-specific data with business reference
//     const categoryDoc = new CategoryModel({
//       ...parsedCategoryData,
//       business: savedBusiness._id
//     });
//     const savedCategoryData = await categoryDoc.save();
//     console.log("✅ Category data saved:", savedCategoryData);

//     // ✅ Step 3: Link business to saved category data
//     savedBusiness.categoryRef = savedCategoryData._id;
//     await savedBusiness.save();

// // ✅ Step 3: Auto-create Lead for Sales team
//     try {
//       const user = await User.findById(owner).select('fullName email');

//       if (user) {
//         await Lead.create({
//   name: user.fullName,
//   contact: user.email,
//   businessType: 'Unknown',
//   status: 'Interested',
//   notes: 'Signed up on website',
//   salesUser: salesExecutive || null,
//   followUpDate: new Date(Date.now() + 2 * 60 * 1000) // follow-up in 2 mins (for testing)
// });
//         console.log("📈 Lead created for business listing");
//       }
//     } catch (leadErr) {
//       console.warn("⚠️ Lead creation failed:", leadErr.message);
//       // Don't throw: fail silently here to preserve business creation
//     }



//     // ✅ Step 4: Populate salesExecutive field before returning
//     const finalBusiness = await Business.findById(savedBusiness._id).populate('salesExecutive');

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



// export const updateBusiness = async (req, res) => {

//   try {
//     const { id } = req.params;

//     // 1️⃣  Pull raw body values (strings from form‑data)
//     const {
//       name,
//       ownerName,
//       phone,
//       website,
//       email,
//       category: newCategory,     // user may change category
//       experience,
//       description,
//       location: rawLocation,
//       socialLinks: rawSocialLinks,
//       businessHours: rawBusinessHours
//     } = req.body;

//     // 2️⃣  Parse JSON‑string fields
//     let location = {};
//     let socialLinks = {};
//     let businessHoursArr = [];
//     let categoryData = {};

//     try { location = rawLocation ? JSON.parse(rawLocation) : {}; }        catch { return res.status(400).json({ message: 'Invalid JSON in location' }); }
//     try { socialLinks = rawSocialLinks ? JSON.parse(rawSocialLinks) : {}; }catch { return res.status(400).json({ message: 'Invalid JSON in socialLinks' }); }
//     try { businessHoursArr = rawBusinessHours ? JSON.parse(rawBusinessHours) : []; } catch { return res.status(400).json({ message: 'Invalid JSON in businessHours' }); }
//     try { categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {}; } catch { return res.status(400).json({ message: 'Invalid JSON in categoryData' }); }

//     // 3️⃣  Fetch the listing
//     const business = await Business.findById(id);
//     if (!business) return res.status(404).json({ message: 'Business not found' });

//     /* ------------------------------------------------------------------ */
//     /* 4️⃣  Handle file uploads                                           */
//     /* ------------------------------------------------------------------ */
//     const files = req.files || {};

//     if (files.profileImage?.length)  business.profileImage  = files.profileImage[0].path;
//     if (files.coverImage?.length)    business.coverImage    = files.coverImage[0].path;
//     if (files.certificateImages?.length)
//       business.certificateImages = files.certificateImages.map(f => f.path).slice(0, 5);
//     if (files.galleryImages?.length)
//       business.galleryImages = files.galleryImages.map(f => f.path).slice(0, 10);

//     /* ------------------------------------------------------------------ */
//     /* 5️⃣  Update simple scalar fields                                   */
//     /* ------------------------------------------------------------------ */
//     business.name        = name        ?? business.name;
//     business.ownerName   = ownerName   ?? business.ownerName;
//     business.phone       = phone       ?? business.phone;
//     business.website     = website     ?? business.website;
//     business.email       = email       ?? business.email;
//     business.experience  = experience  ?? business.experience;
//     business.description = description ?? business.description;

//     /* ------------------------------------------------------------------ */
//     /* 6️⃣  Replace complex objects if sent                               */
//     /* ------------------------------------------------------------------ */
//     if (Object.keys(location).length)      business.location    = location;
//     if (Object.keys(socialLinks).length)   business.socialLinks = socialLinks;
//     if (Array.isArray(businessHoursArr) && businessHoursArr.length) {
//       business.businessHours = businessHoursArr.map(bh => ({
//         day:   bh.day,
//         open:  bh.open  || '',
//         close: bh.close || ''
//       }));
//     }

//     /* ------------------------------------------------------------------ */
//     /* 7️⃣  CATEGORY CHANGE or CATEGORY DATA UPDATE                       */
//     /* ------------------------------------------------------------------ */
//     if (newCategory && newCategory !== business.category) {
//       /* --- user picked a new category --- */
//       const newModelName = newCategory;
//       const NewCategoryModel = categoryModels[newModelName];
//       if (!NewCategoryModel)
//         return res.status(400).json({ message: `Invalid category "${newCategory}"` });

//       // create fresh category doc
//       const newCatDoc = new NewCategoryModel(categoryData);
//       await newCatDoc.save();

//       business.category      = newCategory;
//       business.categoryModel = newModelName;
//       business.categoryRef   = newCatDoc._id;
//     } else {
//       /* --- same category, just update its extra data (if any) --- */
//       const CurrentCatModel = categoryModels[business.categoryModel];
//       if (CurrentCatModel && Object.keys(categoryData).length && business.categoryRef) {
//         const catDoc = await CurrentCatModel.findById(business.categoryRef);
//         if (catDoc) {
//           catDoc.set(categoryData);
//           await catDoc.save();
//         }
//       }
//     }

//     /* ------------------------------------------------------------------ */
//     /* 8️⃣  Save & respond                                                */
//     /* ------------------------------------------------------------------ */
//     const updatedBusiness = await business.save();

//     res.status(200).json({
//       message: 'Business listing updated successfully',
//       business: updatedBusiness
//     });
//   } catch (error) {
//     console.error('Error updating business listing:', error);
//     res.status(500).json({
//       message: 'Server Error while updating business listing',
//       error: error.message
//     });
//   }
// };

//get the business by id
// export const getBusinessById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // 🔍 Step 1: Fetch main business info
//     const business = await Business.findById(id).lean(); // plain JS object
//     if (!business) {
//       console.log('❌ Business not found with id:', id);
//       return res.status(404).json({ message: 'Business not found' });
//     }

//     console.log('✅ Fetched business:', business);

//     // 🧠 Step 2: Resolve category model and ref
//     const CategoryModel = categoryModels[business.categoryModel];
//     let categoryData = {};

//     if (!CategoryModel) {
//       console.warn(`⚠️ No model found for category: ${business.categoryModel}`);
//     } else if (!business.categoryRef) {
//       console.warn(`⚠️ categoryRef is missing in business document`);
//     } else {
//       console.log('✅ Using category model:', business.categoryModel);
//       console.log('Looking for categoryRef:', business.categoryRef);

//       const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
//       if (!categoryDoc) {
//         console.warn(`⚠️ No category document found with ID: ${business.categoryRef}`);
//       } else {
//         const { _id, __v, ...rest } = categoryDoc;
//         categoryData = rest;
//         console.log('✅ Fetched category document:', categoryData);
//       }
//     }

//     // 🧩 Step 3: Merge and return
//     const fullData = {
//       ...business,
//       categoryData
//     };

//     console.log('✅ Final response object:', fullData);

//     res.status(200).json({
//       message: 'Business fetched successfully',
//       business: fullData
//     });

//   } catch (error) {
//     console.error('❌ Error fetching business:', error);
//     res.status(500).json({
//       message: 'Server error while fetching business data',
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
      category, // "Health", "Hotel", or "BeautySpa"
      experience,
      description,
      referralCode,
      services,
      categoryData
    } = req.body;

    const categoryModel = category;
    const CategoryModel = categoryModels[categoryModel];
    if (!CategoryModel) {
      return res.status(400).json({ message: 'Invalid category model' });
    }

    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

    let parsedBusinessHours = [];
    try {
      parsedBusinessHours = typeof businessHours === 'string'
        ? JSON.parse(businessHours)
        : businessHours;
      if (!Array.isArray(parsedBusinessHours)) {
        throw new Error('businessHours must be an array');
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Invalid businessHours format. It must be an array of objects with day, open, and close.'
      });
    }

    const formattedBusinessHours = parsedBusinessHours.map(entry => ({
      day: entry.day || '',
      open: entry.open || '',
      close: entry.close || ''
    }));

    const parsedServices = services && typeof services === 'string'
      ? JSON.parse(services)
      : services || {};

    const parsedCategoryData = categoryData && typeof categoryData === 'string'
      ? JSON.parse(categoryData)
      : categoryData || {};

    const files = req.files || {};
    const profileImage = files.profileImage?.[0]?.path || null;
    const coverImage = files.coverImage?.[0]?.path || null;
    const certificateImages = files.certificateImages?.map(file => file.path).slice(0, 5) || [];
    const galleryImages = files.galleryImages?.map(file => file.path).slice(0, 10) || [];

    // ✅ Determine sales executive
    let salesExecutive = null;
    if (referralCode) {
      const refUser = await User.findOne({ referralCode });
      if (refUser) {
        salesExecutive = refUser._id;
      } else {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
    }

    // ✅ Fallback round-robin if referral code not given
    if (!salesExecutive) {
      const salesUsers = await User.find({ role: 'sales' });
      if (salesUsers.length > 0) {
        const index = Math.floor(Math.random() * salesUsers.length);
        salesExecutive = salesUsers[index]._id;
      }
    }

    // ✅ Step 1: Create business
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
      categoryModel,
      services: parsedServices,
      salesExecutive
    });

    const savedBusiness = await business.save();

    // ✅ Step 2: Create category model data
    const categoryDoc = new CategoryModel({
      ...parsedCategoryData,
      business: savedBusiness._id
    });
    const savedCategoryData = await categoryDoc.save();

    // ✅ Step 3: Update business with category ref
    savedBusiness.categoryRef = savedCategoryData._id;
    await savedBusiness.save();

    // ✅ Step 4: Create associated lead for follow-up
    try {
      const user = await User.findById(owner).select('fullName email');
      if (user) {
        await Lead.create({
          name: user.fullName,
          contact: user.email,
          businessType: categoryModel,
          status: 'Interested',
          notes: 'Business listed on website',
          salesUser: salesExecutive || null,
          followUpDate: new Date(Date.now() + 2 * 60 * 1000) // Follow-up in 2 mins (test mode)
        });
        console.log("📈 Lead created for business listing");
      }
    } catch (err) {
      console.warn("⚠️ Lead creation failed:", err.message);
    }

    const finalBusiness = await Business.findById(savedBusiness._id).populate('salesExecutive');

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




export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 Step 1: Fetch main business info as Mongoose document
    let business = await Business.findById(id);
    if (!business) {
      console.log('❌ Business not found with id:', id);
      return res.status(404).json({ message: 'Business not found' });
    }

    // ✅ Step 1.1: Track view based on IP
    const userIp =
      req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    // Ensure viewers field exists
    if (!Array.isArray(business.viewers)) {
      business.viewers = [];
    }

    const hasViewed = business.viewers.some(view =>
      view.ip === userIp &&
      new Date(view.viewedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // last 24h
    );

    if (!hasViewed) {
      business.views = (business.views || 0) + 1;
      business.viewers.push({ ip: userIp, viewedAt: new Date() });
      await business.save();
    }

    console.log('✅ Fetched business:', business);

    // 🧠 Step 2: Resolve category model and ref
    const CategoryModel = categoryModels[business.categoryModel];
    let categoryData = {};

    if (CategoryModel && business.categoryRef) {
      const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
      if (categoryDoc) {
        const { _id, __v, ...rest } = categoryDoc;
        categoryData = rest;
      }
    }

    // 🧩 Step 3: Get associated reviews
    const reviews = await Review.find({ business: id })
      .populate('user', 'fullName profile.avatar')
      .sort({ createdAt: -1 });

    const formattedReviews = reviews.map(r => ({
      reviewerName: r.user?.fullName,
      reviewerAvatar: r.user?.profile?.avatar || null,
      comment: r.comment,
      rating: r.rating,
      time: r.createdAt,
    }));

    // 🧩 Step 4: Merge and return
    const fullData = {
      ...business.toObject(),
      categoryData,
      reviews: formattedReviews
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
// export const getBusinessId = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // 🔍 1. Find the business by ID
//   const business = await Business.findById(id).lean();
//   if (!business) {
//     console.log('❌ Business not found with id:', id);
//     return res.status(404).json({ message: 'Business not found' });
//   }

//   // 🧠 2. Resolve dynamic category model and fetch category-specific data
//   const CategoryModel = categoryModels[business.categoryModel];
//   let categoryData = {};

//   if (CategoryModel && business.categoryRef) {
//     const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
//     if (categoryDoc) {
//       const { _id, __v, ...rest } = categoryDoc;
//       categoryData = rest;
//     }
//   }

//   // 💬 3. Fetch reviews related to this business
//   const reviews = await Review.find({ business: id })
//     .populate('user', 'fullName profile.avatar')
//     .sort({ createdAt: -1 }) // latest first
//     .lean();

//   // 🧾 4. Format reviews
//   const formattedReviews = reviews.map((r) => ({
//     reviewerName: r.user?.fullName || 'Anonymous',
//     reviewerAvatar: r.user?.profile?.avatar || null,
//     rating: r.rating,
//     comment: r.comment,
//     time: r.createdAt,
//   }));

//   // 📦 5. Combine everything
//   const fullData = {
//     ...business,
//     categoryData,
//     reviews: formattedReviews,
//   };

//   res.status(200).json({
//     message: 'Business fetched successfully',
//     business: fullData,
//   });
// });

// export const getBusinessId = async (req, res) => {



//   try {
//     const { id } = req.params;

//     // Step 1: Fetch business
//     const businessDoc = await Business.findById(id);
//     if (!businessDoc) {
//       return res.status(404).json({ message: 'Business not found' });
//     }

//     // Step 2: Determine IP
//     let userIp =
//       req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';
//     if (userIp.startsWith('::ffff:')) {
//       userIp = userIp.replace('::ffff:', '');
//     }
//     console.log('👀 Visitor IP:', userIp);

//     // Step 2.5: Ensure viewers is initialized
//     if (!Array.isArray(businessDoc.viewers)) {
//       businessDoc.viewers = [];
//     }

//     // Step 3: Check if IP has viewed in the last 24h
//     const now = new Date();
//     const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//     const hasViewed = businessDoc.viewers.some(
//       (v) => v.ip === userIp && new Date(v.viewedAt) > oneDayAgo
//     );

//     if (!hasViewed) {
//   await Business.updateOne(
//     { _id: businessDoc._id },
//     {
//       $inc: { views: 1 },
//       $push: { viewers: { ip: userIp, viewedAt: now } }
//     }
//   );
//   console.log('✅ Counted new unique view from', userIp);
// } else {
//   console.log('🔁 Repeated view from same IP in last 24h:', userIp);
// }


//     // Step 4: Get plain object
//     const business = businessDoc.toObject();

//     // Step 5: Load categoryData
//     let categoryData = {};
//     const CategoryModel = categoryModels[business.categoryModel];
//     if (CategoryModel && business.categoryRef) {
//       const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
//       if (categoryDoc) {
//         const { _id, __v, ...rest } = categoryDoc;
//         categoryData = rest;
//       }
//     }

//     // Step 6: Load reviews
//     const reviews = await Review.find({ business: id })
//       .populate('user', 'fullName profile.avatar')
//       .sort({ createdAt: -1 })
//       .lean();

//     const formattedReviews = reviews.map((r) => ({
//       reviewerName: r.user?.fullName || 'Anonymous',
//       reviewerAvatar: r.user?.profile?.avatar || null,
//       rating: r.rating,
//       comment: r.comment,
//       time: r.createdAt,
//     }));

//     // Step 7: Final Response
//     const fullData = {
//       ...business,
//       categoryData,
//       reviews: formattedReviews,
//       totalViews: businessDoc.views || 0, // make sure to read from saved doc
//     };

//     res.status(200).json({
//       message: 'Business fetched successfully',
//       business: fullData,
//     });

//   } catch (error) {
//     console.error('❌ Error fetching business by ID:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


//get user view
// 🔥 Analytics API for business owner's dashboard
export const getUserBusinessViewsAnalytics = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Fetch businesses owned by this user
    const businesses = await Business.find({ owner: userId }).select('_id name views');

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: 'No businesses found for this user' });
    }

    // Step 2: Get all business IDs
    const businessIds = businesses.map(b => b._id);

    // Step 3: Get review counts for each business
    const reviewCounts = await Review.aggregate([
      { $match: { business: { $in: businessIds } } },
      { $group: { _id: '$business', count: { $sum: 1 } } }
    ]);

    // Step 4: Convert reviewCounts to a map
    const reviewMap = {};
    reviewCounts.forEach(r => {
      reviewMap[r._id.toString()] = r.count;
    });

    // Step 5: Merge views + review count per business
    const viewsPerBusiness = businesses.map(b => ({
      id: b._id,
      name: b.name,
      views: b.views || 0,
      reviews: reviewMap[b._id.toString()] || 0
    }));

    // Step 6: Compute total views and reviews
    const totalViews = viewsPerBusiness.reduce((sum, b) => sum + b.views, 0);
    const totalReviews = viewsPerBusiness.reduce((sum, b) => sum + b.reviews, 0);

    res.status(200).json({
      message: 'Analytics fetched successfully',
      totalViews,
      totalReviews,
      viewsPerBusiness
    });

  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching analytics',
      error: error.message
    });
  }
});


export const getBusinessId = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Fetch business document
    const businessDoc = await Business.findById(id);
    if (!businessDoc) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Step 2: Get IP
    let userIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
    if (userIp?.startsWith('::ffff:')) userIp = userIp.replace('::ffff:', '');

    // Step 3: Get User ID (if logged in)
    const userId = req.user?._id || null;

    // Step 4: Ensure viewers array exists
    if (!Array.isArray(businessDoc.viewers)) {
      businessDoc.viewers = [];
    }

    // Step 5: Check if IP or user viewed in last 24h
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const hasViewed = businessDoc.viewers.some((v) =>
      (v.ip === userIp || (userId && v.user?.toString() === userId.toString())) &&
      new Date(v.viewedAt) > oneDayAgo
    );

    // Step 6: Add view if new
    if (!hasViewed) {
      businessDoc.views += 1;
      businessDoc.viewers.push({
        ip: userIp,
        user: userId,
        viewedAt: now,
      });
      await businessDoc.save();
    }

    // Step 7: Load category data
    let categoryData = {};
    const CategoryModel = categoryModels[businessDoc.categoryModel];
    if (CategoryModel && businessDoc.categoryRef) {
      const categoryDoc = await CategoryModel.findById(businessDoc.categoryRef).lean();
      if (categoryDoc) {
        const { _id, __v, ...rest } = categoryDoc;
        categoryData = rest;
      }
    }

    // Step 8: Load reviews
    const reviews = await Review.find({ business: id })
      .populate('user', 'fullName profile.avatar')
      .sort({ createdAt: -1 })
      .lean();

    const formattedReviews = reviews.map((r) => ({
      reviewerName: r.user?.fullName || 'Anonymous',
      reviewerAvatar: r.user?.profile?.avatar || null,
      rating: r.rating,
      comment: r.comment,
      time: r.createdAt,
    }));

    // Step 9: Final response
    const business = businessDoc.toObject();
    const fullData = {
      ...business,
      categoryData,
      reviews: formattedReviews,
      totalViews: businessDoc.views || 0,
    };

    res.status(200).json({
      message: 'Business fetched successfully',
      business: fullData,
    });

  } catch (error) {
    console.error('❌ Server error in getBusinessId:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message || 'Unexpected error',
    });
  }
};

//api for search businesses according to location and category, or any keyword which is in business model database.

export const searchBusinesses = async (req, res) => {
  try {
    const { keyword = '', location = '' } = req.query;

    if (!keyword && !location) {
      return res.status(400).json({ message: 'Please provide keyword or location' });
    }

    const keywordRegex = new RegExp(keyword, 'i');
    const locationRegex = new RegExp(location, 'i');

    // ✅ STEP 1: Direct Business search
    let results = await Business.find({
      $or: [
        { name: keywordRegex },
        { description: keywordRegex },
        { category: keywordRegex },
        { categoryModel: keywordRegex }
      ],
      ...(location ? { 'location.city': locationRegex } : {})
    });

    // ✅ STEP 2: If no results, drop location filter
    if (results.length === 0) {
      results = await Business.find({
        $or: [
          { name: keywordRegex },
          { description: keywordRegex },
          { category: keywordRegex },
          { categoryModel: keywordRegex }
        ]
      });
    }

    // ✅ STEP 3: Search across all category models' `speciality`
    if (results.length === 0) {
      let businessIds = [];

      for (const [modelName, Model] of Object.entries(categoryModels)) {
        const matchedDocs = await Model.find({ speciality: keywordRegex }).select('business');

        const ids = matchedDocs
          .map(doc => doc.business)
          .filter(id => !!id); // remove undefined/null

        businessIds.push(...ids);
      }

      if (businessIds.length > 0) {
        results = await Business.find({
          _id: { $in: businessIds },
          ...(location ? { 'location.city': locationRegex } : {})
        });
      }
    }

    res.status(200).json({
      count: results.length,
      results
    });

  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

