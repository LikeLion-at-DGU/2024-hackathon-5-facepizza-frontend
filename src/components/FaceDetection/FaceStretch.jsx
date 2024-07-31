import React, { useEffect, useRef, useState } from "react";
import FaceLocation from "./FaceLocation";

const FaceStretch = ({ StretchingType }) => {
  const videoRef = useRef(null);
  const pronounce = useState(null);

  useEffect(() => {}, []);

  const handleLocations = (locations) => {
    const { mouth, eyes, brows } = locations;

    if (
      locations.mouth === StretchingType &&
      locations.eyes === StretchingType &&
      locations.brows === StretchingType
    ) {
    }
  };
  return <FaceLocation videoRef={videoRef} onLandmarks={handleLocations} />;
};

export default FaceStretch;
