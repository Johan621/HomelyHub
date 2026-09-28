import React, { useEffect } from "react";
import "../../css/PropertyListing.css";
import "../../css/PropertyListing.css";
import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertMapInfo from "./PropertyMapInfo";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetails-action";
import { useDispatch, useSelector } from "react-redux";

const PropertyDetailsSkeleton = () => {
  return (
    <div className="property-details-skeleton">
      <div className="skeleton property-details-title" />
      <div className="skeleton property-details-location" />
      <div className="skeleton property-details-image" />

      <div className="property-details-skeleton-columns">
        <div>
          <div className="skeleton skeleton-line large" />
          <div className="skeleton skeleton-line medium" />
          <div className="skeleton skeleton-line medium" />
          <div className="skeleton skeleton-line small" />
        </div>

        <div className="skeleton property-details-payment" />
      </div>
    </div>
  );
};

const PropertyListing = () => {

  const { id } = useParams();
  const dispatch = useDispatch()

  const {loading, propertydetails} = useSelector(
    (state) => state.propertydetails
  )

  useEffect(()=>{
    dispatch(getPropertyDetails(id))
  },[dispatch, id]);

  if (loading || !propertydetails) {
    return <PropertyDetailsSkeleton />;
  }

  const {
    propertyName,
    address,
    description,
    images,
    amenities,
    maximumGuest,
    price,
    currentBookings,
  } = propertydetails;

  return (
    <div className="property-container">
      <p className="property-header">{propertyName}</p>
      <h6 className="property-location">
        <span className="material-symbols-outlined">house</span>
        <span className="location">{`${address?.area}, ${address?.city}, ${address?.state}`}</span>
      </h6>
      <PropertyImg images={images} />
      <div className="middle-container row">
        <div className="des-and-amenities col-md-8 col-sm-12 col-12">
          <h2 className="property-description-header">Description</h2>
          <p className="property-description">
            {description} <br></br>
            <br></br>Max number of guests: {maximumGuest}
          </p>
          <hr></hr>
          <PropertyAmenities amenities={amenities} />
        </div>
        <div className="property-payment col-md-4 col-sm-12 col-12">
          <PaymentForm
            propertyId={id}
            price={price}
            propertyName={propertyName}
            address={address}
            maximumGuest={maximumGuest}
            currentBookings={currentBookings}
          />
        </div>
      </div>
      <hr></hr>
      <div className="property-map">
        <div className="map-image-exinfo-container row">
          <PropertMapInfo address={address} />
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
