import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, FileText, LifeBuoy, Phone } from 'lucide-react';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I list my business on Bizvility?",
      answer: "To list your business, click on the 'List Business' button in the navigation bar. Follow the step-by-step process to create your business profile. You'll need to provide basic information about your business, including name, address, contact details, and category."
    },
    {
      question: "What are the benefits of a premium listing?",
      answer: "Premium listings offer enhanced visibility, including featured placement in search results, the ability to add multiple photos, detailed business descriptions, direct messaging with customers, and access to advanced analytics about your listing's performance."
    },
    {
      question: "How can I update my business information?",
      answer: "Log in to your Bizvility account, navigate to your business dashboard, and click on 'Edit Profile'. You can update your business information, hours, photos, and other details from there."
    },
    {
      question: "How do I respond to customer reviews?",
      answer: "As a verified business owner, you can respond to customer reviews through your business dashboard. Navigate to the 'Reviews' section, find the review you want to respond to, and click 'Reply'."
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-blue-100">How can we help you today?</p>

          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8_PRIOR_PAGE_ID: 8e1d-4c7a-b3e2-4a8c9d6e0f1b h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-4">Browse our help articles and guides</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              View Articles
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LifeBuoy className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us an email, we'll respond within 24h</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Email Us
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Call us Mon-Fri, 9am-6pm EST</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Call Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="max-w-3xl mt-16 bg-gray-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-6 text-start">Still Need Help?</h2>
            <p className="text-gray-600 mb-6 text-start">
            Our dedicated support team is available 24/7 to help you with any questions, concerns, or technical issues you may encounter. Whether you're setting up your account, troubleshooting a problem, or just need guidance on using our services, we're here to assist you at any time.
            </p>
            <div className='text-end pt-4'>
            <button className="px-8 py-3 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportPage;