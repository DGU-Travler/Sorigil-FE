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

    // 저장된 단축키를 업데이트
    chrome.storage.local.set({ shortcuts }, () => {
      console.log('단축키가 저장되었습니다.');
      sendResponse({ status: 'success' });
    });
    return true; // 비동기 응답을 위해 true 반환
  }
});
let storedShortcuts = [];

// 저장된 단축키를 로드
const loadShortcuts = () => {
  chrome.storage.local.get('shortcuts', (result) => {
    storedShortcuts = result.shortcuts || [];
    console.log('저장된 단축키:', storedShortcuts);
  });
};

// 초기화 시 단축키 로드
chrome.runtime.onInstalled.addListener(() => loadShortcuts());
chrome.runtime.onStartup.addListener(() => loadShortcuts());

// 단축키 동작 처리 함수
const handleShortcutAction = (shortcutId) => {
  const shortcut = storedShortcuts.find((s) => s.id === shortcutId);
  if (shortcut) {
    switch (shortcut.description) {
      case '커서 크기':
        console.log('커서 크기 조절 실행');
        break;
      case 'Start voice recognition':
        console.log('음성 인식 시작 실행');
        break;
      case 'Volume up':
        console.log('소리를 키웁니다.');
        break;
      case 'Volume down':
        console.log('소리를 줄입니다.');
        break;
      default:
        console.log('알 수 없는 동작');
    }
  } else {
    console.log('등록된 동작이 없습니다:', shortcutId);
  }
};

// 메시지 기반 단축키 처리
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'key-pressed') {
    const { pressedKey } = message;
    console.log('감지된 키:', pressedKey);

    const shortcut = storedShortcuts.find((s) => s.shortcut === pressedKey);
    if (shortcut) {
      console.log(`단축키 동작 실행: ${shortcut.description}`);
      handleShortcutAction(shortcut.id);
    } else {
      console.log('저장된 단축키가 없음');
    }
  }
});
