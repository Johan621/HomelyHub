import React, { useEffect } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import {useDispatch, useSelector} from "react-redux";
import {fetchBookingDetails, fetchUserBookings} from "../../store/Booking/booking-action.js";

const BookingSkeletons = () => {
  return (
    <div className="bookings-list" aria-label="Loading bookings">
      {[1, 2, 3, 4].map((item) => (
        <div className="booking-skeleton-card" key={item}>
          <div className="skeleton booking-skeleton-image" />

          <div className="booking-skeleton-content">
            <div className="skeleton skeleton-line large" />
            <div className="skeleton skeleton-line medium" />
            <div className="skeleton skeleton-line small" />
          </div>
        </div>
      ))}
    </div>
  );
};

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {bookings, loading} = useSelector((state)=> state.booking);
  

  useEffect(() => {
    //fetch the user bookings here and set them above.
    dispatch(fetchUserBookings());
  }, [dispatch]);

  console.log(bookings);

  const handleBookingClick = (bookingId) => {
    //fetch this booking's details here if you need to.
    dispatch(fetchBookingDetails(bookingId))
    navigate(`/user/myBookings/${bookingId}`);
  };

  if (bookings.length === 0 && !loading) {
  return (
    <div className="bookings-empty">
      <div className="bookings-empty-card">
        <span className="material-symbols-outlined">luggage</span>
        <h2>No bookings yet</h2>
        <p>
          Your trips will appear here after you book a comfortable stay.
        </p>
      </div>
    </div>
  );
}
  return (
    <>
  <ProgressSteps />

  <div className="bookings-page">
    <div className="bookings-heading">
      <p>Your travel plans</p>
      <h1>My bookings</h1>
    </div>

    {loading && <BookingSkeletons />}

    {!loading && bookings.length > 0 && (
      <div className="bookings-list">
        {bookings.map((booking) => (
          <article
            className="booking-card"
            onClick={() => handleBookingClick(booking._id)}
            key={booking._id}
          >
            <img
              className="booking-card-image"
              src={
                booking.property.images?.length > 0
                  ? booking.property.images[0].url
                  : "/assets/template.jpeg"
              }
              alt={booking.property.propertyName}
            />

            <div className="booking-card-content">
              <h2>{booking.property.propertyName}</h2>

              <div className="booking-location">
                <span className="material-symbols-outlined">
                  location_on
                </span>
                {booking.property.address.city},{" "}
                {booking.property.address.state}
              </div>

              <div className="booking-meta">
                <span>
                  <span className="material-symbols-outlined">bedtime</span>
                  {booking.numberOfnights} nights
                </span>

                <span>
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                  {new Date(booking.fromDate).toLocaleDateString()}
                </span>
              </div>

              <p className="booking-price">
                Total price: ₹{booking.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
</>
  );
};

export default MyBookings;
