import React from "react";
import ProgressSteps from "../ProgressSteps";
import { Link } from "react-router-dom";
import "../../css/Profile.css";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      <ProgressSteps profile />

      <div className="profile-page">
        {loading && <LoadingSpinner />}

        {user && !loading && (
          <section className="profile-card">
            <aside className="profile-sidebar">
              <div className="profile-avatar">
                <img src={user.avatar?.url} alt={`${user.name} avatar`} />
              </div>

              <h2>Welcome, {user.name}</h2>
              <p>Your HomelyHub profile</p>
            </aside>

            <div className="profile-content">
              <p className="profile-eyebrow">ACCOUNT OVERVIEW</p>
              <h1>Your profile</h1>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span>Full name</span>
                  <strong>{user.name}</strong>
                </div>

                <div className="profile-info-item">
                  <span>Email address</span>
                  <strong>{user.email}</strong>
                </div>

                <div className="profile-info-item">
                  <span>Joined on</span>
                  <strong>
                    {moment(user.createdAt).format("MMMM Do YYYY")}
                  </strong>
                </div>

                <div className="profile-info-item">
                  <span>Phone number</span>
                  <strong>{user.phoneNumber || "Not provided"}</strong>
                </div>
              </div>

              <div className="profile-actions">
                <Link
                  to="/editprofile"
                  className="profile-action-button"
                >
                  <span className="material-symbols-outlined">edit</span>
                  Edit profile
                </Link>

                <Link
                  to="/user/updatepassword"
                  className="profile-action-button secondary"
                >
                  <span className="material-symbols-outlined">lock</span>
                  Change password
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Profile;