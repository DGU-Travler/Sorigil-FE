// content.js로부터 메시지를 받아 TTS로 읽어주는 기능
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    chrome.tts.speak(message.text, {
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      lang: 'ko-KR',
    });
  }
});
