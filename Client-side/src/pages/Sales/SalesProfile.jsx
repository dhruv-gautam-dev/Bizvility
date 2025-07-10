import { useState, useEffect } from "react";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SalesProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    photo: "",
    joinDate: "",
    lastLogin: "",
    totalLogins: 0,
    managedListings: 0,
  });

  const imageUrl = import.meta.env.VITE_Image_URL;

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user profile data
  const fetchUserProfile = async (id, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Update user profile data
  const updateUserProfile = async (id, token, data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "photo" && data[key] instanceof File) {
        formData.append("others", data[key]);
      } else if (
        [
          "fullName",
          "email",
          "username",
          "city",
          "state",
          "country",
          "zipCode",
        ].includes(key)
      ) {
        formData.append(key, data[key]);
      } else if (["name", "phone"].includes(key)) {
        formData.append(`profile.${key}`, data[key]);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/profile/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      setError("User ID or token missing");
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProfile(userId, token);
        const transformedProfile = {
          fullName: data.data.fullName || "Admin User",
          email: data.data.email || "admin@listingpro.com",
          username: data.data.username || "",
          phone: data.data.profile?.phone || "+1 (555) 123-4567",
          address: data.data.profile?.address || "123 Main St",
          city: data.data.city || "New York",
          state: data.data.state || "NY",
          country: data.data.country || "USA",
          zipCode: data.data.zipCode || "",
          photo: data.data.profile?.photo || "",
          joinDate: data.data.createdAt
            ? new Date(data.data.createdAt).toISOString().split("T")[0]
            : "2024-01-01",
          lastLogin: data.data.updatedAt
            ? new Date(data.data.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "2024-01-20 10:30 AM",
          totalLogins: data.data.totalLogins || 1247,
          managedListings: data.data.managedListings || 2847,
        };
        setProfile(transformedProfile);
        localStorage.setItem("userProfile", JSON.stringify(transformedProfile));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, token]);

  const handleSave = async () => {
    try {
      const updatedData = await updateUserProfile(userId, token, {
        fullName: profile.fullName,
        email: profile.email,
        username: profile.username,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        zipCode: profile.zipCode,
        name: profile.fullName, // Map fullName to profile.name for backend
        phone: profile.phone,
        photo: profile.photo,
      });
      setProfile((prev) => ({
        ...prev,
        ...updatedData.data,
        photo: updatedData.data.profile?.photo || prev.photo,
      }));
      localStorage.setItem("userProfile", JSON.stringify(profile));
      window.dispatchEvent(new Event("profileUpdated"));
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error(`Error updating profile: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reload from localStorage or API to revert changes
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, photoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <PencilIcon className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                <CheckIcon className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Card */}{" "}
          <div className="lg:col-span-1">
            <div className="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
              <div className="text-center">
                <div className="relative inline-block">
                  {profile.photo || profile.photoPreview ? (
                    <img
                      src={
                        profile.photoPreview
                          ? profile.photoPreview
                          : `${imageUrl}${profile.photo}`
                      }
                      alt={profile.fullName}
                      className="object-cover w-32 h-32 mx-auto border-4 border-gray-100 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-32 h-32 mx-auto text-gray-300" />
                  )}
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar-upload"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 p-2 text-white transition-colors duration-200 bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700"
                      >
                        <CameraIcon className="w-5 h-5" />
                      </label>
                    </div>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                  {profile.fullName}
                </h2>
              </div>
            </div>
          </div>
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-6 text-xl font-semibold text-gray-800">
                Profile Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"></label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.username || ""}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.country}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-gray-800">
                        {profile.zipCode || "No zip code"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
