import React from "react";

export const AddressField = ({ form }) => {
  const Field = form.Field;

  return (
    <div className="address-container">
      <h4 className="address-header">Address</h4>

      <label className="form-labels">Address to your place</label>

      <br />

      <div className="address-fields">
        <Field name="address.area">
          {(field) => (
            <input
              className="area"
              type="text"
              placeholder="Area"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </Field>

        <Field name="address.city">
          {(field) => (
            <input
              className="city"
              type="text"
              placeholder="City"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </Field>

        <Field name="address.state">
          {(field) => (
            <input
              className="state"
              type="text"
              placeholder="State"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </Field>

        <Field name="address.pincode">
          {(field) => (
            <input
              className="pincode"
              type="number"
              placeholder="Pincode"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          )}
        </Field>
      </div>
    </div>
  );
};