import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";

import { useDispatch, useSelector } from "react-redux";
import { getSignup } from "../../store/User/user-action.js";
import { userActions } from "../../store/User/user-slice.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, errors } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { name, email, password, passwordConfirm, phoneNumber } = user;

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(getSignup(user));
  };

  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(userActions.clearErrors());
    } else if (isAuthenticated) {
      navigate("/");
      toast.success("Your HomelyHub account is ready");
    }
  }, [dispatch, errors, isAuthenticated, navigate]);

  return (
    <div className="auth-page auth-page-signup">
      <section className="auth-brand-panel">
        <img
          src="/assets/logo.png"
          alt="HomelyHub logo"
          className="auth-logo"
        />

        <div className="auth-brand-content">
          <p className="auth-eyebrow">JOIN HOMELYHUB</p>
          <h1>Make every stay feel like home.</h1>
          <p>
            Create an account and start discovering places made for your next
            adventure.
          </p>
        </div>

        <div className="auth-brand-decoration">
          <span>Explore more.</span>
          <span>Stay longer.</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <form className="auth-form auth-signup-form" onSubmit={submitHandler}>
          <div className="auth-heading">
            <p className="auth-eyebrow">GET STARTED</p>
            <h2>Create your account</h2>
            <p>Join travelers finding their perfect stay.</p>
          </div>

          <div className="auth-field">
            <label htmlFor="name_field">Full name</label>
            <input
              type="text"
              id="name_field"
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup_email_field">Email address</label>
            <input
              type="email"
              id="signup_email_field"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="auth-two-column">
            <div className="auth-field">
              <label htmlFor="signup_password_field">Password</label>
              <input
                type="password"
                id="signup_password_field"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="passwordConfirm_field">Confirm password</label>
              <input
                type="password"
                id="passwordConfirm_field"
                name="passwordConfirm"
                placeholder="Confirm"
                value={passwordConfirm}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="phoneNumber_field">Phone number</label>
            <input
              type="tel"
              id="phoneNumber_field"
              name="phoneNumber"
              placeholder="Your phone number"
              value={phoneNumber}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit-button">
            Create account
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;