import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 70%;
  margin: 0 auto;
  background-color: white;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  padding: 20px 0;
`;

export const Logo = styled.img`
  width: 150px;
`;

export const TTS = styled.p`
  font-size: 24px;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-shadow: 3.8px 3.8px 19px 0px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;

export const Line = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray3};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.color.gray9};
  }
  p {
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray5};
    line-height: 25px;
  }
`;

export const SettingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px 0;
  label,
  p {
    font-size: 20px;
    font-weight: 500;
  }
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.color.gray4};
    border-radius: 4px;
    outline: none;
    background-color: ${({ theme }) => theme.color.white};
    transition:
      border-color 0.3s,
      box-shadow 0.3s;

    &:focus {
      border-color: ${({ theme }) => theme.color.primary};
      box-shadow: 0 0 5px ${({ theme }) => theme.color.primary};
    }

    option {
      font-size: 16px;
      color: ${({ theme }) => theme.color.black};
    }
  }
`;

export const ShortcutBox = styled.div`
  padding: 5px 10px;
  border: ${(props) => (props.isEditing ? '2px solid blue' : '1px solid #ccc')};
  background: ${(props) => (props.isEditing ? '#f0f8ff' : 'white')};
  cursor: pointer;
  min-width: 120px;
  text-align: center;
`;

export const FunctionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  align-items: center;
  gap: 20px;
  p {
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray5};
    text-align: right;
  }
  input {
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.color.gray4};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray5};
    width: 200px;
    padding: 10px;
  }
`;

export const SaveButton = styled.button`
  color: black;
  font-size: 18px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
`;

export const Button = styled.button`
  color: black;
  font-size: 18px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.color.gray2};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.gray4};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;
