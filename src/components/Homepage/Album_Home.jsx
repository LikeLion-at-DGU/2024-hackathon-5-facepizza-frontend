import React, { useState, useEffect } from "react";
import * as H from '../../styles/HomeStyled';
import * as S from '../../styles/StyledComponents';
import Locked from '../../assets/Locked.png';
import { API } from '../../api';
import F_sad from '../../assets/character/f_sad.png'
import PhotoElement from "../PhotoSnap/PhotoElement";

const Album_Home = () => {
    const [token, setToken] = useState(null);
    const [images, setImages] = useState([]);

    const getImage = async () => {
        try {
        const token = localStorage.getItem("token");
        setToken(token);
        const response = await API.get(`/api/albums`, {
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
    });

    return (
        <H.Magazine_Home>
            <H.ComponentName>
                <H.SecondH2>표정 앨범</H.SecondH2>
            </H.ComponentName>
            <H.Sectin_G>  {/* 안애 내용이 로그인여부에따라 변경 */}
                {token ? (
                    <S.Blink to='/album' style={{ width: '100%' }}>
                        {images.length === 0 ? (
                            <H.NoImg>
                                <h2>아직 사진이 없습니다</h2>
                                <p>포토스냅에서 사진을 찍어보세요!</p>
                            </H.NoImg>
                        ) : (
                            <H.FlexRow>
                                {images.slice(-2).map(data => (
                                    <PhotoElement key={data.id} data={data} />
                                ))}
                            </H.FlexRow>
                        )}
                    </S.Blink>
                ) : (
                    <H.FlexCol style={{ padding: '20px 0 10px 0' }}>
                        <img src={Locked} alt="Locked" />
                        <p>로그인 후 사용해주세요</p>
                    </H.FlexCol>
                )}
            </H.Sectin_G>
        </H.Magazine_Home>
    );
}

export default Album_Home;
