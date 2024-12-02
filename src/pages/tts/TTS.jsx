import React from 'react';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';
import * as S from './TTS.styled';

function TTS() {
  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <S.Logo src={sorigilLogo} alt="sorigil" />
          <S.TTS>음성 설정</S.TTS>
        </S.LogoContainer>
      </S.Header>
      <S.ContentContainer></S.ContentContainer>
    </S.Container>
  );
}
export default TTS;
