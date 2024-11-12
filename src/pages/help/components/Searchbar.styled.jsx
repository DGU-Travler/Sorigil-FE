import styled from '@emotion/styled';

export const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.color.gray2};
  background-color: white;
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.color.gray2};
`;

export const SearchIcon = styled.img`
  width: 20px;
`;

export const InputContainer = styled.input`
  width: 100%;
`;
