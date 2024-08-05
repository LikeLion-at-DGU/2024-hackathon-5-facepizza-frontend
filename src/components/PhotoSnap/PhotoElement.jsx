import React, { useEffect, useState } from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";
import { API } from "./API";

const PhotoElement = ({ Emotion }) => {
  const [token, setToken] = useState(null);
  const [images, setImages] = useState([]);

  const getImage = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
      const response = await API.get(`/api/albums?emotion=${Emotion}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getImage();
  }, [Emotion]); // Ensure useEffect runs when Emotion changes

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as needed (e.g., "MM/DD/YYYY")
  };

  return (
    <>
      {images
        .filter((image) => image.emotion === Emotion) // Filter images based on emotion
        .map((image, index) => (
          <ElementBox id="ElementBox">
            <div
              key={index}
              style={{ display: "inline-block", height: "100%", width:"100%"}}
            >
              <div style={{ height: "85%" }}>
                <img src={image.image} alt={`Image ${index}`} />
              </div>
              {image.updated_at ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{formatDate(image.updated_at)}</span>
                  <input type="checkbox" />
                </div>
              ) : null}
            </div>
          </ElementBox>
        ))}
    </>
  );
};

export default PhotoElement;
