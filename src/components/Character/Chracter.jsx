import { API } from '../../api';
import React, { useEffect, useState } from "react";
import ImportCharacter from "./ImportCharacter";

const Character = () => {
  const [level, setLevel] = useState("f");
  const [emotion, setEmotion] = useState("neutral");
  const [trackingReports, setTrackingReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const emoticonKey = `${level}_${emotion}`;
  const emoticonsrc = ImportCharacter[emoticonKey] || images['f_neutral'];
  
  useEffect(() => {
    const fetchTrackingReports = async () => {
      try {
        const response = await API.get("/api/report");
        setTrackingReports(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingReports();
  }, []);

  // console.log(trackingReports);

  return (
    <>
      <img src={emoticonsrc} alt="Emotion" id="Character" />
    </>
  );
};

export default Character;
