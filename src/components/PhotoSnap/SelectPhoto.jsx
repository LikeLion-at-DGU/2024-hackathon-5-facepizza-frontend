import React, { useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
import { API } from '../../api'; // 정의한 API 인스턴스를 가져오기

//Snap 페이지 찍힌 사진 컴포넌트

const SelectPhoto = ({ capturedPhotos, setCapturedPhotos }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false); // 선택 모드 상태 추가
    const navigate = useNavigate(); // 추가

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
            const allPhotos = capturedPhotos.map(item => item.photo);
            setSelectedPhotos(allPhotos); // 그렇지 않으면, 모든 사진 선택
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

    // 종료 버튼 클릭 시 경고 메시지 표시 함수
    const handleExit = (event, path) => {
        if (capturedPhotos.length > 0 && !window.confirm('정말 나가시겠습니까?\n앨범에 저장하지 않은 스냅은 그대로 삭제됩니다')) {
            event.preventDefault();
        } else {
            navigate(path);
        }
    };

    const PostPhoto = async () => {
        try {
        const response = await API.post('/api/snaps', {
            image: "image",
            emotion: "emotion"
        });
        alert("사진이 저장되었습니다.");
      } catch (error) {
        alert('사진 저장 실패');
      }
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
                        <button id="save" onClick={PostPhoto}>앨범에 저장</button>
                    </div>
                </div>
                <C.Gallery photoCount={capturedPhotos.length}>
                    {capturedPhotos && capturedPhotos.length > 0 ? (
                        capturedPhotos.map((item, index) => (
                            <C.PhotoWrapper
                                key={index}
                                isSelected={selectedPhotos.includes(item.photo)}
                                onClick={() => toggleSelectPhoto(item.photo, isSelectionMode, selectedPhotos, setSelectedPhotos)} >
                                <C.CapturedPhoto
                                    key={index}
                                    src={item.photo} alt={`Captured ${index}`}
                                    photoCount={capturedPhotos.length}
                                />
                                <p>{item.emotion}</p> {/* 감정 표시 */}
                            </C.PhotoWrapper>
                        ))
                    ) : (
                        <div id="zero"><p>여기에 찍힌 사진이 표시됩니다📸</p></div>
                    )}
                </C.Gallery>
            </C.SeletPhoto>
            <C.FlexRow>
                <C.FakeEndBtn style={{backgroundColor: '#E77474'}}>
                    <S.Blink to='/' style={{color: 'white'}} onClick={(event) => handleExit(event, '/')}>
                        종료하기
                    </S.Blink>
                </C.FakeEndBtn>
                <C.FakeEndBtn style={{backgroundColor: '#7C7C7C'}}>
                    <S.Blink to='/album' style={{color: 'white'}} onClick={(event) => handleExit(event, '/album')}>
                        종료 후 스냅앨범 보러가기
                    </S.Blink>
                </C.FakeEndBtn>
            </C.FlexRow>
        </>
    )
}

export default SelectPhoto;