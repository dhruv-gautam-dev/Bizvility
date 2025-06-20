import Business from '../models/Business.js';
import Health from '../models/Health.js';
import Hotel from '../models/Hotel.js';
import BeautySpa from '../models/BeautySpa.js';

const categoryModels = {
  Health: Health,
  Hotel: Hotel,
  BeautySpa: BeautySpa
};

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
      categoryModel
    } = req.body;

    const categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {};

    const CategoryModel = categoryModels[categoryModel];
    if (!CategoryModel) {
      return res.status(400).json({ message: 'Invalid category model' });
    }

    const categoryDoc = new CategoryModel(categoryData);
    const savedCategoryData = await categoryDoc.save();

    // ✅ Handle file uploads
    const files = req.files || {};

    const profileImage = files.profileImage?.[0]?.path || null;
    const coverImage = files.coverImage?.[0]?.path || null;

    const certificateImages = files.certificateImages
      ? files.certificateImages.map((file) => file.path).slice(0, 5) // max 5
      : [];

    const galleryImages = files.galleryImages
      ? files.galleryImages.map((file) => file.path).slice(0, 10) // max 10
      : [];

    const business = new Business({
      name,
      ownerName,
      owner,
      location,
      phone,
      website,
      email,
      socialLinks,
      businessHours,
      profileImage,
      coverImage,
      certificateImages,
      galleryImages,
      category,
      categoryModel,
      categoryRef: savedCategoryData._id
    });

    const savedBusiness = await business.save();

    res.status(201).json({
      message: 'Business created successfully',
      business: savedBusiness
    });
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      ownerName,
      phone,
      website,
      email,
      category,
      categoryModel,
      // these are stringified in form-data, so we parse below
      location: rawLocation,
      socialLinks: rawSocialLinks,
      businessHours: rawBusinessHours
    } = req.body;

    // Parse categoryData and other objects from form-data
    const categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {};

    let location = {};
    let socialLinks = {};
    let businessHours = {};

    try {
      location = rawLocation ? JSON.parse(rawLocation) : {};
    } catch {
      return res.status(400).json({ message: 'Invalid JSON format for location' });
    }

    try {
      socialLinks = rawSocialLinks ? JSON.parse(rawSocialLinks) : {};
    } catch {
      return res.status(400).json({ message: 'Invalid JSON format for socialLinks' });
    }

    try {
      businessHours = rawBusinessHours ? JSON.parse(rawBusinessHours) : {};
    } catch {
      return res.status(400).json({ message: 'Invalid JSON format for businessHours' });
    }

    // ✅ Find existing business
    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // ✅ File updates
    const files = req.files || {};

    if (files.profileImage?.length) {
      business.profileImage = files.profileImage[0].path;
    }

    if (files.coverImage?.length) {
      business.coverImage = files.coverImage[0].path;
    }

    if (files.certificateImages?.length) {
      business.certificateImages = files.certificateImages
        .map((file) => file.path)
        .slice(0, 5);
    }

    if (files.galleryImages?.length) {
      business.galleryImages = files.galleryImages
        .map((file) => file.path)
        .slice(0, 10);
    }

    // ✅ Update core fields
    business.name = name ?? business.name;
    business.ownerName = ownerName ?? business.ownerName;
    business.phone = phone ?? business.phone;
    business.website = website ?? business.website;
    business.email = email ?? business.email;
    business.location = Object.keys(location).length > 0 ? location : business.location;
    business.socialLinks = Object.keys(socialLinks).length > 0 ? socialLinks : business.socialLinks;
    business.businessHours = Object.keys(businessHours).length > 0 ? businessHours : business.businessHours;

    // ✅ Update category model data
    const CategoryModel = categoryModels[business.categoryModel];
    if (CategoryModel && categoryData && business.categoryRef) {
      const categoryDoc = await CategoryModel.findById(business.categoryRef);
      if (categoryDoc) {
        categoryDoc.set(categoryData);
        await categoryDoc.save();
      }
    }

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

    // 🔍 Get business with categoryRef ID
    const business = await Business.findById(id).lean(); // lean = plain object for merging
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const CategoryModel = categoryModels[business.categoryModel];
    let categoryDetails = {};

    // 🧠 If categoryRef exists, fetch full category-specific data
    if (CategoryModel && business.categoryRef) {
      const categoryDoc = await CategoryModel.findById(business.categoryRef).lean();
      if (categoryDoc) {
        categoryDetails = categoryDoc;
      }
    }

    // 🧩 Merge business data + category data into one object
    const fullData = {
      ...business,
      categoryDetails // or rename to 'categoryData' if preferred
    };

    res.status(200).json({
      message: 'Business fetched successfully',
      business: fullData
    });
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({
      message: 'Server error while fetching business data',
      error: error.message
    });
  }
};
// business controlle.js