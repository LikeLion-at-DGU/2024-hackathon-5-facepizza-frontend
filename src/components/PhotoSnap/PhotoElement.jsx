// PhotoElement.js
import React from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";
import { useLocation } from "react-router-dom";

const PhotoElement = ({ data, onCheckboxChange, onClick, isDetailPage }) => {
  const location = useLocation();
  const isDetail = location.pathname.includes("detail");

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
        <div style={{ height: isDetail ? "85%" : "100%" }}>
          <img
            src={data.image}
            alt={`Image ${data.id}`}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={() => onClick(data.id)} // 이미지 클릭 시 onClick 호출
          />
        </div>
        {isDetail && data.updated_at ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{formatDate(data.updated_at)}</span>
            {isDetail && (
              <input
                type="checkbox"
                onChange={(e) => onCheckboxChange(data.id, e.target.checked)}
              />
            )}
          </div>
        ) : null}
      </div>
    </ElementBox>
  );
};

export default PhotoElement;
