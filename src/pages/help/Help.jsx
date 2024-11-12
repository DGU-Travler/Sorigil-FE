import React from 'react';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';
import * as S from './Help.styled';
import Searchbar from './components/Searchbar';
import Sidebar from './components/Sidebar';
import HelpContent from './components/HelpContent';

function Help() {
  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <S.Logo src={sorigilLogo} alt="sorigil" />
          <S.Help>도움말</S.Help>
        </S.LogoContainer>
        <Searchbar />
      </S.Header>
      <S.ContentContainer>
        <Sidebar />
        <HelpContent />
      </S.ContentContainer>
    </S.Container>
  );
}
export default Help;
