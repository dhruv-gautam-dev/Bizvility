import React, { useState } from "react";
import {
  Phone,
  Mail,
  Building,
  MapPin,
  Clock,
  Globe,
  Camera,
  UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListBusinessPage = () => {
  const [currentStep, setCurrentStep] = useState("basic");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Info
    ownerName: "",
    businessName: "",
    category: "",
    description: "",
    // Contact
    email: "",
    phone: "",
    website: "",
    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Hours
    mondayOpen: "",
    mondayClose: "",
    tuesdayOpen: "",
    tuesdayClose: "",
    wednesdayOpen: "",
    wednesdayClose: "",
    thursdayOpen: "",
    thursdayClose: "",
    fridayOpen: "",
    fridayClose: "",
    saturdayOpen: "",
    saturdayClose: "",
    sundayOpen: "",
    sundayClose: "",
    // Media
    Gallery: [],
    profilePhoto: null,
    Banner: null,
    Certifications: [],
  });
  console.log(formData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.name === "profilePhoto") {
        setFormData({
          ...formData,
          profilePhoto: e.target.files[0],
        });
      } else if (e.target.name === "Gallery") {
        setFormData({
          ...formData,
          Gallery: [
            ...formData.Gallery,
            ...Array.from(e.target.files).filter(
              (newFile) =>
                !formData.Gallery.some(
                  (existing) =>
                    existing.name === newFile.name &&
                    existing.size === newFile.size
                )
            ),
          ],
        });
      } else if (e.target.name === "Banner") {
        setFormData({
          ...formData,
          Banner: e.target.files[0],
        });
      } else if (e.target.name === "Certifications") {
        setFormData({
          ...formData,
          Certifications: [
            ...formData.Certifications,
            ...Array.from(e.target.files).filter(
              (newFile) =>
                !formData.Certifications.some(
                  (existing) =>
                    existing.name === newFile.name &&
                    existing.size === newFile.size
                )
            ),
          ],
        });
      }
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
            <option value="healthcare">Healthcare</option>
            <option value="restaurant">Restaurant</option>
            <option value="Beauty & Spa">Beauty & Spa</option>
          </select>
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
              value={formData.address}
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
              value={formData.city}
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
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="zipCode"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            ZIP Code *
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.zipCode}
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
        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day) => (
          <div key={day} className="flex items-center space-x-4">
            <div className="w-24">
              <span className="capitalize">{day}</span>
            </div>
            <div className="flex items-center flex-1 space-x-4">
              <div className="flex-1">
                <label
                  htmlFor={`${day}Open`}
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Open
                </label>
                <div className="relative">
                  <Clock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                  <input
                    type="time"
                    id={`${day}Open`}
                    name={`${day}Open`}
                    className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData[`${day}Open`]}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor={`${day}Close`}
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Close
                </label>
                <div className="relative">
                  <Clock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
                  <input
                    type="time"
                    id={`${day}Close`}
                    name={`${day}Close`}
                    className="w-full px-5 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData[`${day}Close`]}
                    onChange={handleInputChange}
                  />
                </div>
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
                  htmlFor="Certifications"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload Certifications</span>
                  <input
                    id="Certifications"
                    name="Certifications"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
            </div>
          </div>
        </div>
        {formData.Certifications.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Selected Certifications
            </h3>
            <ul className="space-y-2">
              {formData.Certifications.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                >
                  <span className="w-2/3 text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </span>
                  <a
                    href={URL.createObjectURL(file)}
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
                  htmlFor="Gallery"
                  className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload photos</span>
                  <input
                    id="Gallery"
                    name="Gallery"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
            </div>
          </div>
        </div>

        {formData.Gallery.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Selected Photos
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {formData.Gallery.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Business photo ${index + 1}`}
                    className="object-cover w-full h-24 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Review Your Information</h2>
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Basic Information</h3>
          <div className="p-4 rounded-md bg-gray-50">
            <p>
              <strong>Business Name:</strong> {formData.businessName}
            </p>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
          <div className="p-4 rounded-md bg-gray-50">
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Website:</strong> {formData.website}
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Location</h3>
          <div className="p-4 rounded-md bg-gray-50">
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>City:</strong> {formData.city}
            </p>
            <p>
              <strong>State:</strong> {formData.state}
            </p>
            <p>
              <strong>ZIP Code:</strong> {formData.zipCode}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );

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
        <div className="max-w-3xl mx-auto">
          {renderStepIndicator()}

          <div className="p-8 bg-white rounded-lg shadow-sm">
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
