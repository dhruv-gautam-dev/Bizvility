import React, { useState } from "react";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function SalesProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@listingpro.com",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Experienced administrator managing the ListingPro platform with expertise in business directory management and user experience optimization.",
    avatar: "",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-20 10:30 AM",
    totalLogins: 1247,
    managedListings: 2847,
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = () => {
    alert("Avatar upload functionality would be implemented here");
  };

  return (
    <div className="p-6">
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
                  <button
                    onClick={handleAvatarUpload}
                    className="absolute bottom-0 right-0 p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    <CameraIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-gray-600">{profile.role}</p>
              <p className="mt-2 text-sm text-gray-500">{profile.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span className="font-medium">{profile.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last login:</span>
                <span className="font-medium">{profile.lastLogin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total logins:</span>
                <span className="font-medium">
                  {profile.totalLogins.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Managed listings:</span>
                <span className="font-medium">
                  {profile.managedListings.toLocaleString()}
                </span>
              </div>
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
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    rows="4"
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 mt-6 bg-white rounded-lg shadow">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Security Settings
            </h3>
            <div className="space-y-4">
              <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Change Password
                    </h4>
                    <p className="text-sm text-gray-600">
                      Update your account password
                    </p>
                  </div>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security
                    </p>
                  </div>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Login History</h4>
                    <p className="text-sm text-gray-600">
                      View your recent login activity
                    </p>
                  </div>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
