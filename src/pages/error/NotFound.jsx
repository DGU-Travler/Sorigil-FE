import React from 'react';
import { useRouteError } from 'react-router-dom';
import * as S from './NotFound.styled';

function NotFound() {
  const error = useRouteError();

  return (
    <S.MainWrapper>
      <S.MainTitle>Oops!</S.MainTitle>

      <S.MainDescription>Sorry, an unexpected error has occurred</S.MainDescription>
      <S.MainSubDescription>{error.statusText || error.message}</S.MainSubDescription>
    </S.MainWrapper>
  );
}

export default NotFound;
