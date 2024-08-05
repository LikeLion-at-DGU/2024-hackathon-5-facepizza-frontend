import React, { useRef, useState, useEffect } from "react";
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import VideoComponent from "./../FaceDetection/VideoComponent";
import FaceDetection from "./../FaceDetection/FaceDetection";
import illust_Snap from '../../assets/illustration/illust_Snap.png'
import { NavLink } from 'react-router-dom';

const Face_Camera_Home = ({ onHeightChange }) => {
    const videoRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (sectionRef.current) {
            onHeightChange(sectionRef.current.offsetHeight);
        }
    }, [sectionRef, onHeightChange]);



    return (
        <H.Face_Camera_Home>
            <H.ComponentName>
                <h2>표정 스냅 찍기</h2>
                <p>내 다양한 표정을 기록해보세요</p>
            </H.ComponentName>
            <H.Sectin_Y ref={sectionRef}>
                <NavLink to='/snap' style={{ textDecoration: 'none', color: 'black' }}>
                    <H.Component_Card>
                        <div id="video_box">
                            <FaceDetection videoRef={videoRef} onClick={handleOpenModal} />
                        </div>
                        <div id="illust_box">
                            <H.Camera_illrust src={illust_Snap} />
                        </div>
                    </H.Component_Card>
                    <H.Description>
                        <p><b>정해진 표정을 지어야지만 사진이 촬영되는 특별한 카메라!</b></p>
                        <span>풍부한 표정과 함꼐 치즈의 스냅사진을 촬영해보세요</span>
                    </H.Description>
                    {/* <H.FlexRow style={{padding: '15px 6px 10px 6px'}}>
                    <H.GoPhotoBtn >사진 찍기</H.GoPhotoBtn>
                    </H.FlexRow> */}
                </NavLink>
            </H.Sectin_Y>
        </H.Face_Camera_Home>
    ); r
};

export default Face_Camera_Home;