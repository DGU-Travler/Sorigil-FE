let currentVoice = null;
let currentLang = 'ko-KR';
let currentRate = 1;
let currentPitch = 1;
let currentVolume = 1;

let recognition;
let isListening = false;

// 단축키 처리
chrome.commands.onCommand.addListener((command) => {
  if (command === 'custom-shortcut-1') {
    console.log('단축키 활성화, 음성 명령 시작');

    // 현재 활성 탭을 찾고 content.js로 메시지 전송
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;

        // content.js에 메시지 전달 (현재 설정 전달)
        chrome.tabs.sendMessage(
          tabId,
          { action: 'start-voice-command', lang: currentLang },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error('메시지 전달 오류:', chrome.runtime.lastError.message);
            } else {
              console.log('content.js 응답:', response);
            }
          }
        );
      } else {
        console.error('활성 탭을 찾을 수 없습니다.');
      }
    });
  }
});

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

  if (message.action === 'save-shortcuts') {
    const { shortcuts } = message;

    chrome.storage.local.set({ shortcuts }, () => {
      console.log('단축키가 저장되었습니다:', shortcuts);

      // commands 업데이트
      Object.keys(shortcuts).forEach((id) => {
        const shortcut = shortcuts[id];
        // 저장된 단축키를 확장 프로그램의 commands로 설정
        chrome.commands.update({
          name: `custom-shortcut-${id}`,
          shortcut,
        });
      });

      sendResponse({ status: 'success' });
    });
  }
  return true; // 비동기 응답을 위해 true 반환
});
