import React from 'react';
import * as S from './Sidebar.styles';
import sorigilIcon from '../../../assets/images/Sorigil-icon.svg';
import arrowIcon from '../../../assets/images/arrow-icon.svg';

function Sidebar() {
  return (
    <S.Container>
      <S.Header>빠른 도움말</S.Header>
      <S.MenuContainer>
        <S.Menu>
          <S.BigMenu>
            <S.SorigilIcon src={sorigilIcon} alt="sorigil" />
            <S.BigText>SORIGIL 시작하기</S.BigText>
          </S.BigMenu>
        </S.Menu>
        <S.Menu>
          <S.BigMenu>
            <S.SorigilIcon src={sorigilIcon} alt="sorigil" />
            <S.BigText>SORIGIL에서 제공하는 기능</S.BigText>
          </S.BigMenu>
          <S.SmallMenuContainer>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>선택한 영역 읽어주기</S.Text>
            </S.SmallMenu>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>이미지 대체텍스트 생성</S.Text>
            </S.SmallMenu>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>음성 명령으로 기능 호출</S.Text>
            </S.SmallMenu>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>음성 명령으로 기능 호출</S.Text>
            </S.SmallMenu>
          </S.SmallMenuContainer>
        </S.Menu>
        <S.Menu>
          <S.BigMenu>
            <S.SorigilIcon src={sorigilIcon} alt="sorigil" />
            <S.BigText>단축키 설정하기</S.BigText>
          </S.BigMenu>
          <S.SmallMenuContainer>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>기본 단축키 설명</S.Text>
            </S.SmallMenu>
            <S.SmallMenu>
              <S.ArrowIcon src={arrowIcon} alt="arrow" />
              <S.Text>단축키 설정 방법</S.Text>
            </S.SmallMenu>
          </S.SmallMenuContainer>
        </S.Menu>
        <S.Menu>
          <S.BigMenu>
            <S.SorigilIcon src={sorigilIcon} alt="sorigil" />
            <S.BigText>음성 설정하기</S.BigText>
          </S.BigMenu>
        </S.Menu>
      </S.MenuContainer>
    </S.Container>
  );
}

export default Sidebar;
