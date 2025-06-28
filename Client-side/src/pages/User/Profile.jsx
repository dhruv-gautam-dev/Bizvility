import { useState, useEffect } from "react";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserProfile } from "../../data/UserData/userProfileData";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(() => {
    let savedProfile = null;
    try {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        savedProfile = JSON.parse(storedProfile);
      }
    } catch (err) {
      console.error("Error parsing userProfile from localStorage:", err);
    }
    return (
      savedProfile || {
        name: "Admin User",
        email: "admin@listingpro.com",
        role: "Administrator",
        phone: "5551234567",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
        bio: "Experienced administrator managing the ListingPro platform.",
        avatar: "",
        joinDate: "2024-01-01",
        lastLogin: "2024-01-20 10:30 AM",
        totalLogins: 1247,
        managedListings: 2847,
      }
    );
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
          name: data?.data?.fullName || "Admin User",
          email: data?.data?.email || "admin@listingpro.com",
          role: data?.data?.role
            ? data.data.role.charAt(0).toUpperCase() + data.data.role.slice(1)
            : "Administrator",
          phone: data?.data?.phone?.toString() || "5551234567",
          city: data?.data?.city || "New York",
          state: data?.data?.state || "NY",
          country: data?.data?.country || "USA",
          zipCode: data?.data?.zipCode || "10001",
          bio:
            data?.data?.profile?.bio ||
            "Experienced administrator managing the ListingPro platform.",
          avatar: data?.data?.profile?.avatar || "",
          joinDate: data?.data?.createdAt
            ? new Date(data.data.createdAt).toISOString().split("T")[0]
            : "2024-01-01",
          lastLogin: data?.data?.updatedAt
            ? new Date(data.data.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "2024-01-20 10:30 AM",
          totalLogins: data?.data?.totalLogins || 1247,
          managedListings: data?.data?.managedListings || 2847,
        };

        setProfile(transformedProfile);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, token]);

  useEffect(() => {
    try {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      console.error("Error saving profile to localStorage:", err);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const updateData = {
        fullName: profile.name,
        email: profile.email,
        phone: profile.phone,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        zipCode: profile.zipCode,
        "profile.name": profile.name,
        "profile.phone": profile.phone,
        "profile.avatar": profile.avatar || undefined,
      };

      const response = await fetch(
        `http://localhost:5000/api/user/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setProfile((prev) => ({
        ...prev,
        name: updatedUser?.data?.fullName || prev.name,
        email: updatedUser?.data?.email || prev.email,
        phone: updatedUser?.data?.phone?.toString() || prev.phone,
        city: updatedUser?.data?.city || prev.city,
        state: updatedUser?.data?.state || prev.state,
        country: updatedUser?.data?.country || prev.country,
        zipCode: updatedUser?.data?.zipCode || prev.zipCode,
        avatar: updatedUser?.data?.profile?.avatar || prev.avatar,
      }));

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
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="w-5 h-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="text-center">
              <div className="relative inline-block">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="object-cover w-32 h-32 mx-auto rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-32 h-32 mx-auto text-gray-400" />
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
                      className="absolute bottom-0 right-0 p-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
                    >
                      <CameraIcon className="w-4 h-4" />
                    </label>
                  </div>
                )}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-gray-600">{profile.role}</p>
              <p className="mt-2 text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Profile Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.city}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.state}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.country}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
