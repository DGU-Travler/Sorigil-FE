import React from 'react';
import * as S from './Popup.styled';
import { Link } from 'react-router-dom';

function Popup() {
  // const openNewTab = (url) => {
  //   chrome.tabs.create({ url: chrome.runtime.getURL(url) });
  // };

  return (
    <S.Container>
      <S.MenuContainer>
        <S.MenuButton>단축키 설정</S.MenuButton>
        <S.MenuButton>음성 설정</S.MenuButton>
        <S.MenuButton>활성화 버튼</S.MenuButton>
        <Link to="/help">
          <S.MenuButton>도움말</S.MenuButton>
        </Link>
      </S.MenuContainer>
    </S.Container>
  );
}
export default Popup;
