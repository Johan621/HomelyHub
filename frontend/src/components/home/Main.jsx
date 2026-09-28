import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";

const Main = () => {
  return (
    <div className="home-layout">
      <Header />

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO HOMELYHUB</p>

          <h1>Find a place that feels like home.</h1>

          <p className="hero-description">
            Discover beautiful stays and plan your next unforgettable trip.
          </p>

          <div className="hero-search">
            <Search />
          </div>
        </div>
      </section>

      <section className="destination-section">
  <div className="section-heading">
    <div>
      <p className="section-label">EXPLORE YOUR NEXT STAY</p>
      <h2>Popular destinations</h2>
    </div>

    <p>
      Find comfortable places in destinations travelers love.
    </p>
  </div>

  <div className="destination-grid">
    <div className="destination-card destination-goa">
      <div>
        <span>Beach escapes</span>
        <h3>Goa</h3>
      </div>
    </div>

    <div className="destination-card destination-mumbai">
      <div>
        <span>City adventures</span>
        <h3>Mumbai</h3>
      </div>
    </div>

    <div className="destination-card destination-manali">
      <div>
        <span>Mountain stays</span>
        <h3>Manali</h3>
      </div>
    </div>

    <div className="destination-card destination-jaipur">
      <div>
        <span>Culture and history</span>
        <h3>Jaipur</h3>
      </div>
    </div>
  </div>
</section>

<main className="homepage-content">
  <Outlet />
</main>

      <Footer />
    </div>
  );
};

export default Main;