import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Home.css";
import { scrollToListings } from "../../utils/scroll";

import { useDispatch } from "react-redux";
import { propertyAction } from "../../store/Property/property-slice";
import { getAllProperties } from "../../store/Property/property-action";

const Search = ({ onSearchComplete }) => {
  const { RangePicker } = DatePicker;
  const [keyword, setKeyword] = useState({
    city: "",
    guests: "",
    dateIn: "",
    dateOut: "",
  });
  const [value, setValue] = useState([]);

  const dispatch = useDispatch();

  const searchHandler = async (event) => {
  event.preventDefault();

  dispatch(propertyAction.updateSearchParams(keyword));

  await dispatch(getAllProperties());

  setKeyword({
    city: "",
    guests: "",
    dateIn: "",
    dateOut: "",
  });

  setValue([]);

  setTimeout(() => {
    scrollToListings();
  }, 150);
};

  const returnDates = (date, dateString) => {
    if (!date || date.length < 2) {
      setValue([]);
      return;
    }

    setValue([date[0], date[1]]);

    updateKeyword("dateIn", dateString[0]);
    updateKeyword("dateOut", dateString[1]);
  };

  const updateKeyword = (field, fieldValue) => {
    setKeyword((previousKeyword) => ({
      ...previousKeyword,
      [field]: fieldValue,
    }));
  };

  return (
    <form className="searchbar" onSubmit={searchHandler}>
      <input
        className="search"
        id="search_destination"
        placeholder="Search destinations"
        type="text"
        value={keyword.city}
        onChange={(event) => updateKeyword("city", event.target.value)}
      />

      <Space direction="vertical" size={12}>
        <RangePicker
          value={value}
          format="DD-MM-YYYY"
          picker="date"
          className="date_picker"
          disabledDate={(current) =>
            current && current.isBefore(Date.now(), "day")
          }
          onChange={returnDates}
        />
      </Space>

      <input
        className="search"
        id="addguest"
        placeholder="Add guests"
        type="number"
        value={keyword.guests || ""}
        onChange={(event) =>
          updateKeyword("guests", Number(event.target.value))
        }
      />

      <button
        type="submit"
        className="material-symbols-outlined searchicon"
        aria-label="Search properties"
      >
        search
      </button>
    </form>
  );
};

export default Search;