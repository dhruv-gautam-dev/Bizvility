import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Users, BarChart as ChartBar, MessageSquare } from 'lucide-react';

const BusinessListingPage = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'Basic',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        'Basic business profile',
        'Contact information display',
        'Business hours',
        'Map location',
        'Customer reviews'
      ]
    },
    {
      name: 'Professional',
      price: 99,
      description: 'Most popular for growing businesses',
      features: [
        'Everything in Basic',
        'Featured in search results',
        'Photo gallery (up to 10 photos)',
        'Respond to reviews',
        'Business analytics',
        'Priority support'
      ],
      recommended: true
    },
    {
      name: 'Premium',
      price: 999,
      description: 'Best for established businesses',
      features: [
        'Everything in Professional',
        'Top search placement',
        'Unlimited photos',
        'Social media integration',
        'Advanced analytics',
        'Dedicated account manager',
        'Marketing tools'
      ]
    }
  ];

  const handleGetStarted = () => {
    navigate('/list-business/form');
  };

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">List Your Business</h1>
          <p className="text-xl text-blue-100">Choose the perfect plan for your business</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why List with Bizvility?</h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful businesses reaching new customers every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1M+ Monthly Users</h3>
              <p className="text-gray-600">Connect with potential customers actively searching for services</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">Build credibility with verified customer reviews</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">New business development channels</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Direct Messaging</h3>
              <p className="text-gray-600">Communicate directly with interested customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.recommended ? 'ring-2 ring-blue-500' : ''
                }`}
            >
              {plan.recommended && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  Recommended
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you select the best plan for your business needs.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessListingPage;