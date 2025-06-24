import React, { useState } from "react";
import axios from "axios";
import {
  Phone,
  Mail,
  Building,
  MapPin,
  Clock,
  Globe,
  Camera,
  UserIcon,
  Badge,
  CalendarDays,
  VideoIcon,
  Briefcase,
  Link2,
  UserCheck,
  Key,
} from "lucide-react";
import { data, Link, useNavigate } from "react-router-dom";
import StoreDetailPage from "./HealthCategoryPages/StoreDetailPage";
import { FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

const ListBusinessPage = () => {
  const [currentStep, setCurrentStep] = useState("basic");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    experience: "",
    description: "",

    location: {
      address: "",
      pincode: "",
      city: "",
      state: "",
    },

    phone: "",
    email: "",
    website: "",
    category: "",

    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: "",
    },

    businessHours: [
      { day: "Monday", open: "09:00", close: "18:00" },
      { day: "Tuesday", open: "09:00", close: "18:00" },
      { day: "Wednesday", open: "09:00", close: "18:00" },
      { day: "Thursday", open: "09:00", close: "18:00" },
      { day: "Friday", open: "09:00", close: "18:00" },
      { day: "Saturday", open: "09:00", close: "18:00" },
      { day: "Sunday", open: "09:00", close: "18:00" },
    ],

    profilePhoto: null,
    Banner: null,
    certificateImages: [],
    galleryImages: [],

    categoryData: {
      speciality: "",
      registerNumber: "",
      YearOfEstablishment: "",
      appointmentLink: "",
      affiliation: "",
      AC: true,
      Parking: true,
      extraFields: { videoUrl: "" },
    },
  });

  console.log(formData);

  const handleSubmit = async () => {
    try {
      console.log("inside handle submit ");
      console.log(formData);
      // if (formData.category == "Health") {
      //   slug = "health";
      // }
      // console.log(slug);

      const form = new FormData();

      // ✅ Flat fields (corrected)
      form.append("name", formData.businessName); // ⬅️ Backend expects 'name'
      form.append("ownerName", formData.ownerName);
      form.append("experience", formData.experience);
      form.append("description", formData.description);
      form.append("phone", formData.phone);
      form.append("email", formData.email);
      form.append("website", formData.website);
      form.append("category", formData.category);

      // ⚠️ Hardcoded owner ID (replace with real user ID in production)
      const ownerId = localStorage.getItem("userId");
      console.log(ownerId); // or however you're tracking user
      form.append("owner", ownerId);

      // ✅ Complex objects as JSON strings
      form.append("location", JSON.stringify(formData.location));
      form.append("socialLinks", JSON.stringify(formData.socialLinks));
      form.append("businessHours", JSON.stringify(formData.businessHours));
      form.append("categoryData", JSON.stringify(formData.categoryData));

      // ✅ Files
      if (formData.profilePhoto?.file) {
        form.append("profileImage", formData.profilePhoto.file);
      }

      if (formData.Banner?.file) {
        form.append("coverImage", formData.Banner.file); // ✅ Correct file
      }

      formData.certificateImages.forEach((item) => {
        form.append("certificateImages", item.file);
      });

      formData.galleryImages.forEach((item) => {
        form.append("galleryImages", item?.file);
      });

      console.log(formData);
      // ✅ API call
      const token = localStorage.getItem("token");
      form.append("token", token);
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/business/business",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // use conditonsl to store slug
      console.log(formData);
      if (formData.category == "Health") {
        navigate(`/categories/health`);
      } else if (formData.category == "restaurants") {
        navigate(`/categories/restaurants`);
      } else if (formData.category == "beauty") {
        navigate(`/categories/beauty`);
      }
      // console.log(slug);

      console.log("Business created:", response.data);
    } catch (error) {
      console.error(
        "Error submitting business form:",
        error.response?.data || error
      );
    }
  };

  const handleInputChange = (e, index = null, nestedArrayKey = null) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => {
      // existing nested cases...
      if (nestedArrayKey && typeof index === "number") {
        // ...
      } else if (prev.location && name in prev.location) {
        return {
          ...prev,
          location: { ...prev.location, [name]: value },
        };
      } else if (prev.socialLinks[name] !== undefined) {
        return {
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            [name]: value,
          },
        };
      } else if (prev.categoryData && prev.categoryData[name] !== undefined) {
        return {
          ...prev,
          categoryData: { ...prev.categoryData, [name]: value },
        };
      } else if (type === "file") {
        const fileArray = Array.from(files); // convert FileList to Array
        const filePreviews = fileArray.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        return {
          ...prev,
          [name]: [...(prev[name] || []), ...filePreviews],
        };
      } else if (
        prev.categoryData?.extraFields &&
        name in prev.categoryData.extraFields
      ) {
        return {
          ...prev,
          categoryData: {
            ...prev.categoryData,
            extraFields: {
              ...prev.categoryData.extraFields,
              [name]: value,
            },
          },
        };
      } else if (type === "file") {
        // ...
      } else {
        // flat fields
        return { ...prev, [name]: value };
      }
    });
  };

  const handleBusinessHourChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedHours = [...prev.businessHours];
      updatedHours[index] = {
        ...updatedHours[index],
        [field]: value,
      };
      return {
        ...prev,
        businessHours: updatedHours,
      };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files?.length) return;

    const fileArray = Array.from(files);

    if (name === "profilePhoto" || name === "Banner") {
      const file = fileArray[0];
      const preview = URL.createObjectURL(file);

      setFormData((prev) => {
        if (prev[name]?.preview) URL.revokeObjectURL(prev[name].preview);
        return {
          ...prev,
          [name]: { file, preview }, // ✅ Store both
        };
      });
    } else if (name === "galleryImages" || name === "certificateImages") {
      const key = name;
      const newItems = fileArray
        .filter(
          (file) =>
            !formData[key]?.some(
              (existing) =>
                existing.file?.name === file.name &&
                existing.file?.size === file.size
            )
        )
        .map((file) => ({
          // name: file.name,
          // size: file.size,
          file,
          preview: URL.createObjectURL(file),
        }));

      setFormData((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...newItems],
      }));
    } else if (name === "businessHours") {
      handleBusinessHourChange();
    }
  };

  const renderStepIndicator = () => {
    const steps = ["basic", "contact", "location", "hours", "media", "review"];
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                steps.indexOf(currentStep) >= index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 ${
                  steps.indexOf(currentStep) > index
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  const renderBasicInfoStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Basic Information</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="ownerName"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Owner Name *
          </label>
          <div className="relative">
            <UserIcon className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.ownerName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="experience"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Experience
          </label>
          <div className="relative">
            <Briefcase className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="experience"
              name="experience"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="businessName"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Business Name *
          </label>
          <div className="relative">
            <Building className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="businessName"
              name="businessName"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.businessName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Business Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {/* <option value="retail">Retail</option> */}
            {/* <option value="service">Service</option> */}
            <option value="Health">Healthcare</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Beauty">Beauty & Spa</option>
          </select>
          {formData.category === "Health" && (
            <div>
              <div className="mt-3">
                <label
                  htmlFor="appointmentLink"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Appointment Link
                </label>
                <div className="relative">
                  <Link2 className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                  <input
                    type="text"
                    id="appointmentLink"
                    name="appointmentLink"
                    required
                    className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.categoryData.appointmentLink || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  htmlFor="affiliationLink"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Affiliation
                </label>
                <div className="relative">
                  <UserCheck className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                  <input
                    type="text"
                    id="affiliation"
                    name="affiliation"
                    required
                    className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.categoryData.affiliation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  htmlFor="registerNumber"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Registration Number
                </label>
                <div className="relative">
                  <Key className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                  <input
                    type="text"
                    id="registerNumber"
                    name="registerNumber"
                    required
                    className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.categoryData.registerNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="speciality"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            speciality *
          </label>
          <div className="relative">
            <Badge className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="speciality"
              name="speciality"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.categoryData.speciality}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="YearOfEstablishment"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Year of Establishment *
          </label>
          <div className="relative">
            <CalendarDays className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="yearofEstablishment"
              name="YearOfEstablishment"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.categoryData.YearOfEstablishment}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Business Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderContactStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Business Email *
          </label>
          <div className="relative">
            <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Business Phone *
          </label>
          <div className="relative">
            <Phone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="website"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <div className="relative">
            <Globe className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="url"
              id="website"
              name="website"
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Location Information</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="address"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Street Address *
          </label>
          <div className="relative">
            <MapPin className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="address"
              name="address"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.location?.address || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.location?.city}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.location?.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            ZIP Code *
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData?.location?.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderHoursStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Business Hours</h2>
      <div className="space-y-6">
        {formData.businessHours.map((bh, index) => (
          <div key={bh.day} className="flex items-center space-x-4">
            <div className="w-24 capitalize">{bh.day}</div>

            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Open
              </label>
              <div className="relative">
                <Clock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                <input
                  type="time"
                  value={bh.open}
                  onChange={(e) =>
                    handleBusinessHourChange(index, "open", e.target.value)
                  }
                  className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Close
              </label>
              <div className="relative">
                <Clock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                <input
                  type="time"
                  value={bh.close}
                  onChange={(e) =>
                    handleBusinessHourChange(index, "close", e.target.value)
                  }
                  className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMediaStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Photos & Media</h2>
      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="w-12 h-12 mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="profilePhoto"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a Profile Photo</span>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
        {/* Banner Image */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Banner
          </label>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="w-12 h-12 mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="Banner"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a Banner Photo</span>
                  <input
                    id="Banner"
                    name="Banner"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
        {/* Certifications */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Certifications
          </label>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="w-12 h-12 mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="certificateImages"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload Certifications</span>
                  <input
                    id="certificateImages"
                    name="certificateImages"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="application/pdf"
                    onChange={handleInputChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
            </div>
          </div>
        </div>
        {formData?.certificateImages?.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Selected Certifications
            </h3>
            <ul className="space-y-2">
              {formData.certificateImages.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                >
                  <span className="w-2/3 text-sm font-medium text-gray-800 truncate">
                    {file.file.name}
                  </span>
                  <a
                    href={file.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Gallery
          </label>
          <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="w-12 h-12 mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="galleryImages"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload photos</span>
                  <input
                    id="galleryImages"
                    name="galleryImages"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
            </div>
          </div>
        </div>
        {formData?.galleryImages?.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Selected Photos
            </h3>
            <div className="flex gap-4 h-45">
              {formData.galleryImages.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo.preview}
                    alt={`Business photo ${index + 1}`}
                    className="h-full rounded-md object-fit w-45"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* video URL */}
        <div>
          <label
            htmlFor="videoUrl"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Video Url
          </label>
          <div className="relative">
            <VideoIcon className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="videoUrl"
              name="videoUrl"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.categoryData?.extraFields?.videoUrl}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Facebook */}
        <div>
          <label
            htmlFor="facebook"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Facebook
          </label>
          <div className="relative">
            <FaFacebook className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="facebook"
              name="facebook"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.socialLinks?.facebook}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* instagram */}
        <div>
          <label
            htmlFor="instagram"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            instagram
          </label>
          <div className="relative">
            <FaFacebook className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
            <input
              type="text"
              id="instagram"
              name="instagram"
              required
              className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.socialLinks?.instagram}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    return (
      <>
        {formData && Object.keys(formData).length > 0 && (
          <StoreDetailPage data={formData} />
        )}
      </>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "basic":
        return renderBasicInfoStep();
      case "contact":
        return renderContactStep();
      case "location":
        return renderLocationStep();
      case "hours":
        return renderHoursStep();
      case "media":
        return renderMediaStep();
      case "review":
        return renderReviewStep();
      default:
        return null;
    }
  };

  const handleNext = () => {
    const steps = ["basic", "contact", "location", "hours", "media", "review"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      console.log(formData);

      handleSubmit();
      if (formData.category == "Health") {
        slug = "health";
      }
      console.log(slug);
      // navigate(`/categories/health`);
    }
  };

  const handleBack = () => {
    const steps = ["basic", "contact", "location", "hours", "media", "review"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="pt-20">
      <div className="py-16 text-white bg-blue-900">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold">List Your Business</h1>
          <p className="text-xl text-blue-100">
            Get your business in front of thousands of potential customers
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="mx-auto ">
          {renderStepIndicator()}

          <div className="p-8 bg-white rounded-lg ">
            {renderCurrentStep()}

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={currentStep === "basic"}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {currentStep === "review" ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBusinessPage;
