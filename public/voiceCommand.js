function getAPIKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('ETRI_API_KEY', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(result.ETRI_API_KEY);
      }
    });
  });
}
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'start-voice-command') {
    console.log('content.js: 음성 명령 시작 메시지 수신');
    await startVoiceRecognition();
    sendResponse({ status: 'started' });
  }
  return true; // 비동기 응답을 위해 true 반환
});

async function startVoiceRecognition() {
  const ETRI_API_URL = 'http://aiopen.etri.re.kr:8000/WiseASR/Recognition';
  const apiKey = await getAPIKey();

  if (!apiKey) {
    console.error('ETRI API 키를 가져올 수 없습니다.');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    let audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioBuffer = await audioBlob.arrayBuffer();
      const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

      const requestJson = {
        argument: {
          language_code: 'korean',
          audio: audioBase64,
        },
      };

      const response = await fetch(ETRI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: apiKey,
        },
        body: JSON.stringify(requestJson),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('음성 인식 결과:', result.return_object.recognition_result);

        // 결과를 화면에 표시
        displayResult(result.return_object.recognition_result);
      } else {
        console.error('API 오류:', result);
      }
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000); // 5초 후 녹음 종료
  } catch (error) {
    console.error('음성 인식 오류:', error);
  }
}

function displayResult(text) {
  const outputDiv = document.createElement('div');
  outputDiv.style.position = 'fixed';
  outputDiv.style.bottom = '10px';
  outputDiv.style.right = '10px';
  outputDiv.style.backgroundColor = 'white';
  outputDiv.style.padding = '10px';
  outputDiv.style.border = '1px solid black';
  document.body.appendChild(outputDiv);
  outputDiv.textContent = `인식된 텍스트: ${text}`;
}
