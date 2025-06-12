import React, { useState } from 'react';
import { Phone, Mail, Building, MapPin, Clock, Globe, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListBusinessPage = () => {
    const [currentStep, setCurrentStep] = useState('basic');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Basic Info
        businessName: '',
        category: '',
        description: '',
        // Contact
        email: '',
        phone: '',
        website: '',
        // Location
        address: '',
        city: '',
        state: '',
        zipCode: '',
        // Hours
        mondayOpen: '',
        mondayClose: '',
        tuesdayOpen: '',
        tuesdayClose: '',
        wednesdayOpen: '',
        wednesdayClose: '',
        thursdayOpen: '',
        thursdayClose: '',
        fridayOpen: '',
        fridayClose: '',
        saturdayOpen: '',
        saturdayClose: '',
        sundayOpen: '',
        sundayClose: '',
        // Media
        photos: [],
        logo: null,
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            if (e.target.name === 'logo') {
                setFormData({
                    ...formData,
                    logo: e.target.files[0],
                });
            } else if (e.target.name === 'photos') {
                setFormData({
                    ...formData,
                    photos: Array.from(e.target.files),
                });
            }
        }
    };

    const renderStepIndicator = () => {
        const steps = ['basic', 'contact', 'location', 'hours', 'media', 'review'];
        return (
            <div className="flex items-center justify-center mb-8">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                steps.indexOf(currentStep) >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-12 h-1 ${
                                    steps.indexOf(currentStep) > index ? 'bg-blue-600' : 'bg-gray-200'
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
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name *
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.businessName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Category *
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a category</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="retail">Retail</option>
                        <option value="service">Service</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="professional">Professional Services</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );

    const renderContactStep = () => (
        <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Email *
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Phone *
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                    </label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="url"
                            id="website"
                            name="website"
                            className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <h2 className="text-2xl font-bold mb-6">Location Information</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State *
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );

    const renderHoursStep = () => (
        <div>
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-6">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-4">
                        <div className="w-24">
                            <span className="capitalize">{day}</span>
                        </div>
                        <div className="flex-1 flex items-center space-x-4">
                            <div className="flex-1">
                                <label htmlFor={`${day}Open`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Open
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="time"
                                        id={`${day}Open`}
                                        name={`${day}Open`}
                                        className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData[`${day}Open`]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label htmlFor={`${day}Close`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Close
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="time"
                                        id={`${day}Close`}
                                        name={`${day}Close`}
                                        className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <h2 className="text-2xl font-bold mb-6">Photos & Media</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Logo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="logo"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Upload a logo</span>
                                    <input
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Photos
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="photos"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Upload photos</span>
                                    <input
                                        id="photos"
                                        name="photos"
                                        type="file"
                                        className="sr-only"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                        </div>
                    </div>
                </div>

                {formData.photos.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Photos</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {formData.photos.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt={`Business photo ${index + 1}`}
                                        className="h-24 w-full object-cover rounded-md"
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
            <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p><strong>Business Name:</strong> {formData.businessName}</p>
                        <p><strong>Category:</strong> {formData.category}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Website:</strong> {formData.website}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p><strong>Address:</strong> {formData.address}</p>
                        <p><strong>City:</strong> {formData.city}</p>
                        <p><strong>State:</strong> {formData.state}</p>
                        <p><strong>ZIP Code:</strong> {formData.zipCode}</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Submit Listing
                    </button>
                </div>
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'basic':
                return renderBasicInfoStep();
            case 'contact':
                return renderContactStep();
            case 'location':
                return renderLocationStep();
            case 'hours':
                return renderHoursStep();
            case 'media':
                return renderMediaStep();
            case 'review':
                return renderReviewStep();
            default:
                return null;
        }
    };

    const handleNext = () => {
        const steps = ['basic', 'contact', 'location', 'hours', 'media', 'review'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const steps = ['basic', 'contact', 'location', 'hours', 'media', 'review'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    return (
        <div className="pt-20">
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">List Your Business</h1>
                    <p className="text-xl text-blue-100">Get your business in front of thousands of potential customers</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    {renderStepIndicator()}

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        {renderCurrentStep()}

                        <div className="mt-8 flex justify-between">
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                disabled={currentStep === 'basic'}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {currentStep === 'review' ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListBusinessPage;