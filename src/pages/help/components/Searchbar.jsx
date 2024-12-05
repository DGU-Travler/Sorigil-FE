import React from 'react';
import * as S from './Searchbar.styled';
import searchIcon from '../../../assets/images/search-icon.svg';

function Searchbar({ searchTerm, onSearchChange }) {
  return (
    <S.Container>
      <S.SearchIcon src={searchIcon} alt="search" />

      <S.InputContainer
        type="text"
        placeholder="도움말 검색"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </S.Container>
  );
}

export default Searchbar;
