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
      location,
      phone,
      website,
      email,
      socialLinks,
      businessHours
    } = req.body;

    const categoryData = req.body.categoryData ? JSON.parse(req.body.categoryData) : {};

    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const files = req.files || {};

    // ✅ Only overwrite images if uploaded
    if (files.profileImage) business.profileImage = files.profileImage[0].path;
    if (files.coverImage) business.coverImage = files.coverImage[0].path;

    if (files.certificateImages) {
      business.certificateImages = files.certificateImages.map((file) => file.path).slice(0, 5);
    }

    if (files.galleryImages) {
      business.galleryImages = files.galleryImages.map((file) => file.path).slice(0, 10);
    }

    // ✅ Update core fields
    business.name = name ?? business.name;
    business.ownerName = ownerName ?? business.ownerName;
    business.location = location ?? business.location;
    business.phone = phone ?? business.phone;
    business.website = website ?? business.website;
    business.email = email ?? business.email;
    business.socialLinks = socialLinks ?? business.socialLinks;
    business.businessHours = businessHours ?? business.businessHours;

    // ✅ Update category-specific data
    const CategoryModel = categoryModels[business.categoryModel];
    if (CategoryModel && categoryData && business.categoryRef) {
      await CategoryModel.findByIdAndUpdate(business.categoryRef, categoryData, { new: true });
    }

    const updatedBusiness = await business.save();

    res.status(200).json({
      message: 'Business updated successfully',
      business: updatedBusiness
    });
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
