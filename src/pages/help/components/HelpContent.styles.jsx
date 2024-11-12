import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  margin: 40px;
  border-radius: 20px 20px 0 0;
  border: 1px solid ${({ theme }) => theme.color.gray4};
  border-bottom: none;
`;

export const Header = styled.p`
  font-size: 35px;
  font-weight: 500;
`;
