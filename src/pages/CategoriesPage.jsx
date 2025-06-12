import React from 'react';
import CategoryGrid from '../components/sections/CategoryGrid.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';

const CategoriesPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Business Categories</h1>
          <p className="text-xl text-blue-100">Browse all categories to find the perfect business</p>
        </div>
      </div>
      <CategoryGrid />
      <CallToAction />
    </div>
  );
};

export default CategoriesPage;