// PhotoAlbumDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImportFace from "./PhotoSnap/ImportFace";
import { Default } from "../styles/StyledComponents";
import { ImageBox } from "../styles/PhotoAlbumStyle";
import PhotoElement from "./PhotoSnap/PhotoElement";
import "../styles/PhotoAlbumDetail.css";
import PhotoAlbumDetailEelement from "./PhotoSnap/PhotoAlbumDetailElement";
import { API } from "../api";

const Interpret = {
  happy: "행복",
  surprised: "놀람",
  angry: "화남",
  sad: "슬픔",
};

const PhotoAlbumDetail = () => {
  const { emotion } = useParams();
  const [token, setToken] = useState(null);
  const [images, setImages] = useState([]);
  const [checkedImages, setCheckedImages] = useState(new Set());

  const emoticonsrc = ImportFace[emotion];
  if (!emoticonsrc) {
    console.error(`Emotion "${emotion}" is not recognized.`);
    return null;
  }

  const getImage = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
      const response = await API.get(`/api/albums?emotion=${emotion}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("리스펀스:", response.data);
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setCheckedImages((prev) => {
      const newCheckedImages = new Set(prev);
      if (isChecked) {
        newCheckedImages.add(id);
      } else {
        newCheckedImages.delete(id);
      }
      return newCheckedImages;
    });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      for (const id of checkedImages) {
        await API.delete(`/api/albums/images/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      // 삭제 후 이미지 목록을 다시 가져옵니다.
      getImage();
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  useEffect(() => {
    getImage();
  }, [emotion]); // Ensure useEffect runs when Emotion changes

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: "10px",
          justifyContent: "flex-start",
          borderBottom: "1px solid #C5C5C5",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={emoticonsrc}
            alt={emotion}
            style={{
              width: "36.87px",
              height: "36.499px",
              marginRight: "10px",
            }}
          />
          <Default>{Interpret[emotion]}</Default>
        </div>
        <div>
          <button className="delete" onClick={handleDelete}>삭제하기</button>
          <button className="download">사진 다운받기</button>
        </div>
      </div>
      <PhotoAlbumDetailEelement images={images} onCheckboxChange={handleCheckboxChange} />
    </>
  );
};

export default PhotoAlbumDetail;
