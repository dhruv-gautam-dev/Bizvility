import React from 'react';
import { Cookie, Mail, Phone, MapPin } from 'lucide-react';

const CookiesPage = () => {
  const handleContact = () => {
    // Placeholder for contacting support team
    console.log('Contacting support team');
    alert('Contact form opened');
  };

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Cookies Policy</h1>
          <p className="text-xl text-blue-100">Last updated: March 15, 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl lg:max-w-4xl mx-auto prose prose-lg prose-blue">
          <p className="lead text-xl text-gray-600 mb-12">
            At Bizvility, we use cookies and similar technologies to enhance your experience, analyze site performance, 
            and deliver personalized content. This Cookies Policy explains what cookies are, how we use them, and your choices regarding their use.
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">What Are Cookies?</h2>
              </div>
              <p className="text-gray-600">
                Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, 
                analyze how you use our site, and provide tailored content. Cookies may be session-based (temporary) or persistent (stored for longer periods).
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
              </div>
              <p className="text-gray-600">
                We use the following types of cookies on Bizvility:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies</strong>: Required for the website to function, such as maintaining your login session or enabling core features.
                </li>
                <li>
                  <strong>Analytics Cookies</strong>: Help us understand how users interact with our site by collecting anonymized data on page views, clicks, and navigation.
                </li>
                <li>
                  <strong>Marketing Cookies</strong>: Used to deliver personalized ads and track the effectiveness of our marketing campaigns, with your consent.
                </li>
                <li>
                  <strong>Functional Cookies</strong>: Enhance your experience by remembering your preferences, such as language or region settings.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Cookies</h2>
              </div>
              <p className="text-gray-600">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure our website operates smoothly and securely.</li>
                <li>Analyze site usage to improve performance and user experience.</li>
                <li>Personalize content and ads based on your interests (with consent).</li>
                <li>Remember your settings and preferences for a seamless experience.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Managing Your Cookie Preferences</h2>
              </div>
              <p className="text-gray-600">
                You can control how cookies are used on Bizvility:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookie Consent</strong>: Upon visiting our site, you can accept or customize cookie settings via our consent banner.
                </li>
                <li>
                  <strong>Browser Settings</strong>: Most browsers allow you to block or delete cookies. Visit your browser’s help section for instructions.
                </li>
                <li>
                  <strong>Opt-Out Tools</strong>: Use tools like the Network Advertising Initiative (NAI) or Digital Advertising Alliance (DAA) to opt out of targeted ads.
                </li>
              </ul>
              <p className="text-gray-600">
                Note: Disabling cookies may affect the functionality of our website.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Third-Party Cookies</h2>
              </div>
              <p className="text-gray-600">
                Some cookies are set by third-party services we use, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for site usage tracking.</li>
                <li>Advertising partners for personalized ads.</li>
                <li>Social media platforms for sharing content.</li>
              </ul>
              <p className="text-gray-600">
                These third parties may collect and process data according to their own privacy policies.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Changes to This Policy</h2>
              </div>
              <p className="text-gray-600">
                We may update our Cookies Policy to reflect changes in our practices or legal requirements. 
                We will notify you by updating the “Last updated” date on this page and, where required, through additional notifications.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 mt-12">
              <div className="flex items-center mb-4">
                <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              <p className="text-gray-600 mb-4">
                If you have any questions about our Cookies Policy, please contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">privacy@Bizvility.com</span>
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
                aria-label="Contact Support Team"
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

export default CookiesPage;