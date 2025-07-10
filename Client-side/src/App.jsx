import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import SuperAdminLayout from "./components/superAdmin/SuperAdminLayout.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import UserLayout from "./components/User/UserLayout.jsx";
import SalesLayout from "./components/Sales/SalesLayout.jsx";

//auth
import StoreDetailPage from "./pages/HealthCategoryPages/StoreDetailPage.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import EventForm from "./pages/EventForm.jsx";

// Public Pages
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryDetailPage from "./pages/CategoryDetailPage.jsx";
import LocationsPage from "./pages/LocationPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import PartnersPage from "./pages/PartnersPage.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import SitemapPage from "./pages/SitemapPage.jsx";
import SignInForm from "./components/auth/SignInForm.jsx";
import SignUpForm from "./components/auth/SignUpForm.jsx";
import EmailVerification from "./components/auth/EmailVerification.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import PressPage from "./pages/PressPage.jsx";
import AccessibilityPage from "./pages/AccessibilityPage.jsx";
import CookiesPage from "./pages/CookiesPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import JobApplicationPage from "./pages/JobApplicationPage.jsx";
import BusinessListingPage from "./pages/BusinessListingPage.jsx";
import ListBusinessPage from "./pages/ListBusinessPage.jsx";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboardPage.jsx";
import AdminBusinesses from "./pages/Admin/AdminBusinessesPage.jsx";
import AdminCategories from "./pages/Admin/AdminCategoriesPage.jsx";
import AdminUsers from "./pages/Admin/AdminUsersPage.jsx";
import AdminAnalytics from "./pages/Admin/AdminAnalyticsPage.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";

// User Pages
import UserDashboard from "./pages/User/UserDashboard.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import UserListings from "./pages/User/UserMyListings.jsx";
import UserAnalytics from "./pages/User/UserAnalytics.jsx";
import UserReviews from "./pages/User/UserMyReviews.jsx";
import UserInvoice from "./pages/User/UserInvoice.jsx";

// Sales Pages
import SalesDashboard from "./pages/Sales/SalesDashboard.jsx";
import SalesProfile from "./pages/Sales/SalesProfile.jsx";
import SalesListings from "./pages/Sales/SalesListings.jsx";
import SalesCategories from "./pages/Sales/SalesCategories.jsx";
import SalesAllUsers from "./pages/Sales/Users.jsx";
import SalesRevenue from "./pages/Sales/SalesRevenue.jsx";
import SalesLeads from "./pages/Sales/SalesLeads.jsx";
import SalesCustomers from "./pages/Sales/SalesCustomers.jsx";
import SalesReports from "./pages/Sales/SalesReports.jsx";
import SalesUsers from "./pages/Sales/SalesUsers.jsx";
import SalesUserAnalytics from "./pages/Sales/SalesUserAnalytics.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { Toaster } from "react-hot-toast";

// SuperAdmin Pages

import SuperDashboard from "./pages/SuperAdmin/SuperDashboard.jsx";
import SuperEvents from "./pages/SuperAdmin/SuperEvents.jsx";
import SuperInvoices from "./pages/SuperAdmin/SuperInvoices.jsx";
import SuperLeads from "./pages/SuperAdmin/SuperLeads.jsx";
import SuperListing from "./pages/SuperAdmin/SuperListing.jsx";
import SuperPricingPlans from "./pages/SuperAdmin/SuperPricingPlans.jsx";
import SuperProfile from "./pages/SuperAdmin/SuperProfile.jsx";
import SuperRazorpay from "./pages/SuperAdmin/SuperRazorpay.jsx";
import SuperReviews from "./pages/SuperAdmin/SuperReviews.jsx";
import SuperUsers from "./pages/SuperAdmin/SuperUsers.jsx";
import UserEventsPage from "./pages/User/UserEventsPage.jsx";

// import { ToastContainer } from "react-toastify";
// import toast, { Toaster } from "react-hot-toast";

// import ProfileSettings from './pages/superAdmin/Profile.jsx';

function App() {
  return (
    <>
      <Toaster />
      <SocketProvider>
        <Router basename="/Reacts">
          <Routes>
            {/* Auth routes (no layout) */}
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />

            {/* Public Site (Layout) */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route
                path="/categories/:slug"
                element={<CategoryDetailPage />}
              />
              <Route
                path="/categories/:slug/store/:storeId"
                element={<StoreDetailPage />}
              />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route
                path="/careers/apply/:jobTitle"
                element={<JobApplicationPage />}
              />
              <Route path="/list-business" element={<BusinessListingPage />} />
              <Route
                path="/list-business/form"
                element={<ListBusinessPage />}
              />
              <Route path="/list-event/form" element={<EventForm />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/support/faqs" element={<FAQPage />} />
            </Route>

            {/* Super Admin Dashboard (SuperAdminLayout) */}
            <Route element={<SuperAdminLayout />}>
              <Route
                path="/super-admin-dashboard"
                element={<SuperDashboard />}
              />

              <Route path="/super-admin-events" element={<SuperEvents />} />

              <Route path="/super-admin-invoices" element={<SuperInvoices />} />
              <Route path="/super-admin-leads" element={<SuperLeads />} />
              <Route path="/super-admin-listings" element={<SuperListing />} />
              <Route
                path="/super-admin-pricingPlans"
                element={<SuperPricingPlans />}
              />
              <Route path="/super-admin-profile" element={<SuperProfile />} />
              <Route path="/super-admin-razorpay" element={<SuperRazorpay />} />
              <Route path="/super-admin-reviews" element={<SuperReviews />} />
              <Route path="/super-admin-users" element={<SuperUsers />} />
            </Route>

            {/* Admin Dashboard (AdminLayout) */}
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-businesses" element={<AdminBusinesses />} />
              <Route
                path="/admin-dashboard-categories"
                element={<AdminCategories />}
              />
              <Route path="/admin-users-list" element={<AdminUsers />} />
              <Route path="/admin-analytics" element={<AdminAnalytics />} />
              <Route path="/profile-settings" element={<AdminProfile />} />
            </Route>

            {/* User Dashboard (UserLayout) */}
            <Route element={<UserLayout />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/user-my-listings" element={<UserListings />} />
              <Route path="/user-analytics" element={<UserAnalytics />} />
              <Route path="/user-my-reviews" element={<UserReviews />} />
              <Route path="/user-invoices" element={<UserInvoice />} />
              <Route path="/user-events" element={<UserEventsPage />} />
            </Route>

            {/* Sales Dashboard (SalesLayout) */}
            <Route element={<SalesLayout />}>
              <Route path="/sales-dashboard" element={<SalesDashboard />} />
              <Route path="/sales-listings" element={<SalesListings />} />
              <Route path="/sales-categories" element={<SalesCategories />} />
              <Route path="/sales-profile" element={<SalesProfile />} />
              <Route path="/sales-users" element={<SalesAllUsers />} />
              <Route path="/sales-revenue" element={<SalesRevenue />} />
              <Route path="/sales-leads" element={<SalesLeads />} />

              <Route path="/sales-customers" element={<SalesCustomers />} />
              <Route path="/sales-reports" element={<SalesReports />} />
              <Route path="/sales-users-management" element={<SalesUsers />} />
              <Route
                path="/sales-user-analytics"
                element={<SalesUserAnalytics />}
              />
            </Route>
          </Routes>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
