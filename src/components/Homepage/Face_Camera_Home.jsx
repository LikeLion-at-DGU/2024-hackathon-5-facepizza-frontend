import React from "react";
import * as S from '../../styles/StyledComponents';
import photo from '../../assets/photo.jpg'; // 사진 경로 수정 필요
import album from '../../assets/album.jpg'; // 사진 경로 수정 필요
import calendar from '../../assets/calrender.png';
import bedge from '../../assets/bedge.png';

const Face_Camera_Home = () => {
    return (
        <S.Face_Camera_Home>
            <S.Section>z
                <h2>내 표정 기록하기</h2>
                <div id="cont_box">
                    <div id="left_box">
                        <S.Image src={photo} alt="Selfie" id="camera_cover"/>
                        <S.desc>
                            <h3>표정 사진 찍기</h3>
                            설명
                        </S.desc>
                    </div>
                    <div id="right_box">
                        <div id="face_album">
                            <S.Image src={album} alt="Album" id="album_cover" />
                            <S.desc>
                                <h3>표정 앨범</h3>
                                설명
                            </S.desc>
                        </div>
                        <div id="face_calendar">
                            <div id="icon_box">
                                <img src={calendar} id="calendar_icon"/>
                                <img src={bedge} class="bedge_icon"/>
                                <img src={bedge} class="bedge_icon"/>
                            </div>
                            <S.desc>
                                <h3>표정 챌린지</h3>
                                도전해 보세요
                            </S.desc>
                        </div>
                    </div>
                </div>
            </S.Section>
        </S.Face_Camera_Home>
    ); r
};

export default Face_Camera_Home;