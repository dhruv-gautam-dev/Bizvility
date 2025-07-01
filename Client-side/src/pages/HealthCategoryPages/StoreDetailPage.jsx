import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// import { MapPin, UserIcon, Mail, Phone } from "lucide-react";
import {
  getBusinessById,
  getEventsByBusinessId,
} from "../../data/HealthAndMedical/healthCategoryData";
import { FaStar, FaRegStar, FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import ReviewForm from "../../components/business/ReviewForm";
import EventCarousel from "../../components/business/EventCarousel";
import { MapPinIcon } from "@heroicons/react/24/outline";

const StoreDetailPage = ({ data }) => {
  const location = useLocation();
  const { slug, storeId } = useParams();
  const token = localStorage.token;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStoreData, setHealthStoreData] = useState(null);
  const [eventsStoreData, setEventsStoreData] = useState(null);
  // const [storeReviewsData, setStoreReviewsData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [filter, setFilter] = useState("Relevant");
  const imageUrl = import.meta.env.VITE_Image_URL;
  // console.log(storeId);
  const isFormPreview = location.pathname.includes(
    "/Reacts/list-business/form"
  );

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeId || !token) {
        setError("Missing store ID or token");
        setLoading(false);
        return;
      }

      try {
        const res = await getBusinessById(storeId, token);
        setHealthStoreData(res);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch store data");
      } finally {
        setLoading(false);
      }
    };

    if (!data) fetchStore();
    else setLoading(false);
  }, [storeId, token, data]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!storeId) {
        setError("Missing StoreId or token");
        setLoading(false);
        return;
      }

      try {
        const res = await getEventsByBusinessId(storeId, token);
        setEventsStoreData(res);
      } catch (err) {
        console.log("Fetch error:", err);
        setError("Failed to fetch store data ");
      } finally {
        setLoading(false);
      }
    };

    if (!data) fetchEvents();
    else setLoading(false);
  }, [storeId, token, data]);

  console.log(healthStoreData);
  console.log(eventsStoreData);

  // ✅ Memoized store logic with safe fallback
  const store = useMemo(() => {
    return data || healthStoreData?.business || null;
  }, [data, healthStoreData]);

  const getTimestamp = (r) => new Date(r.time).getTime();

  const reviews = useMemo(() => {
    if (!store?.reviews) return [];
    const copy = [...store.reviews];

    switch (filter) {
      case "Latest":
        return [...copy].sort((a, b) => getTimestamp(b) - getTimestamp(a));
      case "High to Low":
        return [...copy].sort((a, b) => b.rating - a.rating);
      default:
        return [...copy].sort(
          (a, b) => (b.likes || 0) + b.rating - ((a.likes || 0) + a.rating)
        );
    }
  }, [store?.reviews, filter]);

  const formattedLoc = encodeURIComponent(
    `${store?.location?.address || ""}, ${store?.location?.city || ""}, ${
      store?.location?.state || ""
    }`
  );

  const address = `${store?.location?.address || ""}, ${
    store?.location?.city || ""
  }, ${store?.location?.state || ""}`;
  const iframeSrc = `https://www.google.com/maps?q=${formattedLoc}&output=embed`;

  // ✅ Render logic
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!store) return <div>No store data found</div>;

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
      <div className="min-h-screen pt-24 bg-gray-50">
        {/* Background image and header section */}
        <section className="relative">
          {/* Background Image */}
          <div className="w-full">
            <img
              src={
                store?.Banner?.preview ||
                `${imageUrl}/${healthStoreData?.business.coverImage}`
              }
              alt={
                store?.name ||
                store?.ownerName ||
                healthStoreData?.business.ownerName
              }
              className="object-cover w-full h-48 border-4 border-white sm:h-64 md:h-80 lg:h-96"
            />
          </div>

          {/* Circle Doctor Profile Image */}
          <div className="absolute transform translate-y-1/2 -top-18 left-4 sm:left-8 sm:-top-36 md:left-28 md:-top-20">
            <img
              src={
                store?.profilePhoto?.preview ||
                `${imageUrl}/${healthStoreData?.business.profileImage}`
              }
              alt={
                store?.name ||
                store?.ownerName ||
                healthStoreData?.business.ownerName
              }
              className="object-cover w-40 h-40 border-4 border-white rounded-full shadow-md sm:w-60 sm:h-60 md:w-72 md:h-72"
            />
          </div>
          {/* Header Info */}
          <div className="flex flex-col gap-4 px-4 mt-16 sm:px-2 lg:px-8 sm:mt-24 md:mt-36 md:flex-row md:items-center md:justify-between">
            <div className="text-left md:text-left ">
              <h2 className="text-3xl font-bold">
                {store?.name ||
                  store?.ownerName ||
                  healthStoreData?.business?.ownerName}
              </h2>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2 py-1 text-white bg-green-600 rounded">
                  {store?.rating || 0 || healthStoreData?.business?.rating} ★
                </span>
                <span className="text-gray-600">
                  {store?.reviewsCount ||
                    healthStoreData?.business?.numberOfReviews}{" "}
                  Ratings
                </span>
                {store?.verified ||
                  (healthStoreData?.business?.varified && (
                    <span className="text-blue-600">Verified</span>
                  ))}
                {store?.claimed ||
                  (healthStoreData?.business?.claimed && (
                    <span className="text-gray-600">Claimed</span>
                  ))}
              </div>
              <div className="flex flex-wrap items-center mt-2 mb-3 space-x-4 text-gray-600">
                <MapPinIcon className="w-5 h-5" />
                <span>{store?.address || address}</span>
                <span>• Open until {store?.openUntil}</span>
                <span>
                  •{" "}
                  {store?.years ||
                    store?.experience ||
                    healthStoreData?.business?.experience}{" "}
                  Years in Business
                </span>
                <span>• Membership from ₹{store?.price || "0"}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-2 space-x-2 md:justify-end">
              <a
                href={
                  `tel:${store?.phone}` ||
                  `tel:${healthStoreData?.business?.phone}`
                }
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded"
              >
                📞 {store?.phone || healthStoreData?.business?.phone}
              </a>
              <button className="px-4 py-2 text-white bg-blue-600 rounded">
                Enquire Now
              </button>
              <a
                href={
                  `https://wa.me/${store?.phone}` ||
                  `https://wa.me/${healthStoreData?.business?.phone}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 bg-white sm:px-6 lg:px-8 lg:flex-row">
          {/* Tabs Section */}
          <section className="w-full mx-auto bg-white border-t lg:w-2/3 ">
            {/* Tab Navigation */}
            <nav className="flex flex-wrap px-2 space-x-4 overflow-x-auto border-b sm:px-2 sm:space-x-8">
              {tabList.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 sm:py-4 font-medium border-b-2 text-sm sm:text-base ${
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
                  <section className="p-4 bg-white rounded-lg sm:p-6">
                    <header className="mb-3">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Overview
                      </h2>
                    </header>

                    <div className="mx-8 space-y-2 text-gray-700 bg-white rounded-lg">
                      {/* 1. Summary */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Summary
                        </h3>
                        <p className="w-full ml-4 text-justify">
                          {store?.summary ||
                            store?.description ||
                            healthStoreData?.business?.description}
                        </p>
                      </div>

                      {/* 2. Specialty */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Speciality
                        </h3>
                        <p className="ml-4">
                          {store?.categoryData?.speciality}
                        </p>
                      </div>

                      {/* 3. Year of Establishment */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Year of Establishment
                        </h3>
                        <p className="ml-4">
                          {store?.categoryData?.YearOfEstablishment}
                        </p>
                      </div>

                      {/* 4. Experience */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Experience
                        </h3>
                        <p className="ml-4">
                          {store?.experience}{" "}
                          {store?.years === 1 ? "year" : "years"} in practice
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
                <div className="w-full p-4 space-y-4 bg-white rounded sm:p-6">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Quick Info
                  </h2>

                  <div className="bg-white rounded-lg">
                    <div className="divide-y divide-gray-200">
                      {/* Row Item */}
                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">Phone</div>
                        <div>
                          {store?.phone ||
                            healthStoreData?.business?.phone ||
                            "Not Available"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 py-3">
                        <div className="font-medium text-gray-700">Email</div>
                        <div>
                          {store?.email ||
                            healthStoreData?.business?.email ||
                            "Not Available"}
                        </div>
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
                          {store.categoryData.speciality || "Not Available"}
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
                <section className="p-4 space-y-6 bg-white rounded sm:p-6">
                  <h2 className="text-xl font-semibold sm:text-2xl">Photos</h2>
                  <div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {(healthStoreData?.business?.galleryImages?.length
                        ? healthStoreData?.business?.galleryImages
                        : store.galleryImages?.length
                        ? store.galleryImages
                        : []
                      ).map((item, idx) => {
                        // Convert object to URL string instantly:
                        console.log(item);
                        const src = healthStoreData
                          ? typeof item === "string"
                            ? `${imageUrl}/${item}`
                            : item?.preview
                          : typeof item === "string"
                          ? item
                          : item?.preview ?? "";

                        return (
                          <img
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            className="object-cover w-full rounded-md aspect-square"
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
                    <section className="p-4 space-y-6 bg-white rounded sm:p-6">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Write a Review
                      </h2>
                      <ReviewForm businessId={storeId} />

                      <h2 className="text-xl font-semibold sm:text-2xl">
                        User Reviews
                      </h2>

                      {/* Filter Tabs */}
                      <div className="flex flex-wrap mb-4 space-x-2">
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
                      {reviews.map((r) => (
                        <div
                          key={r.id}
                          className="pb-6 space-y-4 border-b last:border-0"
                        >
                          {/* Header: avatar, name, count, date, rating */}
                          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                            <div className="flex items-center">
                              <img
                                src={
                                  r.image ||
                                  `https://cdn-icons-png.flaticon.com/512/17246/17246544.png`
                                }
                                alt={r.name}
                                className="object-cover w-12 h-12 mr-4 bg-gray-200 rounded-full sm:w-16 sm:h-16"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-base font-medium sm:text-lg">
                                    {r.reviewerName}
                                  </h3>
                                  {r.reviewsCount && (
                                    <span className="text-xs text-gray-500 sm:text-sm">
                                      {r.rating} reviews
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 sm:text-sm">
                                  {new Date(r.time).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {/* Rating */}
                            <div className="flex items-center mt-2 space-x-1 sm:mt-0">
                              {[1, 2, 3, 4, 5].map((i) =>
                                i <= Math.round(r.rating) ? (
                                  <FaStar
                                    key={i}
                                    className="w-4 h-4 text-green-500 sm:w-5 sm:h-5"
                                  />
                                ) : (
                                  <FaRegStar
                                    key={i}
                                    className="w-4 h-4 text-gray-300 sm:w-5 sm:h-5"
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
                                  className="flex items-center px-2 py-1 space-x-1 text-xs text-gray-700 bg-gray-100 rounded-full sm:text-sm"
                                >
                                  <FaThumbsUp /> <span>{tag}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Review Text */}
                          <p className="text-sm text-gray-700 sm:text-base">
                            {r.comment}
                          </p>

                          {/* Actions */}
                          <div className="flex mt-1 space-x-6 text-gray-600">
                            {/* <button className="flex items-center space-x-1 hover:text-blue-600">
                              <FaThumbsUp /> <span>Helpful</span>
                            </button> */}
                            <button className="flex items-center space-x-1 text-xs hover:text-gray-800 sm:text-sm">
                              <FaCommentAlt /> <span>Comment</span>
                            </button>
                            {/* <button className="flex items-center space-x-1 hover:text-gray-800">
                              <FaShareAlt /> <span>Share</span>
                            </button> */}
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
          <section className="w-full p-4 bg-white rounded-lg lg:w-1/3 sm:p-6">
            <div className="pt-12 mb-4 bg-white rounded-md">
              {console.log(eventsStoreData)}
              <EventCarousel
                events={eventsStoreData.events}
                // imageUrl={`${imageUrl}/${eventsStoreData?.events.bannerImage}`}
              />
            </div>
            {/* Business Hours     */}

            <div className="pt-4 mb-4 bg-white rounded-md">
              <h2 className="mb-4 text-lg font-semibold text-red-600 sm:text-xl">
                Business Hours
              </h2>
              <ul className="text-xs text-gray-700 divide-y divide-gray-200 sm:text-sm">
                {(
                  store?.businessHours ||
                  healthStoreData?.business?.businessHours ||
                  []
                ).map(({ day, open, close }) => {
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
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">Address</h3>
              <p className="mb-2 text-xs text-gray-600 sm:text-sm">{address}</p>

              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full rounded"
                  title={`Map for ${formattedLoc}`}
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
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded sm:px-6 sm:py-2 hover:bg-blue-700 sm:text-base">
                  Get Direction
                </button>
              </a>
            </div>
            {/* Contact and Info Section  quick info */}
          </section>
        </section>
      </div>
    </>
  );
};

export default StoreDetailPage;
