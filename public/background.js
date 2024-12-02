// content.js로부터 메시지를 받아 TTS로 읽어주는 기능
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    const utterance = new SpeechSynthesisUtterance(message.text);

    // 음성 설정
    utterance.lang = 'ko-KR'; // 한국어 설정
    utterance.rate = 1.0; // 속도
    utterance.pitch = 1.0; // 음정
    utterance.volume = 1.0; // 볼륨

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
});
