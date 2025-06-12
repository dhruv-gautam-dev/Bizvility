import React from 'react';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

const TermsPage = () => {
  const handleContact = () => {
    // Placeholder for contacting legal team
    console.log('Contacting legal team');
    alert('Contact form opened');
  };

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100">Last updated: March 15, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl lg:max-w-4xl mx-auto prose prose-lg prose-blue">
          <p className="lead text-xl text-gray-600 mb-12">
            Please read these Terms of Service carefully before using Bizvility. By using our service, 
            you agree to be bound by these terms.
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-600">
                By accessing or using Bizvility, you agree to be bound by these Terms of Service and all 
                applicable laws and regulations. If you do not agree with any of these terms, you are 
                prohibited from using or accessing this site.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">2. Use License</h2>
              </div>
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of the materials (information or software) 
                on Bizvility for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-gray-600">
                This license shall automatically terminate if you violate any of these restrictions and may be 
                terminated by Bizvility at any time.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">3. User Accounts</h2>
              </div>
              <p className="text-gray-600">
                When you create an account with us, you must provide accurate, complete, and current information. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of 
                your account.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">4. Business Listings</h2>
              </div>
              <p className="text-gray-600">Business owners are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate business information</li>
                <li>Maintaining and updating their listings</li>
                <li>Responding to customer inquiries and reviews</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">5. Reviews and Content</h2>
              </div>
              <p className="text-gray-600">
                Users may post reviews and other content as long as the content is not illegal, obscene, 
                threatening, defamatory, invasive of privacy, infringing of intellectual property rights, 
                or otherwise injurious to third parties.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">6. Payment Terms</h2>
              </div>
              <p className="text-gray-600">For premium services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments are processed securely through our payment providers</li>
                <li>Subscriptions will automatically renew unless cancelled</li>
                <li>Refunds are handled according to our refund policy</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">7. Disclaimer</h2>
              </div>
              <p className="text-gray-600">
                The materials on Bizvility are provided on an 'as is' basis. Bizvility makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including, without limitation, implied warranties or conditions of merchantability, fitness 
                for a particular purpose, or non-infringement of intellectual property or other violation 
                of rights.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">8. Limitations</h2>
              </div>
              <p className="text-gray-600">
                In no event shall Bizvility or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on Bizvility.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">9. Governing Law</h2>
              </div>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws of 
                the United States and you irrevocably submit to the exclusive jurisdiction of the courts 
                in that location.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">10. Changes to Terms</h2>
              </div>
              <p className="text-gray-600">
                Bizvility reserves the right, at its sole discretion, to modify or replace these Terms 
                at any time. What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 mt-12">
              <div className="flex items-center mb-4">
                <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">legal@Bizvility.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">123 Directory Street, San Francisco, CA 94107</span>
                </div>
              </div>
              <button
                onClick={handleContact}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                aria-label="Contact Legal Team"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;