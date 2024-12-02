import React, { useState } from 'react';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';
import * as S from './TTS.styled';

function TTS() {
  const [speed, setSpeed] = useState(50);
  const [isToggled, setIsToggled] = useState(false);
  const [voice, setVoice] = useState('유나');
  const [language, setLanguage] = useState('한국어');
  const [ton, setTon] = useState(50);
  const [volume, setVolume] = useState(50);

  const getBackgroundStyle = (value) => {
    return `linear-gradient(
      to right,
      #F7C800 0%,
      #F7C800 ${value}%,
      #E4E4E4 ${value}%,
      #E4E4E4 100%
    )`;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo src={sorigilLogo} alt="sorigil" />
      </S.Header>
      <S.ContentContainer>
        <S.TitleContainer>
          <h1>음성 설정</h1>
          <p>
            텍스트를 읽어주는 음성 변환 도구에 대한 설정을 할 수 있습니다. 아래의 설정을 수정 시
            저장 필요 없이 수정사항이 바로 반영됩니다.
          </p>
        </S.TitleContainer>
        <S.Line />
        <S.SettingContent>
          <S.SubContainer>
            <p>활성화 여부</p>
            <S.Switch className="switch">
              <S.Toggle
                type="checkbox"
                checked={isToggled}
                onChange={(e) => setIsToggled(e.target.checked)}
              />
              <S.Slider></S.Slider>
            </S.Switch>
          </S.SubContainer>
          <S.SubContainer>
            <label htmlFor="language">목소리</label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value="option1">유나</option>
              <option value="option2">옵션 2</option>
              <option value="option3">옵션 3</option>
            </select>
          </S.SubContainer>
          <S.SubContainer>
            <label htmlFor="speed">언어</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="option1">한국어</option>
              <option value="option2">옵션 2</option>
              <option value="option3">옵션 3</option>
            </select>
          </S.SubContainer>
          <S.SliderContainer>
            <label htmlFor="speed">속도</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              style={{ background: getBackgroundStyle(speed) }}
            />
          </S.SliderContainer>
          <S.SliderContainer>
            <label htmlFor="tom">음조</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={ton}
              onChange={(e) => setTon(e.target.value)}
              style={{ background: getBackgroundStyle(ton) }}
            />
          </S.SliderContainer>
          <S.SliderContainer>
            <label htmlFor="volumn">볼륨</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{ background: getBackgroundStyle(volume) }}
            />
          </S.SliderContainer>
        </S.SettingContent>
      </S.ContentContainer>
    </S.Container>
  );
}
export default TTS;
