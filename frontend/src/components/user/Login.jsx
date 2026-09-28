import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../store/User/user-action.js";
import { userActions } from "../../store/User/user-slice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, errors, loading } = useSelector(
    (state) => state.user
  );

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getLogin({ email, password }));
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(userActions.clearErrors());
    } else if (isAuthenticated) {
      navigate("/");
      toast.success("Welcome back to HomelyHub");
    }
  }, [dispatch, errors, isAuthenticated, navigate]);

  return (
    <div className="auth-page">
      <section className="auth-brand-panel">
        <img
          src="/assets/logo.png"
          alt="HomelyHub logo"
          className="auth-logo"
        />

        <div className="auth-brand-content">
          <p className="auth-eyebrow">WELCOME BACK</p>
          <h1>Find your next place to feel at home.</h1>
          <p>
            Sign in to discover beautiful stays, manage your bookings, and plan
            unforgettable trips.
          </p>
        </div>

        <div className="auth-brand-decoration">
          <span>Stay comfortable.</span>
          <span>Travel beautifully.</span>
        </div>
      </section>

      <section className="auth-form-panel">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form className="auth-form" onSubmit={submitHandler}>
            <div className="auth-heading">
              <p className="auth-eyebrow">YOUR JOURNEY STARTS HERE</p>
              <h2>Welcome back</h2>
              <p>Log in to continue exploring HomelyHub.</p>
            </div>

            <div className="auth-field">
              <label htmlFor="email_field">Email address</label>
              <input
                type="email"
                id="email_field"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password_field">Password</label>
                <Link to="/user/forgotPassword">Forgot password?</Link>
              </div>

              <input
                type="password"
                id="password_field"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit-button">
              Log in
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <p className="auth-switch">
              New to HomelyHub? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
};

export default Login;