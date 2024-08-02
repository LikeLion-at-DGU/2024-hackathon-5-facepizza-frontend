// styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

  body {
    font-family: 'NanumSquare', sans-serif;
  }
`;

export default GlobalStyle;
