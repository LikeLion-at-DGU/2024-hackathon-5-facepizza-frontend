import React, { useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import * as C from '../../styles/CameraStyled';
import * as S from '../../styles/StyledComponents';
<<<<<<< HEAD
import { API } from '../../api'; // 정의한 API 인스턴스를 가져오기
import axios from 'axios';
=======
import { API } from '../../api';
>>>>>>> 5f5d56181690e9bdf87bd5f86578b73b05a05fb7

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
    const toggleSelectPhoto = (item, isSelectionMode, selectedPhotos, setSelectedPhotos) => {
        if (!isSelectionMode) return; // 선택 모드가 아닌 경우, 선택 불가능

        setSelectedPhotos((prevSelectedPhotos) => {
            if (prevSelectedPhotos.includes(item)) {
                return prevSelectedPhotos.filter(p => p !== item);
            } else {
                return [...prevSelectedPhotos, item];
            }
        });
    };

    //전체선택 함수
    const selectAllPhotos = () => {
        if (selectedPhotos.length === capturedPhotos.length) {
            setSelectedPhotos([]); // 모든 사진이 이미 선택된 경우, 선택 해제
        } else {
            const allPhotos = capturedPhotos;
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
    const postSelectedPhotos = async () => {
        try {
          const promises = selectedPhotos.map(photo => {
            return axios.post('/api/snaps', {
              image: photo, // 이미지 데이터
              emotion: "emotion" // 감정 데이터는 상황에 맞게 추가
            });
          });
          await Promise.all(promises);
          alert("선택한 사진이 저장되었습니다.");
        } catch (error) {
          alert('사진 저장 실패');
        }
      };

      
    

    // 선택된 사진을 앨범에 저장하는 함수
    const postPhoto = async (selectedPhotos) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('로그인이 필요합니다.');
            }
    
            const uploadPromises = selectedPhotos.map(item => {
                console.log(item.emotion);
                return API.post('/api/snaps', {
                    image: item.photo, // 이미지 데이터, base64 형식으로 인코딩된 문자열
                    emotion: item.emotion // 감정 데이터
                }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            });
    
            // 모든 POST 요청이 완료될 때까지 기다립니다.
            await Promise.all(uploadPromises);
    
            alert("모든 사진이 저장되었습니다.");
        } catch (error) {
            console.error('사진 저장 실패:', error);
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
                        <button onClick={() => postPhoto(selectedPhotos)}>앨범에 저장</button>
                    </div>
                </div>
                <C.Gallery photoCount={capturedPhotos.length}>
                    {capturedPhotos && capturedPhotos.length > 0 ? (
                        capturedPhotos.map((item, index) => (
                            <C.PhotoWrapper
                                key={index}
                                isSelected={selectedPhotos.includes(item)}
                                onClick={() => toggleSelectPhoto(item, isSelectionMode, selectedPhotos, setSelectedPhotos)} >
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