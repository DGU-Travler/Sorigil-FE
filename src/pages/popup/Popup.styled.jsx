import styled from '@emotion/styled';

export const Container = styled.div`
  width: 200px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const MenuButton = styled.button`
  text-align: left;
  padding: 15px;
  background-color: white;
  border: none;
  :hover {
    background-color: var(--gray2);
  }
  white-space: nowrap;
  font-family: 'pretendard', sans-serif;
`;
