import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { healthCategoryData } from "../../data/HealthAndMedical/healthCategoryData";
import { Mail, Phone } from "lucide-react";

import {
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaCommentAlt,
  FaShareAlt,
} from "react-icons/fa";

const StoreDetailPage = ({ data }) => {
  const isFormPreview = location.pathname.includes(
    "/Reacts/list-business/form"
  );

  const { slug, storeId } = useParams();

  // const store = healthCategoryData.find((s) => String(s.id) === storeId);
  const [activeTab, setActiveTab] = useState("Overview");
  const [filter, setFilter] = useState("Relevant");

  const store = useMemo(() => {
    if (data) {
      return data;
    } else {
      return healthCategoryData.find((s) => String(s.id) === storeId);
    }
  }, [data, storeId]);

  const reviews = useMemo(() => {
    if (!store || !store.reviews) return [];
    const reviewsCopy = [...store.reviews];
    switch (filter) {
      case "Latest":
        return reviewsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "High to Low":
        return reviewsCopy.sort((a, b) => b.rating - a.rating);
      case "Relevant":
      default:
        return reviewsCopy.sort(
          (a, b) => (b.likes || 0) + b.rating - ((a.likes || 0) + a.rating) // custom relevance
        );
    }
  }, [store, filter]);

  console.log(store);

  if (!store) return <div>Loading...</div>;
  // function formatAddressPretty(address) {
  //   return address
  //     .trim()
  //     .split(/\s*,\s*/)
  //     .map((part) => part.trim())
  //     .join(",+");
  // }

  const getTimestamp = (r) => {
    // Combine date + time (e.g., "February 13, 2025 11:32 AM")
    return new Date(`${r.date} ${r.time}`).getTime();
  };
  if (!isFormPreview) {
    const sorted = React.useMemo(() => {
      const copy = [...store.reviews];
      // const copy = null;

      if (filter === "Latest") {
        return copy.sort((a, b) => getTimestamp(b) - getTimestamp(a));
      }
      if (filter === "High to Low") {
        return copy.sort((a, b) => b.rating - a.rating);
      }
      return copy; // Relevant or default else
    }, [filter, store.reviews]);
  }

  // const formattedLoc = formatAddressPretty(store.location.address);

  const formattedLoc = encodeURIComponent(
    `${store.location.address}, ${store.location.city}, ${store.location.state} ${store.location.pincode}`
  );
  const address = `${store.location.address}, ${store.location.city}, ${store.location.state}`;

  const iframeSrc = `https://www.google.com/maps?q=${formattedLoc}&output=embed`;

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

  console.log(store);
  // console.log(store.Banner);

  return (
    <>
      <div className="pt-24 bg-gray-50">
        {/* Background image and header section */}
        <section>
          {/* Background Image */}
          <div
            className="relative px-4 py-40 text-white bg-center bg-cover md:px-16"
            style={{
              backgroundImage: `url(${store.photos?.[0] || store.Banner})`,
            }}
          ></div>

          {/* Circle Doctor Profile Image */}
          <div className="relative flex flex-col items-center left-3 -top-40 md:w-1/3 md:mt-0">
            <img
              src={store.image || store.profilePhoto}
              alt={store.name || store.ownerName}
              className="object-cover border-4 border-white rounded-full shadow-lg w-72 h-72"
            />
          </div>
          {/* Header Info */}
          <div className="container flex flex-col py-6 mx-auto -mt-40 ml-28 md:flex-row md:items-center md:justify-between">
            <div className="ml-16 ">
              <h2 className="text-3xl font-bold">
                {store.name || store.ownerName}
              </h2>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2 py-1 text-white bg-green-600 rounded">
                  {store.rating || 0} ★
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
                <span>{store.address || address}</span>
                <span>• Open until {store.openUntil}</span>
                <span>
                  • {store.years || store.experience} Years in Business
                </span>
                <span>• Membership from ₹{store.price || "0"}</span>
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
                <div className="w-full">
                  <section className="max-w-4xl p-6 ml-10 bg-white rounded-lg ">
                    <header className="mb-3">
                      <h2 className="text-2xl font-semibold ">Overview</h2>
                    </header>

                    <div className="w-full space-y-4 text-gray-700 bg-white rounded-lg pl-7">
                      {/* 1. Summary */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Summary
                        </h3>
                        <p className="w-full ml-4 text-justify">
                          {store.summary || store.description}
                        </p>
                      </div>

                      {/* 2. Specialty */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Specialty
                        </h3>
                        <p className="ml-4">{store.categoryData.specialty}</p>
                      </div>

                      {/* 3. Year of Establishment */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Year of Establishment
                        </h3>
                        <p className="ml-4">
                          {store.categoryData.YearOfEstablishment}
                        </p>
                      </div>

                      {/* 4. Experience */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Experience
                        </h3>
                        <p className="ml-4">
                          {store.years} {store.years === 1 ? "year" : "years"}{" "}
                          in practice
                        </p>
                      </div>

                      {/* 5. Awards */}
                      {(store?.awards?.length > 0 ||
                        store?.Certifications?.length > 0) && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Awards & Recognitions
                          </h3>
                          <ul className="list-disc list-inside">
                            {store?.awards?.map((award, idx) => (
                              <li className="ml-5" key={idx}>
                                {award}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}
              {activeTab === "Catalogue" && (
                <div>
                  <p>📦 Product catalogue will be displayed here.</p>
                </div>
              )}
              {activeTab === "Quick Info" && (
                <div className="w-5/6 p-6 space-y-4 bg-white rounded ">
                  <h2 className="ml-10 text-2xl font-semibold ">Quick Info</h2>

                  <div className="pl-16 bg-white rounded-lg ">
                    <div className="divide-y divide-gray-200">
                      {/* Row Item */}
                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">Phone</div>
                        <div>{store.phone || "Not Available"}</div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">Email</div>
                        <div>{store.email || "Not Available"}</div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Register Number
                        </div>
                        <div>
                          {store.categoryData.registerNumber ||
                            store.registrationNumber ||
                            "Not Available"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Appointment Link
                        </div>
                        <div>
                          {store.categoryData.appointmentLink ? (
                            <a
                              href={store.categoryData.appointmentLink}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Book Now
                            </a>
                          ) : (
                            "Not Available"
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Experience
                        </div>
                        <div>{store.experience || "Not Available"}</div>
                      </div>

                      <div className="grid grid-cols-2 py-1">
                        <div className="font-medium text-gray-700">Award</div>
                        {store?.awards?.length > 0 && (
                          <div>
                            <ul className="p-0 m-0 list-none list-inside">
                              {store.awards.map((award, idx) => (
                                <li key={idx}>{award}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Affiliation
                        </div>
                        <div>
                          {store.categoryData.affiliation || "Not Available"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Specialty
                        </div>
                        <div>
                          {store.categoryData.specialty || "Not Available"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">Website</div>
                        <div>
                          {store.website ? (
                            <a
                              href={store.website}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {store.website}
                            </a>
                          ) : (
                            "Not Available"
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Video URL
                        </div>
                        <div>
                          {store.categoryData.extraFields.videoUrl ? (
                            <a
                              href={store.categoryData.extraFields.videoUrl}
                              className="text-blue-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Watch Video
                            </a>
                          ) : (
                            "Not Available"
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Customer Reviews
                        </div>
                        <div>{store?.reviews?.length || 0}</div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">
                          Social Media
                        </div>
                        <div className="flex space-x-4">
                          {(store.socialMedia?.facebook ||
                            store.socialLinks.facebook) && (
                            <a
                              href={store.socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                                alt="Facebook"
                                className="w-5 h-5"
                              />
                            </a>
                          )}
                          {store.socialLinks?.instagram && (
                            <a
                              href={store.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                alt="Instagram"
                                className="w-5 h-5"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Services" && (
                <div>
                  <p>🛠️ Services provided by {store.name} will appear here.</p>
                </div>
              )}
              {activeTab === "Photos" && (
                <section className="w-5/6 p-6 space-y-6 bg-white rounded ">
                  <h2 className="ml-10 text-2xl font-semibold ">Photos</h2>
                  <div>
                    <div className="grid grid-cols-4 gap-2 my-4 ml-18">
                      {(store.photos?.length
                        ? store.photos
                        : store.galleryImages?.length
                        ? store.galleryImages
                        : []
                      ).map((item, idx) => {
                        // Convert object to URL string instantly:
                        const src =
                          typeof item === "string" ? item : item.preview ?? "";

                        return (
                          <img
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            className="object-cover w-48 rounded-md aspect-square"
                          />
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
              {!isFormPreview && (
                <section>
                  {activeTab === "Reviews" && (
                    <section className="w-4/5 max-w-4xl p-6 space-y-6 bg-white rounded ">
                      <h2 className="ml-10 text-2xl font-semibold ">
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
                      {reviews?.map((r) => (
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
                                  <h3 className="text-lg font-medium">
                                    {r.name}
                                  </h3>
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
                </section>
              )}
            </div>
          </section>
          {/* Store detail section  */}
          <section className="container w-1/3 max-w-4xl p-6 pt-24 mx-auto bg-white rounded-lg ">
            {/* Business Hours     */}
            <div className="p-1 mb-4 bg-white rounded-md ">
              <h2 className="mb-4 text-lg font-semibold text-red-600">
                Business Hours
              </h2>
              <ul className="text-sm text-gray-700 divide-y divide-gray-200">
                {store.businessHours.map(({ day, open, close }) => {
                  let timeDisplay = "Closed";

                  if (open && close) {
                    const formatTime = (timeStr) => {
                      const [hour, minute] = timeStr.split(":");
                      const h = parseInt(hour);
                      const ampm = h >= 12 ? "PM" : "AM";
                      const formattedHour = h % 12 || 12;
                      return `${String(formattedHour).padStart(
                        2,
                        "0"
                      )}:${minute}${ampm}`;
                    };

                    timeDisplay = `${formatTime(open)} - ${formatTime(close)}`;
                  } else if (open || close) {
                    timeDisplay = "Open";
                  }

                  return (
                    <li key={day} className="flex justify-between py-1">
                      <span className="capitalize">{day}</span>
                      <span>{timeDisplay}</span>
                    </li>
                  );
                })}
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
                href={`https://www.google.com/maps/dir/?api=1&destination=${formattedLoc}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Get Direction
                </button>
              </a>
            </div>
            {/* Contact and Info Section  quick info */}
            <div>
              <div className="p-4 space-y-4 bg-white rounded-lg text-md ">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{store.phone || "Not Available"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{store.email || "Not Available"}</span>
                </div>

                <div>
                  <strong>Register Number:</strong>{" "}
                  {store.registerNumber ||
                    store.categoryData.registerNumber ||
                    "Not Available"}
                </div>

                <div>
                  <strong>Appointment Link:</strong>{" "}
                  {store.appointmentLink ||
                  store.categoryData.appointmentLink ? (
                    <a
                      href={
                        store.appointmentLink ||
                        store.categoryData.appointmentLink
                      }
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </div>

                <div>
                  <strong>Experience:</strong>{" "}
                  {store.experience || "Not Available"}
                </div>

                <div>
                  <strong>Award:</strong> {store.award || "Not Available"}
                </div>

                <div>
                  <strong>Affiliation:</strong>{" "}
                  {store.affiliation ||
                    store.categoryData.affiliation ||
                    "Not Available"}
                </div>

                <div>
                  <strong>Specialty:</strong>{" "}
                  {store.specialty ||
                    store.categoryData.specialty ||
                    "Not Available"}
                </div>

                <div>
                  <strong>Website:</strong>{" "}
                  {store.website ? (
                    <a
                      href={store.website}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {store.website}
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </div>

                <div>
                  <strong>VideoURL:</strong>{" "}
                  {store.videoURL || store.categoryData.extraFields.videoUrl ? (
                    <a
                      href={
                        store.videoURL ||
                        store.categoryData.extraFields.videoUrl
                      }
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </div>

                <div>
                  <strong>Customer Reviews:</strong>{" "}
                  {store.reviews?.length || 0}
                </div>

                <div>
                  <strong>Social Media:</strong>
                  <div className="flex items-center mt-1 space-x-4">
                    {store.socialMedia?.facebook ||
                      (store.socialLinks.instagram && (
                        <a
                          href={store.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                            alt="Facebook"
                            className="w-5 h-5"
                          />
                        </a>
                      ))}
                    {store.socialMedia?.instagram ||
                      (store.socialLinks?.instagram && (
                        <a
                          href={store.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                            alt="Instagram"
                            className="w-5 h-5"
                          />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default StoreDetailPage;
