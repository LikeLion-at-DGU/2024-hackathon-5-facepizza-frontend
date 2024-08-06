import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as R from '../styles/RouteBarStyled'

const Breadcrumb = styled.div`
  margin: 20px;
  font-size: 14px;
`;

const RouteBar = () => {
  const location = useLocation();
  const { postID } = useParams();
  console.log(location.pathname);
  let breadcrumb;

  switch (location.pathname) {
    case '/aboutus':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/aboutus">team 얼굴피자</R.RLink></R.ContBar>;
      break;
    case '/tracking':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/tracking/list">트래킹 개요</R.RLink> 〉 <R.RLink to="/tracking">표정 트래킹하기</R.RLink></R.ContBar>;
      break;
    case '/tracking/report':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/tracking/list">트래킹 개요</R.RLink> 〉 <R.RLink to="/tracking/report">레포트</R.RLink></R.ContBar>;
      break;
    case '/tracking/list':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/tracking/list">트래킹 개요</R.RLink></R.ContBar>;
      break;
    case '/tracking/reportdata':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/tracking/list">트래킹 개요</R.RLink> 〉 <R.RLink to="/tracking/report">레포트</R.RLink></R.ContBar>;
      break;
    case '/snap':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/snap">표정 스냅</R.RLink></R.ContBar>;
      break;
    case '/snap/FourCut':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/snap">표정 스냅</R.RLink> 〉 <R.RLink to="/snap">치즈 네컷</R.RLink></R.ContBar>;
      break;
    case '/album':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/album">표정 앨범</R.RLink></R.ContBar>;
      break;
    case '/Login':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/Login">로그인</R.RLink></R.ContBar>;
      break;
    case '/Acount':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/Acount">회원가입</R.RLink></R.ContBar>;
      break;
    case '/Mypage':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/Mypage">마이페이지</R.RLink></R.ContBar>;
      break;
    case '/Magzine':
      breadcrumb = <R.ContBar><R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/Magzine">인사이트 창고</R.RLink></R.ContBar>;
      break;
    default:
      if (location.pathname.includes('/Magzine/detail/')) {
        breadcrumb = (
          <R.ContBar>
            <R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/Magzine">인사이트 창고</R.RLink> 〉 <R.RLink to='/Magzine:postID'>포스트</R.RLink>
          </R.ContBar>
        );
      } if (location.pathname.includes('/Magzine/report/')) {
        breadcrumb = (
          <R.ContBar>
            <R.RLink to="/">홈</R.RLink> 〉 <R.RLink to="/tracking/list">트래킹 개요</R.RLink> 〉 <R.RLink to="/tracking/report:reportid">레포트</R.RLink>
          </R.ContBar>
        );
      } else {
        breadcrumb = <></>;
      }
  }

  return (<R.Breadcrumb>{breadcrumb}</R.Breadcrumb>);
};

export default RouteBar;
