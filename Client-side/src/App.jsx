import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import AdminLayout from "./components/superAdmin/AdminLayout.jsx";
import UserLayout from "./components/User/UserLayout.jsx";
import SalesLayout from "./components/Sales/SalesLayout.jsx";

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

// User Pages
import UserDashboard from "./pages/User/Dashboard.jsx";
import UserProfile from "./pages/User/Profile.jsx";
import UserListings from "./pages/User/MyListings.jsx";
import UserAnalytics from "./pages/User/Analytics.jsx";
import UserReviews from "./pages/User/MyReviews.jsx";
import UserInvoice from "./pages/User/Invoices.jsx";

// Sales Pages
import SalesDashboard from "./pages/Sales/Dashboard.jsx";
import SalesListings from "./pages/Sales/Listings.jsx";
import SalesCategories from "./pages/Sales/Categories.jsx";
import SalesProfile from "./pages/Sales/Profile.jsx";
import SalesAllUsers from "./pages/Sales/Users.jsx";
import SalesRevenue from "./pages/Sales/Revenue.jsx";
import SalesReviews from "./pages/Sales/Reviews.jsx";
import SalesSettings from "./pages/Sales/Settings.jsx";
import SalesLeads from "./pages/Sales/Leads.jsx";
import SalesOpportunities from "./pages/Sales/Opportunities.jsx";
import SalesCustomers from "./pages/Sales/Customers.jsx";
import SalesReports from "./pages/Sales/SalesReports.jsx";
import SalesUsers from "./pages/Sales/SalesUsers.jsx";
import SalesUserAnalytics from "./pages/Sales/SalesUserAnalytics.jsx";

// SuperAdmin Pages
import Dashboard from "./pages/superAdmin/Dashboard.jsx";
import Businesses from "./pages/superAdmin/Businesses.jsx";
import Categories from "./pages/superAdmin/Categories.jsx";
import Users from "./pages/superAdmin/Users.jsx";
import Analytics from "./pages/superAdmin/Analytics.jsx";
import Settings from "./pages/superAdmin/Settings.jsx";
import StoreDetailPage from "./pages/HealthCategoryPages/StoreDetailPage.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import EventsPage from "./pages/User/EventsPage.jsx";
import EventForm from "./pages/EventForm.jsx";
// import ProfileSettings from './pages/superAdmin/Profile.jsx';

function App() {
  return (
    <>
      <Toaster />
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
            <Route path="/categories/:slug" element={<CategoryDetailPage />} />
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
            <Route path="/list-business/form" element={<ListBusinessPage />} />
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

          {/* Super Admin Dashboard (AdminLayout) */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/dashboard-categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/profile" element={<ProfileSettings/>} /> */}
          </Route>

          {/* User Dashboard (UserLayout) */}
          <Route element={<UserLayout />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-my-listings" element={<UserListings />} />
            <Route path="/user-analytics" element={<UserAnalytics />} />
            <Route path="/user-my-reviews" element={<UserReviews />} />
            <Route path="/user-invoices" element={<UserInvoice />} />
            <Route path="/user-events" element={<EventsPage />} />
          </Route>

          {/* Sales Dashboard (SalesLayout) */}
          <Route element={<SalesLayout />}>
            <Route path="/sales-dashboard" element={<SalesDashboard />} />
            <Route path="/sales-listings" element={<SalesListings />} />
            <Route path="/sales-categories" element={<SalesCategories />} />
            <Route path="/sales-profile" element={<SalesProfile />} />
            <Route path="/sales-users" element={<SalesAllUsers />} />
            <Route path="/sales-revenue" element={<SalesRevenue />} />
            <Route path="/sales-reviews" element={<SalesReviews />} />
            <Route path="/sales-settings" element={<SalesSettings />} />
            <Route path="/sales-leads" element={<SalesLeads />} />
            <Route
              path="/sales-opportunities"
              element={<SalesOpportunities />}
            />
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
    </>
  );
}

export default App;
