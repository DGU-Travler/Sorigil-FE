import React, { useState, useEffect } from 'react';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';
import * as S from './TTS.styled';

function TTS() {
  const [speed, setSpeed] = useState(1);
  const [isToggled, setIsToggled] = useState(false);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('한국어');
  const [ton, setTon] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [voices, setVoices] = useState([]);

  // chrome.tts에서 사용할 수 있는 음성 목록 호출
  const getVoices = () => {
    const synth = window.speechSynthesis;
    let voicesList = synth.getVoices();

    // 음성이 로드되었는지 확인 후 목록을 업데이트
    if (voicesList.length === 0) {
      synth.onvoiceschanged = () => {
        voicesList = synth.getVoices();
        setVoices(
          voicesList.filter((voice) => voice.lang.startsWith('ko') || voice.lang.startsWith('en'))
        );
      };
    } else {
      setVoices(
        voicesList.filter((voice) => voice.lang.startsWith('ko') || voice.lang.startsWith('en'))
      );
    }
  };

  useEffect(() => {
    getVoices();

    // 로컬 스토리지에서 저장된 설정을 불러오기
    chrome.storage.sync.get(
      ['voice', 'speed', 'ton', 'volume', 'isToggled', 'language'],
      (result) => {
        if (result.voice) setVoice(result.voice);
        if (result.speed) setSpeed(result.speed);
        if (result.ton) setTon(result.ton);
        if (result.volume) setVolume(result.volume);
        if (result.isToggled !== undefined) setIsToggled(result.isToggled);
        if (result.language) setLanguage(result.language);
      }
    );
  }, []);

  // 음성 변경
  const handleVoiceChange = (e) => {
    const selectedVoice = voices.find((v) => v.name === e.target.value);
    setVoice(selectedVoice.name);

    chrome.storage.sync.set({ voice: selectedVoice.name });

    chrome.runtime.sendMessage({
      type: 'setVoice',
      voice: selectedVoice.name,
    });
  };

  // 언어 변경
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    chrome.storage.sync.set({ language: selectedLanguage });

    chrome.runtime.sendMessage({
      type: 'setLanguage',
      language: selectedLanguage,
    });
  };

  // 속도 변경
  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    setSpeed(newSpeed);

    chrome.storage.sync.set({ speed: newSpeed });

    chrome.runtime.sendMessage({
      type: 'setRate',
      rate: newSpeed,
    });
  };

  // 음조 변경
  const handleTonChange = (e) => {
    const newTon = e.target.value;
    setTon(newTon);

    chrome.storage.sync.set({ ton: newTon });

    chrome.runtime.sendMessage({
      type: 'setPitch',
      pitch: newTon,
    });
  };

  // 볼륨 변경
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);

    chrome.storage.sync.set({ volume: newVolume });

    chrome.runtime.sendMessage({
      type: 'setVolume',
      volume: newVolume,
    });
  };

  const handleToggleChange = (e) => {
    setIsToggled(e.target.checked);

    chrome.storage.sync.set({ isToggled: e.target.checked });
  };

  const getBackgroundStyle = (value) => {
    return `linear-gradient(
      to right,
      #F7C800 0%,
      #F7C800 ${value * 20}%,
      #E4E4E4 ${value * 20}%,
      #E4E4E4 100%
    )`;
  };

  const getVolumeBackgroundStyle = (value) => {
    return `linear-gradient(
      to right,
      #F7C800 0%,
      #F7C800 ${value * 100}%,
      #E4E4E4 ${value * 100}%,
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
          {/* <S.SubContainer>
            <p>활성화 여부</p>
            <S.Switch className="switch">
              <S.Toggle type="checkbox" checked={isToggled} onChange={handleToggleChange} />
              <S.Slider></S.Slider>
            </S.Switch>
          </S.SubContainer> */}
          <S.SubContainer>
            <label htmlFor="voice">목소리</label>
            <select value={voice} onChange={handleVoiceChange}>
              {voices.map((voiceOption) => (
                <option key={voiceOption.name} value={voiceOption.name}>
                  {voiceOption.name} - {voiceOption.lang}
                </option>
              ))}
            </select>
          </S.SubContainer>

          <S.SubContainer>
            <label htmlFor="language">언어</label>
            <select value={language} onChange={handleLanguageChange}>
              <option value="한국어">한국어</option>
              <option value="영어">영어</option>
            </select>
          </S.SubContainer>

          <S.SliderContainer>
            <label htmlFor="speed">속도</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
              style={{ background: getBackgroundStyle(speed) }}
            />
          </S.SliderContainer>

          <S.SliderContainer>
            <label htmlFor="ton">음조</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={ton}
              onChange={handleTonChange}
              style={{ background: getBackgroundStyle(ton) }}
            />
          </S.SliderContainer>

          <S.SliderContainer>
            <label htmlFor="volume">볼륨</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{ background: getVolumeBackgroundStyle(volume) }}
            />
          </S.SliderContainer>
        </S.SettingContent>
      </S.ContentContainer>
    </S.Container>
  );
}

export default TTS;
