import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SuperAdminLayout() {
  const [profile, setProfile] = useState(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    return {
      name: "Admin User",
      email: "admin@listingpro.com",
      role: "Administrator",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      bio: "Experienced administrator managing the ListingPro platform with expertise in business directory management and user experience optimization.",
      avatar: savedAvatar || "",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-20 10:30 AM",
      totalLogins: 1247,
      managedListings: 2847,
    };
  });

  useEffect(() => {
    // Save avatar to localStorage whenever it changes
    if (profile.avatar) {
      localStorage.setItem("profileAvatar", profile.avatar);
    } else {
      localStorage.removeItem("profileAvatar");
    }
  }, [profile.avatar]);

  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Header profile={profile} />
          <div className="p-6">
            <Outlet context={{ profile, setProfile }} />
          </div>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
