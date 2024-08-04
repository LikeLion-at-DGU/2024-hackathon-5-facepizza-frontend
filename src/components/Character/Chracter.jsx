import axios from "axios";
import React, { useEffect, useState } from "react";

const Character = () => {
  const [level, setLevel] = useState("f");
  const [emotion, setEmotion] = useState("neutral");
  const [trackingReports, setTrackingReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const emoticonsrc = `./src/assets/character/${level}_${emotion}.png`;
  
  useEffect(() => {
    const fetchTrackingReports = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/report");
        setTrackingReports(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingReports();
  }, []);

  console.log(trackingReports);

  return (
    <>
      <img src={emoticonsrc} alt="Emotion" id="Character" />
    </>
  );
};

export default Character;
