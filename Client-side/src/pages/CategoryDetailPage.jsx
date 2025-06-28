import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryData from "../data/Categories";
import { MapPin, Phone, Globe, Star } from "lucide-react";
import { getAllBusinesses } from "../data/HealthAndMedical/healthCategoryData";

const CategoryDetailPage = () => {
  const { slug } = useParams();
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const imageUrl = import.meta.env.VITE_Image_URL;

  console.log("sug is " + slug);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getAllBusinesses(token);
        console.log("Fetched businesses:", data.businesses);
        setBusinesses(data.businesses);
      } catch (err) {
        console.error("Error loading businesses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, [token]);

  useEffect(() => {
    const match = businesses.filter(
      (biz) => biz.category?.toLowerCase() === slug.toLowerCase()
    );
    console.log("Filtered items:", match);
    setFiltered(match);
  }, [businesses, slug]);

  // Log available slugs from CategoryData to guide normalization
  console.log(
    "Available category slugs:",
    CategoryData.map((cat) => cat.slug)
  );

  const category = CategoryData.find(
    (cat) => cat.slug.toLowerCase() === slug.toLowerCase()
  );
  console.log("Category lookup:", category);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container px-4 py-16 mx-auto text-center text-gray-600">
          Loading "{slug}" businesses…
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container px-4 py-16 mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Category "{slug}" not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Header */}
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

      {/* Content */}
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Business List */}
          <div className="md:col-span-2">
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold">
                Popular in {category.name}
              </h2>

              {filtered.length === 0 ? (
                <p className="text-gray-500">
                  No businesses found in "{category.name}"
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filtered.map((biz) => (
                    <Link
                      to={`/categories/${slug}/store/${biz._id}`}
                      key={biz._id}
                      state={{ storeId: biz._id }}
                      className="block gap-3 p-4 pb-6 border-b border-gray-200 rounded-sm hover:bg-gray-50"
                    >
                      <div className="flex items-start">
                        <div>
                          <img
                            src={`${imageUrl}/${biz.profileImage}`}
                            alt={biz.name}
                            className="object-cover w-24 h-24 rounded-lg"
                          />
                          <div className="flex items-center justify-center mt-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-gray-600">
                              {biz.rating || "5"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 ml-4">
                          <h3 className="text-lg font-semibold">{biz.name}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {`${biz.location.address}, ${biz.location.city}, ${biz.location.state}`}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Phone className="w-4 h-4 mr-1" />
                            {biz.phone}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Globe className="w-4 h-4 mr-1" />
                            {biz.website}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
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
