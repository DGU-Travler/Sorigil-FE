import React from 'react';
import * as S from './Searchbar.styled';
import searchIcon from '../../../assets/images/search-icon.svg';

function Searchbar() {
  return (
    <S.Container>
      <S.SearchIcon src={searchIcon} alt="search" />
      <form>
        <S.InputContainer placeholder="도움말 검색" />
      </form>
    </S.Container>
  );
}

export default Searchbar;
