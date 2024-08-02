import React, { useRef, useState } from "react";
import * as S from '../../styles/StyledComponents';
import * as H from '../../styles/HomeStyled';
import VideoComponent from "./../FaceDetection/VideoComponent";
import FaceDetection from "./../FaceDetection/FaceDetection";

const Face_Camera_Home = () => {
    const videoRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };


    return (
        <H.Face_Camera_Home>
            <H.ComponentName>
                <h2>표정 스냅 찍기</h2>
                <p>내 다양한 표정을 기록해보세요</p>
            </H.ComponentName>
            <H.Sectin_Y>
                <H.Component_Card>
                    <div id="video_box">
                        <FaceDetection videoRef={videoRef} onClick={handleOpenModal} />
                    </div>
                    <div id="illust_box">
                        <H.Example100 />
                    </div>
                </H.Component_Card>
                <H.FlexRow>
                    <button onClick={handleOpenModal}>사진 찍기</button>
                    <H.Hlink to="/snap">
                        <H.Description>
                            특정 표정을 지을 시에만 사진이 촬영되는 카메라입니다.
                        </H.Description>
                        {/* <div id="more">
                            더보기 <br />▶
                        </div> */}
                    </H.Hlink>
                </H.FlexRow>
                <H.Child_ComponentName>
                    <h2>표정 앨범</h2>
                </H.Child_ComponentName>
                <H.Hlink to="/album">
                    <H.FlexRow>
                        <H.Example />
                        <H.Example />
                        <H.Example />
                    </H.FlexRow>
                    <div>
                        더보기 <br />▶
                    </div>
                </H.Hlink>
            </H.Sectin_Y>
        </H.Face_Camera_Home>
    ); r
};

export default Face_Camera_Home;