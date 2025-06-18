import React from "react";
import Hero from "../components/sections/Hero.jsx";
import PopularCategories from "../components/sections/PopularCategories.jsx";
import CategoryGrid from "../components/sections/CategoryGrid.jsx";
import FeaturedListings from "../components/sections/FeaturedListings.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import CallToAction from "../components/sections/CallToAction.jsx";

const HomePage = () => {
  // const [user, setUser] = useState(null);
  // `user` is null before login, becomes an object with e.g. { name, avatarUrl } after login

  return (
    <main>
      <Hero />
      <PopularCategories />

      <CategoryGrid />
      <FeaturedListings />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default HomePage;
