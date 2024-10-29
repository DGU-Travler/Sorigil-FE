import React from 'react';
import * as S from './Popup.styled';

function Popup() {
  const openNewTab = (url) => {
    chrome.tabs.create({ url: chrome.runtime.getURL(url) });
  };

  return (
    <S.Container>
      <S.MenuContainer>
        <S.MenuButton onClick={() => openNewTab('/setting')}>단축키 설정</S.MenuButton>
        <S.MenuButton onClick={() => openNewTab('/setting')}>음성 설정</S.MenuButton>
        <S.MenuButton>활성화 버튼</S.MenuButton>
        <S.MenuButton onClick={() => openNewTab('/help')}>도움말</S.MenuButton>
      </S.MenuContainer>
    </S.Container>
  );
}
export default Popup;
