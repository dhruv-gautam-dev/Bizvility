import { useState } from 'react';
import { PlusIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingFormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    location: '',
    email: '',
    businessHours: [
      { day: 'Monday', isClosed: false, open: '', close: '' },
      { day: 'Tuesday', isClosed: false, open: '', close: '' },
      { day: 'Wednesday', isClosed: false, open: '', close: '' },
      { day: 'Thursday', isClosed: false, open: '', close: '' },
      { day: 'Friday', isClosed: false, open: '', close: '' },
      { day: 'Saturday', isClosed: false, open: '', close: '' },
      { day: 'Sunday', isClosed: false, open: '', close: '' },
    ],
    socialLinks: { twitter: '', facebook: '', instagram: '', linkedin: '', youtube: '' },
    faq: [{ question: '', answer: '' }],
    galleryImages: [],
    profilePhoto: null,
    coverPhoto: null,
    licensesImage: null,
    category: 'Restaurant',
    status: 'Active',
    rating: 0,
    reviews: 0,
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['Restaurant', 'Services', 'Retail', 'Health & Fitness'];
  const totalSteps = 5;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const linkType = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [linkType]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBusinessHoursChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedHours = [...prev.businessHours];
      updatedHours[index] = { ...updatedHours[index], [field]: value };
      if (field === 'isClosed' && value) {
        updatedHours[index].open = '';
        updatedHours[index].close = '';
      }
      return { ...prev, businessHours: updatedHours };
    });
  };

  const handleFAQChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFAQ = [...prev.faq];
      updatedFAQ[index] = { ...updatedFAQ[index], [field]: value };
      return { ...prev, faq: updatedFAQ };
    });
  };

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }],
    }));
    setCurrentFAQIndex(formData.faq.length);
  };

  const removeFAQ = (index) => {
    setFormData((prev) => {
      const updatedFAQ = prev.faq.filter((_, i) => i !== index);
      return {
        ...prev,
        faq: updatedFAQ.length > 0 ? updatedFAQ : [{ question: '', answer: '' }],
      };
    });
    if (currentFAQIndex >= formData.faq.length - 1) {
      setCurrentFAQIndex(Math.max(0, formData.faq.length - 2));
    }
  };

  const prevFAQ = () => {
    setCurrentFAQIndex((prev) => Math.max(0, prev - 1));
  };

  const nextFAQ = () => {
    setCurrentFAQIndex((prev) => Math.min(formData.faq.length - 1, prev + 1));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: url,
      }));
    }
    e.target.value = '';
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 10 - formData.galleryImages.length;
    const newImages = files.slice(0, remainingSlots).map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages],
    }));
    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      galleryImages: updatedImages,
    }));
  };

  const handleSubmit = () => {
    const newListing = {
      id: Date.now(), // Temporary ID for demo purposes
      title: formData.title,
      owner: formData.owner,
      location: formData.location,
      email: formData.email,
      businessHours: formData.businessHours,
      socialLinks: formData.socialLinks,
      faq: formData.faq.filter((faq) => faq.question && faq.answer),
      galleryImages: formData.galleryImages,
      profilePhoto: formData.profilePhoto,
      coverPhoto: formData.coverPhoto,
      licensesImage: formData.licensesImage,
      category: formData.category,
      status: formData.status,
      rating: formData.rating,
      reviews: formData.reviews,
      featured: formData.featured,
      date: formData.date,
    };

    console.log('New Listing Submitted:', newListing);
    toast.success('Listing submitted successfully!', {
      position: "top-right",
      autoClose: 2000,
    });

    // Reset form
    setFormData({
      title: '',
      owner: '',
      location: '',
      email: '',
      businessHours: [
        { day: 'Monday', isClosed: false, open: '', close: '' },
        { day: 'Tuesday', isClosed: false, open: '', close: '' },
        { day: 'Wednesday', isClosed: false, open: '', close: '' },
        { day: 'Thursday', isClosed: false, open: '', close: '' },
        { day: 'Friday', isClosed: false, open: '', close: '' },
        { day: 'Saturday', isClosed: false, open: '', close: '' },
        { day: 'Sunday', isClosed: false, open: '', close: '' },
      ],
      socialLinks: { twitter: '', facebook: '', instagram: '', linkedin: '', youtube: '' },
      faq: [{ question: '', answer: '' }],
      galleryImages: [],
      profilePhoto: null,
      coverPhoto: null,
      licensesImage: null,
      category: 'Restaurant',
      status: 'Active',
      rating: 0,
      reviews: 0,
      featured: false,
      date: new Date().toISOString().split('T')[0],
    });
    setCurrentStep(1);
    setCurrentFAQIndex(0);
  };

  const nextStep = () => {
    const newStep = Math.min(totalSteps, currentStep + 1);
    setCurrentStep(newStep);
  };

  const prevStep = () => {
    const newStep = Math.max(1, currentStep - 1);
    setCurrentStep(newStep);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Listing</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-sm text-gray-600 mb-4">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            {['Basic Info', 'Business Hours', 'Social Links', 'FAQ', 'Images'].map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center py-2 ${
                  currentStep === index + 1
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {currentStep === 1 && (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Listing Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
              {formData.businessHours.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-2 mb-2">
                  <span className="w-24 text-sm text-gray-600">{day.day}</span>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={day.isClosed}
                      onChange={(e) =>
                        handleBusinessHoursChange(index, 'isClosed', e.target.checked)
                      }
                      className="mr-2"
                    />
                    Closed
                  </label>
                  {!day.isClosed && (
                    <>
                      <input
                        type="time"
                        value={day.open}
                        onChange={(e) =>
                          handleBusinessHoursChange(index, 'open', e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">to</span>
                      <input
                        type="time"
                        value={day.close}
                        onChange={(e) =>
                          handleBusinessHoursChange(index, 'close', e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter Link</label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleFormChange}
                  placeholder="https://twitter.com/yourhandle"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook Link</label>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleFormChange}
                  placeholder="https://facebook.com/yourpage"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram Link</label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleFormChange}
                  placeholder="https://instagram.com/yourprofile"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn Link</label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleFormChange}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
                <input
                  type="url"
                  name="socialLinks.youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleFormChange}
                  placeholder="https://youtube.com/channel/yourchannel"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">FAQ</label>
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={prevFAQ}
                      disabled={currentFAQIndex === 0}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                      FAQ {currentFAQIndex + 1} of {formData.faq.length}
                    </span>
                    <button
                      type="button"
                      onClick={nextFAQ}
                      disabled={currentFAQIndex === formData.faq.length - 1}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFAQ(currentFAQIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mb-4 border-b pb-2">
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <input
                      type="text"
                      value={formData.faq[currentFAQIndex].question}
                      onChange={(e) =>
                        handleFAQChange(currentFAQIndex, 'question', e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Answer</label>
                    <textarea
                      value={formData.faq[currentFAQIndex].answer}
                      onChange={(e) =>
                        handleFAQChange(currentFAQIndex, 'answer', e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={addFAQ}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <PlusIcon className="h-5 w-5" />
                Add FAQ
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gallery Images (up to 10)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  disabled={formData.galleryImages.length >= 10}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Gallery ${index}`} className="h-12 w-12 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {formData.galleryImages.length >= 10 && (
                  <p className="text-sm text-red-600 mt-1">Maximum of 10 images reached.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'profilePhoto')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.profilePhoto && (
                  <div className="mt-2">
                    <img src={formData.profilePhoto} alt="Profile" className="h-12 w-12 object-cover rounded" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverPhoto')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.coverPhoto && (
                  <div className="mt-2">
                    <img src={formData.coverPhoto} alt="Cover" className="h-12 w-12 object-cover rounded" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Licenses Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'licensesImage')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.licensesImage && (
                  <div className="mt-2">
                    <img src={formData.licensesImage} alt="License" className="h-12 w-12 object-cover rounded" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <div className="flex-1"></div>
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ListingFormPage;