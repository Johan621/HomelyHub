import { axiosInstance } from "../../utils/axios.js";
import {
  setBookingDetails,
  setBookings,
  setBookingRequest,
} from "./booking-slice.js";

// Fetch one booking
export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    dispatch(setBookingRequest());

    const response = await axiosInstance.get(
      `/v1/rent/user/booking/${bookingId}`
    );

    dispatch(setBookingDetails(response.data.data));
  } catch (error) {
    console.error(
      "Error fetching booking details:",
      error.response?.data || error.message
    );
  }
};

// Fetch all bookings for the logged-in user
export const fetchUserBookings = () => async (dispatch) => {
  try {
    dispatch(setBookingRequest());

    const response = await axiosInstance.get("/v1/rent/user/booking");

    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    console.error(
      "Error fetching user bookings:",
      error.response?.data || error.message
    );

    dispatch(setBookings([]));
  }
};
