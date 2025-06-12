import React from 'react';
import { Users, Target, Shield, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Bizvility</h1>
          <p className="text-xl text-blue-100">Connecting people with great local businesses since 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <p className="text-xl text-gray-600 mb-8">
              Bizvility is the leading platform for discovering and connecting with local businesses. 
              Our mission is to help people find the best services and help businesses thrive in their communities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-gray-600">Building stronger local communities through trusted business connections.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Quality Focus</h3>
                  <p className="text-gray-600">Maintaining high standards for business listings and user reviews.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                  <p className="text-gray-600">Ensuring a secure and reliable platform for all users.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">Recognizing and promoting outstanding local businesses.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2025, Bizvility began with a simple idea: make it easier for people to find and 
              connect with great local businesses. Today, we've grown into a comprehensive platform that serves 
              millions of users and businesses across the country.
            </p>

            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
                <div className="text-gray-600">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;