import React, { useEffect, useState } from "react";
import { ElementBox } from "../../styles/PhotoAlbumStyle";
import { API } from "./API";

const PhotoElement = ({Emotion}) => {
    // console.log("PhotoElement");
    const [token, setToken] = useState(null);
    const [Image, setImage] = useState([]);

    const getImage = async () => {
        try{
            const token = localStorage.getItem('token');
            setToken(token);
            const response = await API.get(`/api/albums?emotion=${Emotion}`,{
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response);
        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        getImage();
    },[]);

    return(
        <ElementBox id="ElementBox">
            <div>Image</div>
            <div>Date</div>
        </ElementBox>
    )
}

export default PhotoElement;