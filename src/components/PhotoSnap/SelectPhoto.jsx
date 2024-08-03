import React, { useState } from 'react';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
//Snap 페이지 찍힌 사진 컴포넌트

const SelectPhoto = ({ capturedPhotos }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false); // 선택 모드 상태 추가

    // 선택 모드 토글 함수
    const toggleSelectionMode = (isSelectionMode, setIsSelectionMode) => {
        setIsSelectionMode(!isSelectionMode);
    };

    // 사진 선택 상태를 업데이트하는 함수
    const toggleSelectPhoto = (photo, isSelectionMode, selectedPhotos, setSelectedPhotos) => {
        if (!isSelectionMode) return; // 선택 모드가 아닌 경우, 선택 불가능

        setSelectedPhotos((prevSelectedPhotos) => {
            if (prevSelectedPhotos.includes(photo)) {
                return prevSelectedPhotos.filter(p => p !== photo);
            } else {
                return [...prevSelectedPhotos, photo];
            }
        });
    };

    //전체선택 함수
    const selectAllPhotos = () => {
        if (selectedPhotos.length === capturedPhotos.length) {
            setSelectedPhotos([]); // 모든 사진이 이미 선택된 경우, 선택 해제
        } else {
            setSelectedPhotos(capturedPhotos); // 그렇지 않으면, 모든 사진 선택
        }
    };

    // 선택된 사진을 다운로드하는 함수
    const downloadSelectedPhotos = (selectedPhotos) => {
        selectedPhotos.forEach(photo => {
            const link = document.createElement('a');
            link.href = photo;
            link.download = 'photo.jpg';
            link.click();
        });
    };

    return (
        <>
            <C.SeletPhoto>
                <div id="topbar">
                    <S.H2_title>찍힌 사진</S.H2_title>
                    <div id='galleryBtn'>
                        <button
                            onClick={() => toggleSelectionMode(isSelectionMode, setIsSelectionMode)}
                            style={{ backgroundColor: isSelectionMode ? '#01DF74' : '#6D6D6D' }}
                        >
                            선택</button>
                        <button onClick={() => selectAllPhotos(capturedPhotos, setSelectedPhotos, selectedPhotos)}>전체 선택</button>
                        <button onClick={() => downloadSelectedPhotos(selectedPhotos)}>다운로드</button>
                        <button id="save">앨범에 저장</button>
                    </div>
                </div>
                <C.Gallery photoCount={capturedPhotos.length}>
                    {capturedPhotos && capturedPhotos.length > 0 ? (
                        capturedPhotos.map((photo, index) => (
                            <C.PhotoWrapper
                                key={index}
                                isSelected={selectedPhotos.includes(photo)}
                                onClick={() => toggleSelectPhoto(photo, isSelectionMode, selectedPhotos, setSelectedPhotos)} >
                                <img
                                    key={index}
                                    src={photo} alt={`Captured ${index}`}
                                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                                />
                            </C.PhotoWrapper>
                        ))
                    ) : (
                        <div id="zero"><p>여기에 찍힌 사진이 표시됩니다📸</p></div>
                    )}
                </C.Gallery>
            </C.SeletPhoto>
            <C.GotoAlbum>
                <S.Blink to='/album'>
                    <S.Example100 />
                    앨범 보러가기 ▶
                </S.Blink>
            </C.GotoAlbum>
        </>
    )
}

export default SelectPhoto;