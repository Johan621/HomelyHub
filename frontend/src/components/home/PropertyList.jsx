import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../css/Home.css";

import { useDispatch, useSelector } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice.js";
import { getAllProperties } from "../../store/Property/property-action.js";

const getSavedFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("homelyhub-favorites")) || [];
  } catch {
    return [];
  }
};

const Card = ({ id, image, name, address, price }) => {
  const [isFavorite, setIsFavorite] = useState(() =>
    getSavedFavorites().includes(id)
  );

  const toggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const favorites = getSavedFavorites();

    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem(
      "homelyhub-favorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(updatedFavorites.includes(id));
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <figure className="property">
      <div className="property-image-wrapper">
        <Link to={`/propertylist/${id}`}>
          <img src={image} alt={name} />
        </Link>

        <span className="property-badge">Featured</span>

        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          aria-label={
            isFavorite
              ? `Remove ${name} from favorites`
              : `Add ${name} to favorites`
          }
          onClick={toggleFavorite}
        >
          <span className="material-symbols-outlined">
            {isFavorite ? "favorite" : "favorite_border"}
          </span>
        </button>
      </div>

      <Link to={`/propertylist/${id}`} className="property-card-content">
        <h4>{name}</h4>

        <h6>
          <span className="material-symbols-outlined houseicon">
            location_on
          </span>
          {address}
        </h6>

        <p>
          <span className="price">₹{price}</span> per night
        </p>
      </Link>
    </figure>
  );
};

const PropertySkeletons = () => {
  return (
    <div className="skeleton-grid" aria-label="Loading properties">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div className="property-skeleton" key={item}>
          <div className="skeleton skeleton-property-image" />

          <div className="skeleton-property-content">
            <div className="skeleton skeleton-line large" />
            <div className="skeleton skeleton-line medium" />
            <div className="skeleton skeleton-line small" />
          </div>
        </div>
      ))}
    </div>
  );
};

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState({ page: 1 });

  const dispatch = useDispatch();

  const { properties, totalProperties, loading, error } = useSelector(
    (state) => state.properties
  );

  const lastPage = Math.ceil(totalProperties / 12);
  const propertyListRef = useRef(null);

  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(currentPage));
    dispatch(getAllProperties());
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (propertyListRef.current) {
      gsap.fromTo(
        propertyListRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [properties]);

  if (loading) {
    return <PropertySkeletons />;
  }

  if (error) {
    return <p className="not_found">Could not load properties.</p>;
  }

  return (
    <>
      {properties.length === 0 ? (
        <p className="not_found">No properties found for this destination.</p>
      ) : (
        <div className="propertylist" ref={propertyListRef}>
          {properties.map((property) => (
            <Card
              key={property._id}
              id={property._id}
              image={property.images?.[0]?.url}
              name={property.propertyName}
              address={`${property.address.city}, ${property.address.state} ${property.address.pincode}`}
              price={property.price}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="previous_btn"
          onClick={() => setCurrentPage((prev) => ({ page: prev.page - 1 }))}
          disabled={currentPage.page === 1}
        >
          <span className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>

        <button
          className="next_btn"
          onClick={() => setCurrentPage((prev) => ({ page: prev.page + 1 }))}
          disabled={
            properties.length < 12 || currentPage.page === lastPage
          }
        >
          <span className="material-symbols-outlined">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </>
  );
};

export default PropertyList;