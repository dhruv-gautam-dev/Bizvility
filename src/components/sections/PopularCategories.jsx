import React from "react";
import {
  Utensils,
  ShoppingBag,
  Stethoscope,
  Home,
  Car,
  Briefcase,
  Scissors,
  Dumbbell,
} from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ icon, title, count, color, path }) => {
  return (
    <Link
      to={path}
      className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-xl hover:shadow-md"
    >
      <div className="flex flex-col items-center p-6 text-center">
        <div
          className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{count} listings</p>
      </div>
    </Link>
  );
};

const PopularCategories = () => {
  const categories = [
    {
      icon: <Utensils className="w-8 h-8 text-white" />,
      title: "Restaurants & Food",
      count: 1283,
      color: "bg-red-500",
      path: "/categories/restaurants",
      // },
      // {
      //   icon: <ShoppingBag className="w-8 h-8 text-white" />,
      //   title: 'Shopping & Retail',
      //   count: 964,
      //   color: 'bg-blue-500',
      //   path: '/categories/shopping'
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-white" />,
      title: "Health & Medical",
      count: 752,
      color: "bg-green-500",
      path: "/categories/health",
    },
    // {
    //   icon: <Home className="w-8 h-8 text-white" />,
    //   title: 'Home Services',
    //   count: 639,
    //   color: 'bg-yellow-500',
    //   path: '/categories/home-services'
    // },
    // {
    //   icon: <Car className="w-8 h-8 text-white" />,
    //   title: 'Automotive',
    //   count: 548,
    //   color: 'bg-purple-500',
    //   path: '/categories/automotive'
    // },
    // {
    //   icon: <Briefcase className="w-8 h-8 text-white" />,
    //   title: 'Professional Services',
    //   count: 475,
    //   color: 'bg-indigo-500',
    //   path: '/categories/professional'
    // },
    {
      icon: <Scissors className="w-8 h-8 text-white" />,
      title: "Beauty & Spa",
      count: 426,
      color: "bg-pink-500",
      path: "/categories/beauty",
    },
    // {
    //   icon: <Dumbbell className="w-8 h-8 text-white" />,
    //   title: "Fitness & Wellness",
    //   count: 384,
    //   color: "bg-orange-500",
    //   path: "/categories/fitness",
    // },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our most popular business categories with thousands of
            verified listings
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/categories"
            className="inline-flex items-center px-6 py-3 text-blue-600 transition-colors border border-blue-600 rounded-md hover:bg-blue-50"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
