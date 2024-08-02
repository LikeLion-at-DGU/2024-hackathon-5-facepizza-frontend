import styled from "styled-components";
import { Link } from 'react-router-dom';


export const Breadcrumb = styled.span`
  display: flex;
  align-self: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
  text-align: left;

  a {
    color: #555;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RLink = styled(Link)`
  padding: 0 10px;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

export const ContBar =styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`