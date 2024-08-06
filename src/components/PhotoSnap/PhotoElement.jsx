import React, { useEffect, useState } from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";
import { useLocation } from "react-router-dom";

const PhotoElement = ({ data }) => {
  const location = useLocation();

  const isDetailPage = location.pathname.includes("detail");

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
            <input type="checkbox" />
          </div>
        ) : null}
      </div>
    </ElementBox>
  );
};

export default PhotoElement;
