import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Briefcase, Mail, Phone, User, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const JobApplicationPage = () => {
  const { jobTitle, jobSkills, jobExperience } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const careerId = location.state?.careerId || localStorage.getItem('selectedCareerId');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    resume: null,
    cover_letter: '',
    linkedin_profile: '',
    portfolio_website: '',
    experience: '',
    info_source: ''
  });
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackJobData = {
    title: jobTitle || 'Software Engineer',
    department: 'Not specified',
    location: 'Not specified',
    employment_type: 'Not specified',
    experience: jobExperience || 'Not specified',
    salary_range: 'Not specified',
    postedDate: 'Not specified',
    description: jobSkills || 'No description available.',
    responsibilities: ['Not specified'],
    requirements: ['Not specified'],
    benefits: ['Not specified']
  };

  useEffect(() => {
    if (!careerId) {
      toast.error('Career ID not found. Redirecting to Careers page...');
      setTimeout(() => {
        navigate('/careers');
      }, 2000);
      return;
    }

    const fetchJobData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in and try again.');
        setJobData(fallbackJobData);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Step 1: Fetching job data with careerId:', careerId);
        console.log('Step 2: Using token:', token);

        const response = await axios.get(`http://localhost:5500/bizivility/carrers/${careerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Step 3: Raw API Response:', response);
        console.log('Step 4: API Response Data:', response.data);

        let data = response.data;
        if (data.data && !data.title) {
          data = data.data;
          console.log('Step 5: Adjusted API Data (unwrapped):', data);
        }

        if (!data || Object.keys(data).length === 0) {
          throw new Error('No job data returned from API.');
        }

        const mappedJobData = {
          title: data.title || fallbackJobData.title,
          department: data.department || fallbackJobData.department,
          location: data.location || fallbackJobData.location,
          employment_type: data.employment_type || fallbackJobData.employment_type,
          experience: data.experience || fallbackJobData.experience,
          salary_range: data.salary_range || fallbackJobData.salary_range,
          postedDate: data.created_at || fallbackJobData.postedDate,
          description: data.description || fallbackJobData.description,
          responsibilities: data.responsibilities || fallbackJobData.responsibilities,
          requirements: data.requirements || fallbackJobData.requirements,
          benefits: data.benefits || fallbackJobData.benefits
        };

        console.log('Step 6: Mapped Job Data:', mappedJobData);
        setJobData(mappedJobData);
      } catch (err) {
        console.error('Error fetching job data:', err);
        if (err.response) {
          console.log('Response status:', err.response.status);
          console.log('Response data:', err.response.data);
          toast.error(`Failed to load job details: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          console.log('No response received:', err.request);
          toast.error('Failed to load job details: No response from server. Please check if the server is running on localhost:5500.');
        } else {
          console.log('Error message:', err.message);
          toast.error(`Failed to load job details: ${err.message}`);
        }
        setJobData(fallbackJobData);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [careerId, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in and try again.');
      return;
    }

    // Client-side validation for required fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.contact_number || !formData.experience || !formData.info_source) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.resume) {
      toast.error('Please upload a resume.');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('first_name', formData.first_name);
    formDataToSubmit.append('last_name', formData.last_name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('contact_number', formData.contact_number);
    formDataToSubmit.append('resume', formData.resume);
    formDataToSubmit.append('cover_letter', formData.cover_letter);
    formDataToSubmit.append('linkedin_profile', formData.linkedin_profile);
    formDataToSubmit.append('portfolio_website', formData.portfolio_website);
    formDataToSubmit.append('experience', formData.experience);
    formDataToSubmit.append('info_source', formData.info_source);
    console.log("Vishal", formDataToSubmit);

    try {
      console.log('Submitting application to API with data:', Object.fromEntries(formDataToSubmit));
      const response = await axios.post(`http://localhost:5500/bizivility/jobs/apply/${careerId}`, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Application submission response:', response.data);
      toast.success('Application submitted successfully!');
      localStorage.removeItem('selectedCareerId');

      setTimeout(() => {
        navigate('/careers');
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      if (err.response) {
        console.log('Response status:', err.response.status);
        console.log('Response data:', err.response.data);
        toast.error(`Failed to submit application: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        console.log('No response received:', err.request);
        toast.error('Failed to submit application: No response from server. Please check if the server is running.');
      } else {
        console.log('Error message:', err.message);
        toast.error(`Failed to submit application: ${err.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Loading job details...</p>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{jobData.title}</h1>
          <div className="flex flex-wrap gap-4 text-blue-100">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              {jobData.department}
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {jobData.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {jobData.employment_type}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {jobData.experience}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              {jobData.salary_range}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Job Overview</h2>
              <p className="text-gray-600 mb-6">{jobData.description}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {jobData.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {jobData.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {jobData.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Posted Date</h3>
              <p className="text-gray-600">{jobData.postedDate}</p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        required
                        className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        required
                        className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
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
                  <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="contact_number"
                      name="contact_number"
                      required
                      className="pl-10 w-full border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </label>
                    {formData.resume && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected file: {formData.resume.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    id="cover_letter"
                    name="cover_letter"
                    rows={6}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedin_profile" className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin_profile"
                      name="linkedin_profile"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.linkedin_profile}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio_website" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      id="portfolio_website"
                      name="portfolio_website"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.portfolio_website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="info_source" className="block text-sm font-medium text-gray-700 mb-2">
                    How Did You Hear About This Job? *
                  </label>
                  <select
                    id="info_source"
                    name="info_source"
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.info_source}
                    onChange={handleInputChange}
                  >
                    <option value="">Select source</option>
                    <option value="Company Website">Company Website</option>
                    <option value="Job Board">Job Board</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;