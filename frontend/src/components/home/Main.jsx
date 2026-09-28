import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const destinations = [
  {
    name: "Goa",
    subtitle: "Beach escapes",
    className: "destination-goa",
  },
  {
    name: "Manali",
    subtitle: "Mountain stays",
    className: "destination-manali",
  },
  {
    name: "Jaipur",
    subtitle: "Culture and history",
    className: "destination-jaipur",
  },
];

const Main = () => {
  const dispatch = useDispatch();

  const handleDestinationSearch = (destination) => {
    dispatch(
      propertyAction.updateSearchParams({
        city: destination,
        page: 1,
      })
    );

    dispatch(getAllProperties());

    setTimeout(() => {
      document
        .getElementById("property-listings")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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

          <p>Find comfortable places in destinations travelers love.</p>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <button
              type="button"
              key={destination.name}
              className={`destination-card ${destination.className}`}
              onClick={() => handleDestinationSearch(destination.name)}
            >
              <span>{destination.subtitle}</span>
              <h3>{destination.name}</h3>
              <small>Explore stays →</small>
            </button>
          ))}
        </div>
      </section>

      <main id="property-listings" className="homepage-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Main;