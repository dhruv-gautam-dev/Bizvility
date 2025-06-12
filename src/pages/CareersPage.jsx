import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const CareersPage = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departments = [
    { name: 'All', count: 10 },
    { name: 'Engineering', count: 5 },
    { name: 'Product', count: 3 },
    { name: 'Marketing', count: 2 },
    { name: 'Sales', count: 4 },
    { name: 'Customer Support', count: 3 },
    { name: 'HR & Operations', count: 2 }
  ];

  const mockCareers = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      experience: 'Full-time',
      salary_range: '$80K-120K',
      description: 'Develop and maintain web applications.',
      skills: 'React, JavaScript'
    },
    {
      id: 2,
      title: 'UX Designer',
      department: 'Product',
      location: 'New York',
      experience: 'Full-time',
      salary_range: '$90K-110K',
      description: 'Design user-friendly interfaces.',
      skills: 'Figma, UX Research'
    }
  ];

  const navigate = useNavigate();

  const handleJobApply = (careerId, jobTitle) => {
    const formattedJobTitle = jobTitle.replace(/\s+/g, '-');
    // Store careerId in localStorage as a backup
    localStorage.setItem('selectedCareerId', careerId);
    // Pass careerId in navigation state
    navigate(`/careers/apply/${formattedJobTitle}`, { state: { careerId } });
  };

  const fetchCareers = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5500/bizivility/carrers/all-active', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;
      console.log(data);

      if (Array.isArray(data)) {
        setCareers(data);
      } else if (Array.isArray(data.data)) {
        setCareers(data.data);
      } else if (Array.isArray(data.careers)) {
        setCareers(data.careers);
      } else {
        throw new Error('Unexpected data structure');
      }
    } catch (error) {
      console.error('Error fetching careers:', error.message);
      setCareers(mockCareers);
      setError('Failed to load career data. Showing sample jobs instead.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const filteredOpenings = selectedDept === 'All'
    ? careers
    : careers.filter(job => job.department === selectedDept);

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Careers at Bizvility</h1>
          <p className="text-xl text-blue-100">Join us in transforming local business discovery</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Join Us?</h2>
          <p className="text-xl text-gray-600">
            We're building the future of local business discovery and we need talented people like you to help us get there.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Impact</h3>
            <p className="text-gray-600">
              Work on products that help millions of businesses and customers connect every day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Growth</h3>
            <p className="text-gray-600">
              Continuous learning opportunities and career development paths.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Culture</h3>
            <p className="text-gray-600">
              Inclusive environment where diverse perspectives are valued.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Open Positions</h2>

          {loading ? (
            <p className="text-gray-500 text-center py-10">Loading career data...</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {departments.map((dept, idx) => (
                  <button
                    key={idx}
                    className={`p-4 rounded-lg text-left border hover:shadow-md transition ${selectedDept === dept.name ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'}`}
                    onClick={() => setSelectedDept(dept.name)}
                  >
                    <h3 className="font-medium">{dept.name}</h3>
                    <p className="text-sm">{dept.count} openings</p>
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {filteredOpenings.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No openings found for {selectedDept}.</p>
                ) : (
                  filteredOpenings.map((job, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm inline-block mt-2 md:mt-0">
                          {job.skills || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        <p>{job.description || 'No description available'}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {job.experience || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary_range || 'N/A'}
                        </div>
                      </div>

                      <button
                        className="mt-4 text-blue-600 font-semibold"
                        onClick={() => handleJobApply(job.id, job.title)}
                      >
                        Apply Now
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;