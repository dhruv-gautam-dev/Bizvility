import React from 'react';
import { Book, FileText, Video, Download } from 'lucide-react';

const ResourcesPage = () => {
  const handleDownload = (resourceName) => {
    // In a real application, this would trigger a file download
    console.log(`Downloading ${resourceName}`);
    alert(`Download started for ${resourceName}`);
  };

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Business Resources</h1>
          <p className="text-xl text-blue-100">Tools and guides to help your business succeed</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-4">Getting Started Guide</h2>
            <p className="text-gray-600 mb-4">
              Learn how to set up and optimize your business listing for maximum visibility.
            </p>
            <button
              onClick={() => handleDownload('Getting Started Guide')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-4">Marketing Templates</h2>
            <p className="text-gray-600 mb-4">
              Ready-to-use templates for social media, email campaigns, and more.
            </p>
            <button
              onClick={() => handleDownload('Marketing Templates')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Templates
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
            <p className="text-gray-600 mb-4">
              Step-by-step video guides on using all Bizvility features.
            </p>
            <button
              onClick={() => handleDownload('Video Tutorials')}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;