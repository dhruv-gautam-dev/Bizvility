import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Star,
  Users,
  BarChart as ChartBar,
  MessageSquare,
} from "lucide-react";

const BusinessListingPage = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Basic",
      price: 0,
      description: "Perfect for getting started",
      features: [
        "One time platform registration ",
        "Google Business Account ",
        "Business Name",
        "Category",
        "City and Locality",
        "Business type(online / offline / home services)",
        "Profile Picture",
        "Opening Hours",
      ],
    },
    // {
    //   name: "Professional",
    //   price: 99,
    //   description: "Most popular for growing businesses",
    //   features: [
    //     "Everything in Basic",
    //     "Featured in search results",
    //     "Photo gallery (up to 10 photos)",
    //     "Respond to reviews",
    //     "Business analytics",
    //     "Priority support",
    //   ],
    //   recommended: true,
    // },
    {
      name: "Premium",
      price: 2000,
      description: "Best for established businesses",
      features: [
        "Everything in Professional",
        "Top search placement",
        "Unlimited photos",
        "Social media integration",
        "Advanced analytics",
        "Dedicated account manager",
        "Marketing tools",
      ],
    },
  ];

  const handleGetStarted = () => {
    navigate("/list-business/form");
  };

  return (
    <div className="pt-20">
      <div className="py-16 text-white bg-blue-900">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold">List Your Business</h1>
          <p className="text-xl text-blue-100">
            Choose the perfect plan for your business
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Why List with Bizvility?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful businesses reaching new customers
              every day
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">1M+ Monthly Users</h3>
              <p className="text-gray-600">
                Connect with potential customers actively searching for services
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Trusted Reviews</h3>
              <p className="text-gray-600">
                Build credibility with verified customer reviews
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                <ChartBar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Growth Opportunities
              </h3>
              <p className="text-gray-600">New business development channels</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                <MessageSquare className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Direct Messaging</h3>
              <p className="text-gray-600">
                Communicate directly with interested customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.recommended ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.recommended && (
                <div className="py-2 text-sm font-medium text-center text-white bg-blue-500">
                  Recommended
                </div>
              )}
              <div className="p-8">
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mb-6 text-gray-600">{plan.description}</p>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    plan.recommended
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 mt-16 text-center bg-gray-50 rounded-xl">
          <h2 className="mb-4 text-2xl font-bold">Need Help Choosing?</h2>
          <p className="mb-6 text-gray-600">
            Our team is here to help you select the best plan for your business
            needs.
          </p>
          <button className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessListingPage;
