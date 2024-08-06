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
  const [selectedImage, setSelectedImage] = useState(null);

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
      // console.log("리스펀스:", response.data);
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
        console.log(id);
        await API.delete(`/api/albums/images/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      getImage();
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  const showImage = (id) => {
    const image = images.find(img => img.id === id);
    setSelectedImage(image); // 선택된 이미지 상태로 설정
  };

  useEffect(() => {
    getImage();
  }, [emotion]); 

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: "10px",
          justifyContent: "space-between",
          alignItems: "center",
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
        <div style={{display:"flex"}}> 
          <button className="delete" onClick={handleDelete}>삭제하기</button>
          <button className="download">사진 다운받기</button>
        </div>
      </div>
      <PhotoAlbumDetailEelement images={images} onCheckboxChange={handleCheckboxChange} onImageClick={showImage} />

      {/* 선택된 이미지를 화면의 중앙에 크게 보여주는 div */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <img
            src={selectedImage.image}
            alt={`Selected Image ${selectedImage.id}`}
            style={{ width: "80vw", height: "80vh", objectFit: "contain" }}
          />
          <button onClick={() => setSelectedImage(null)}>닫기</button>
        </div>
      )}
    </>
  );
};

export default PhotoAlbumDetail;
