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

      <main className="homepage-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;