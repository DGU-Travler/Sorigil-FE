let currentVoice = null;
let currentLang = 'ko-KR';
let currentRate = 1;
let currentPitch = 1;
let currentVolume = 1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    const utterance = message.text;

    // 음성 설정 업데이트
    const options = {
      voiceName: currentVoice, // 음성
      lang: currentLang, // 언어
      rate: currentRate, // 속도
      pitch: currentPitch, // 음조
      volume: currentVolume, // 볼륨
    };

    chrome.tts.speak(utterance, options);
  }
});

// 음성 언어 및 설정 변경
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'setVoice') {
    currentVoice = message.voice;
  } else if (message.type === 'setLanguage') {
    currentLang = message.language === '한국어' ? 'ko-KR' : 'en-US';
  } else if (message.type === 'setRate') {
    currentRate = message.rate;
  } else if (message.type === 'setPitch') {
    currentPitch = message.pitch;
  } else if (message.type === 'setVolume') {
    currentVolume = message.volume;
  }
});
