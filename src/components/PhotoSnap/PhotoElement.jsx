// PhotoElement.js
import React, { useState } from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";
import { useLocation } from "react-router-dom";

const PhotoElement = ({ data, onCheckboxChange }) => {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const isDetailPage = location.pathname.includes("detail");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onCheckboxChange(data.id, event.target.checked);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as needed (e.g., "MM/DD/YYYY")
  };

  return (
    <ElementBox id="ElementBox">
      <div
        key={data.id}
        style={{ display: "inline-block", height: "100%", width: "100%" }}
      >
        <div style={{ height: isDetailPage ? "85%" : "100%" }}>
          <img
            src={data.image}
            alt={`Image ${data.id}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {isDetailPage && data.updated_at ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{formatDate(data.updated_at)}</span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
        ) : null}
      </div>
    </ElementBox>
  );
};

export default PhotoElement;
