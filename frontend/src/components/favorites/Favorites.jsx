import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import "./Favorites.css";

const FAVORITES_KEY = "homelyhub-favorites";

const getFavoriteIds = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const favoriteIds = getFavoriteIds();

    if (favoriteIds.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const responses = await Promise.all(
        favoriteIds.map((id) =>
          axiosInstance.get(`/v1/rent/listing/${id}`)
        )
      );

      const properties = responses
        .map((response) => response.data?.data)
        .filter(Boolean);

      setFavorites(properties);
    } catch (error) {
      console.error("Could not load favorites", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    const refreshFavorites = () => {
      setLoading(true);
      loadFavorites();
    };

    window.addEventListener("favorites-updated", refreshFavorites);

    return () => {
      window.removeEventListener("favorites-updated", refreshFavorites);
    };
  }, []);

  const removeFavorite = (id) => {
    const updatedIds = getFavoriteIds().filter(
      (favoriteId) => favoriteId !== id
    );

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedIds));
    setFavorites((previousFavorites) =>
      previousFavorites.filter((property) => property._id !== id)
    );

    window.dispatchEvent(new Event("favorites-updated"));
  };

  if (loading) {
    return (
      <section className="favorites-page">
        <div className="favorites-heading">
          <p>YOUR SAVED STAYS</p>
          <h1>Favorites</h1>
        </div>

        <div className="favorites-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="favorite-skeleton-card" key={item}>
              <div className="skeleton skeleton-favorite-image" />
              <div className="favorite-skeleton-content">
                <div className="skeleton skeleton-line large" />
                <div className="skeleton skeleton-line medium" />
                <div className="skeleton skeleton-line small" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="favorites-empty">
        <div className="favorites-empty-card">
          <span className="material-symbols-outlined">
            favorite_border
          </span>
          <p>YOUR SAVED STAYS</p>
          <h1>No favorites yet</h1>
          <p>
            Tap the heart on any property you love and it will appear here.
          </p>

          <Link to="/" className="favorites-explore-button">
            Explore properties
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-heading">
        <p>YOUR SAVED STAYS</p>
        <h1>Favorites</h1>
        <span>
          {favorites.length} saved{" "}
          {favorites.length === 1 ? "property" : "properties"}
        </span>
      </div>

      <div className="favorites-grid">
        {favorites.map((property) => (
          <article className="favorite-card" key={property._id}>
            <div className="favorite-image-wrapper">
              <Link to={`/propertylist/${property._id}`}>
                <img
                  src={
                    property.images?.[0]?.url || "/assets/template.jpeg"
                  }
                  alt={property.propertyName}
                />
              </Link>

              <button
                type="button"
                className="favorite-remove-button"
                aria-label={`Remove ${property.propertyName} from favorites`}
                onClick={() => removeFavorite(property._id)}
              >
                <span className="material-symbols-outlined">
                  favorite
                </span>
              </button>
            </div>

            <Link
              to={`/propertylist/${property._id}`}
              className="favorite-card-content"
            >
              <h2>{property.propertyName}</h2>

              <p className="favorite-location">
                <span className="material-symbols-outlined">
                  location_on
                </span>
                {property.address?.city},{" "}
                {property.address?.state}
              </p>

              <p className="favorite-price">
                ₹{property.price}
                <span> per night</span>
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Favorites;