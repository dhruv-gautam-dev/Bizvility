import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { healthCategoryData } from "../../data/HealthAndMedical/healthCategoryData";
import {
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaCommentAlt,
  FaShareAlt,
} from "react-icons/fa";

const StoreDetailPage = () => {
  const { slug, storeId } = useParams();
  const store = healthCategoryData.find((s) => String(s.id) === storeId);
  const [activeTab, setActiveTab] = useState("Overview");
  const [filter, setFilter] = useState("Relevant");
  console.log(store);

  function formatAddressPretty(address) {
    return address
      .trim()
      .split(/\s*,\s*/)
      .map((part) => part.trim())
      .join(",+");
  }

  const getTimestamp = (r) => {
    // Combine date + time (e.g., "February 13, 2025 11:32 AM")
    return new Date(`${r.date} ${r.time}`).getTime();
  };

  const sorted = React.useMemo(() => {
    const copy = [...store.reviews];

    if (filter === "Latest") {
      return copy.sort((a, b) => getTimestamp(b) - getTimestamp(a));
    }
    if (filter === "High to Low") {
      return copy.sort((a, b) => b.rating - a.rating);
    }
    return copy; // Relevant or default else
  }, [filter, store.reviews]);

  const formattedLoc = formatAddressPretty(store.address);
  const iframeSrc = `https://www.google.com/maps?q=${formattedLoc}&output=embed`;

  // write an api key to embed google map------------------------------------------------------------
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
    <>
      <div className="pt-24 bg-gray-50">
        {/* Background image and header section */}
        <section>
          {/* Background Image */}
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
                <span className="text-gray-600">
                  {store.reviewsCount} Ratings
                </span>
                {store.verified && (
                  <span className="text-blue-600">Verified</span>
                )}
                {store.claimed && (
                  <span className="text-gray-600">Claimed</span>
                )}
              </div>
              <div className="flex flex-wrap items-center mt-2 space-x-4 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{store.address}</span>
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
        </section>
        <section className="container flex flex-row mx-2 bg-white ">
          {/* Tabs Section */}
          <section className="container flex flex-col w-2/3 bg-white border-t ">
            {/* Tab Navigation */}
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
            <div className="w-full ">
              {activeTab === "Overview" && (
                <div>
                  <h3 className="text-xl font-semibold">
                    Welcome to {store.name}
                  </h3>
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
                <section className="w-full max-w-4xl p-6 space-y-6 bg-white rounded ">
                  <h2 className="mt-4 ml-10 text-2xl font-semibold">Photos</h2>
                  <div className="grid grid-cols-4 gap-2 mx-auto my-4 space-x-2 w-6/7 ">
                    {store.photos.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        className="object-cover w-full h-48 rounded-md"
                      />
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "Reviews" && (
                <section className="w-4/5 max-w-4xl p-6 space-y-6 bg-white rounded ">
                  <h2 className="mt-4 ml-10 text-2xl font-semibold">
                    User Reviews
                  </h2>
                  {/* Filter Tabs */}
                  <div className="flex mb-4 space-x-2 ml-18">
                    {["Relevant", "Latest", "High to Low"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded ${
                          filter === tab
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Reviews List */}
                  {sorted.map((r) => (
                    <div
                      key={r.id}
                      className="pb-6 ml-24 space-y-4 border-b last:border-0"
                    >
                      {/* Header: avatar, name, count, date, rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={r.image}
                            alt={r.name}
                            className="object-cover w-16 h-16 mr-4 bg-gray-200 rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium">{r.name}</h3>
                              {r.reviewsCount && (
                                <span className="text-sm text-gray-500">
                                  {r.reviewsCount} reviews
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(r.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((i) =>
                            i <= Math.round(r.rating) ? (
                              <FaStar
                                key={i}
                                className="w-5 h-5 text-green-500"
                              />
                            ) : (
                              <FaRegStar
                                key={i}
                                className="w-5 h-5 text-gray-300"
                              />
                            )
                          )}
                        </div>
                      </div>

                      {/* Tags (if any) */}
                      {r.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {r.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center px-3 py-1 space-x-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                            >
                              <FaThumbsUp /> <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Review Text */}
                      <p className="text-gray-700">{r.text}</p>

                      {/* Actions */}
                      <div className="flex mt-4 space-x-6 text-gray-600">
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <FaThumbsUp /> <span>Helpful</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-800">
                          <FaCommentAlt /> <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-800">
                          <FaShareAlt /> <span>Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </section>
          {/* Store detail section  */}
          <section className="container w-1/3 max-w-4xl p-6 pt-24 mx-auto bg-white rounded-lg ">
            {/* Business Hours */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-red-500">
                Business Hours
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {store.businessHours.map(([day, time]) => (
                  <li key={day} className="flex justify-between pb-1 border-b">
                    <span>{day}</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embedded Google Map */}
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Address</h3>
              <p className="mb-2 text-sm text-gray-600">{store.address}</p>

              {/* <iframe
                title="Google Map"
                className="w-full h-64 border rounded"
                allowFullScreen=""
                loading="lazy"
              /> */}

              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  title={`Map for ${store.address}`}
                  src={iframeSrc}
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Get Direction Button */}
            <div className="text-center">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  store.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Get Direction
                </button>
              </a>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default StoreDetailPage;
