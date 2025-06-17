import React from "react";
import { Link, useParams } from "react-router-dom";
import CategoryData from "../data/Categories";
import { MapPin, Phone, Globe, Clock, Star } from "lucide-react";
import { healthCategoryData } from "../data/HealthAndMedical/healthCategoryData";

// console.log(healthCategoryData);

const CategoryDetailPage = () => {
  const { slug, storeId } = useParams();

  //construct the category in such by using loops or something in such a way it stores the details of targeted category data
  const category = CategoryData.find((cat) => cat.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container px-4 py-16 mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Category not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div
        className="relative h-64 bg-center bg-cover"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container flex items-center h-full px-4 mx-auto">
            <div className="text-white">
              <h1 className="mb-4 text-4xl font-bold">{category.name}</h1>
              <p className="text-xl text-gray-200">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">
                Popular in {category.name}
              </h2>
              <div className="grid grid-cols-2 ">
                {healthCategoryData.map((biz) => (
                  <Link
                    to={`/categories/${slug}/store/${biz.id}`}
                    key={biz.id}
                    // state={{ store: biz }}
                    className="block gap-3 p-4 pb-6 border-b border-gray-200 rounded-sm hover:bg-gray-50 last:border-0 last:pb-0"
                  >
                    <div
                      key={biz.id}
                      // store={store}
                      className="pb-6 border-b border-gray-200 rounded-lg last:border-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        <div>
                          <img
                            src={biz.image}
                            alt={biz.alt}
                            className="object-cover w-24 h-24 rounded-lg"
                          />
                          <div className="flex items-center justify-center mt-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-gray-600">
                              {biz.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 ml-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              {biz.name}
                            </h3>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{biz.address}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Phone className="w-4 h-4 mr-1" />
                            <span>{biz.phone}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Globe className="w-4 h-4 mr-1" />
                            <span>{biz.website}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{biz.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Subcategories</h2>
              <div className="space-y-2">
                {category.subcategories.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
                  >
                    <span>{sub}</span>
                    <span className="text-sm text-gray-500">12 listings</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Popular Locations</h2>
              <div className="space-y-2">
                {[
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Houston",
                  "Phoenix",
                ].map((city, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
                  >
                    <span>{city}</span>
                    <span className="text-sm text-gray-500">8 listings</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
