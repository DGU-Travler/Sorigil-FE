import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 70%;
  margin: 0 auto;
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

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
`;

export const Toggle = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a6a6a6;
  transition: 0.4s;
  border-radius: 20px;
  ::before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  background-color: #f7c800;
`;
export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  label {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 5px;
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px; /* 슬라이더 바의 높이 */
    background: ${({ theme }) => theme.color.gray2};
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;

    &:hover {
      background: ${({ theme }) => theme.color.primary};
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px; /* 동그라미 크기 */
      height: 20px; /* 동그라미 크기 */
      border-radius: 50%;
      background: ${({ theme }) => theme.color.primary};
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: ${({ theme }) => theme.color.gray5};
      }
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.primary};
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: ${({ theme }) => theme.color.gray5};
      }
    }

    &::-ms-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.primary};
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: ${({ theme }) => theme.color.gray5};
      }
    }
  }
`;
