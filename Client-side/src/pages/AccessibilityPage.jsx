import React from 'react';
import { CheckCircle } from 'lucide-react';

const AccessibilityPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-xl text-blue-100">Our commitment to digital accessibility</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="lead text-xl text-gray-600 mb-8">
            Bizvility is committed to ensuring digital accessibility for people of all abilities. 
            We are continually improving the user experience for everyone and applying the relevant 
            accessibility standards.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <div className="space-y-4 mb-8">
            {[
              'Web Content Accessibility Guidelines (WCAG) 2.1 Level AA compliance',
              'Regular accessibility audits and testing',
              'Ongoing training for our development team',
              'User feedback incorporation',
              'Accessible design principles implementation'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Alt text for images</li>
            <li>Clear heading structure</li>
            <li>Sufficient color contrast</li>
            <li>Resizable text support</li>
            <li>Focus indicators</li>
            <li>Skip navigation links</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <p className="mb-6">
            We welcome your feedback on the accessibility of Bizvility. Please let us know if you 
            encounter accessibility barriers:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li>Email: accessibility@Bizvility.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Directory Street, San Francisco, CA 94107</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-4">Assessment Methods</h2>
          <p className="mb-6">
            We assess the accessibility of Bizvility through the following methods:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>External accessibility audits</li>
            <li>Automated testing tools</li>
            <li>User testing with assistive technologies</li>
            <li>Regular manual testing</li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Formal Complaints</h2>
            <p>
              We aim to respond to accessibility feedback within 2 business days, and to propose a 
              solution within 10 business days. You're entitled to escalate your concern to the 
              enforcement level if you're not happy with our response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;