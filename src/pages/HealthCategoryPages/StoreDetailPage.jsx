import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { healthCategoryData } from "../../data/HealthAndMedical/healthCategoryData";

const StoreDetailPage = () => {
  const { slug, storeId } = useParams();
  const store = healthCategoryData.find((s) => String(s.id) === storeId);
  const [activeTab, setActiveTab] = useState("Overview");
  console.log(store);
  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Store not found</h1>
          <Link
            to={`/categories/${slug}`}
            className="inline-block mt-4 text-blue-600"
          >
            ← Back to {slug}
          </Link>
        </div>
      </div>
    );
  }

  const tabList = [
    "Overview",
    "Catalogue",
    "Quick Info",
    "Services",
    "Photos",
    "Reviews",
  ];

  return (
    <div className="pt-24 bg-gray-50">
      <div
        className="relative px-4 py-40 text-white bg-center bg-cover md:px-16"
        style={{ backgroundImage: `url(${store.photos[0]})` }}
      ></div>

      {/* Circle Doctor Profile Image */}
      <div className="absolute flex flex-col items-center left-3 top-60 md:w-1/3 md:mt-0">
        <img
          src={store.image}
          alt={store.name}
          className="object-cover border-4 border-white rounded-full shadow-lg w-72 h-72"
        />
      </div>

      {/* Header Info */}
      <div className="container flex flex-col py-6 mx-auto mt-32 ml-28 md:flex-row md:items-center md:justify-between">
        <div className="ml-16 ">
          <h2 className="text-3xl font-bold">{store.name}</h2>
          <div className="flex items-center mt-2 space-x-2">
            <span className="px-2 py-1 text-white bg-green-600 rounded">
              {store.rating} ★
            </span>
            <span className="text-gray-600">{store.reviewsCount} Ratings</span>
            {store.verified && <span className="text-blue-600">Verified</span>}
            {store.claimed && <span className="text-gray-600">Claimed</span>}
          </div>
          <div className="flex flex-wrap items-center mt-2 space-x-4 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{store.location}</span>
            <span>• Open until {store.openUntil}</span>
            <span>• {store.years} Years in Business</span>
            <span>• Membership from ₹{store.price}</span>
          </div>
        </div>
        <div className="flex mt-4 space-x-2 md:mt-0">
          <a
            href={`tel:${store.phone}`}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded"
          >
            📞 {store.phone}
          </a>
          <button className="px-4 py-2 text-white bg-blue-600 rounded">
            Enquire Now
          </button>
          <a
            href={`https://wa.me/${store.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="container flex flex-col w-2/3 mx-2 bg-white border-t ">
        <nav className="flex px-6 pl-16 space-x-8 border-b">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-medium border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="w-full p-6 pl-16">
          {activeTab === "Overview" && (
            <div>
              <h3 className="text-xl font-semibold">Welcome to {store.name}</h3>
              <p>{store.alt}</p>
              <p className="mt-2 text-gray-600">{store.address}</p>
            </div>
          )}
          {activeTab === "Catalogue" && (
            <div>
              <p>📦 Product catalogue will be displayed here.</p>
            </div>
          )}
          {activeTab === "Quick Info" && (
            <div>
              <p>📌 {store.openHours}</p>
              <p>📍 Address: {store.address}</p>
              <p>
                🌐 Website:{" "}
                <a className="text-blue-600" href={store.website}>
                  {store.website}
                </a>
              </p>
            </div>
          )}
          {activeTab === "Services" && (
            <div>
              <p>🛠️ Services provided by {store.name} will appear here.</p>
            </div>
          )}
          {activeTab === "Photos" && (
            <div className="grid grid-cols-4 gap-2 ">
              {store.photos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  className="object-cover w-full h-48 rounded-md"
                />
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div>
              <p>⭐ Customer reviews coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;
