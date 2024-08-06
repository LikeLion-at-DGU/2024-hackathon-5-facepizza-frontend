import React, { useEffect, useState } from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";

const PhotoElement = ({ data }) => {

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as needed (e.g., "MM/DD/YYYY")
  };

  return (
    <ElementBox id="ElementBox">
      <div
        key={data.id}
        style={{ display: "inline-block", height: "100%", width:"100%"}}
      >
        <div style={{ height: "85%" }}>
          <img src={data.image} alt={`Image ${data.id}`} style={{width:"100%", heigth:"100%"}}/>
        </div>
        {data.updated_at ? (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{formatDate(data.updated_at)}</span>
            <input type="checkbox" />
          </div>
        ) : null}
      </div>
    </ElementBox>
  );
};

export default PhotoElement;
