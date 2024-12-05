// 마지막으로 포커스된 요소를 추적
let lastFocusedElement = null;

// 요소에 하이라이트 추가
function highlightElement(element) {
  if (lastFocusedElement) {
    lastFocusedElement.style.border = ''; // 이전 요소 하이라이트 제거
    lastFocusedElement.style.borderRadius = '';
    lastFocusedElement.style.outline = ''; // 이전 요소의 outline 제거
  }
  lastFocusedElement = element;

  // 하이라이트 스타일 적용
  element.style.border = '3px solid #F7C800';
  element.style.borderRadius = '7px';

  // 포커스 시 기본 outline 제거
  element.style.outline = 'none'; // 기본 outline 제거

  // 동적 콘텐츠를 읽도록 설정
  startObserving(element);
}

// 요소의 텍스트를 TTS로 읽기
// 텍스트가 없다면 자식 태그 순회
function findReadableText(element) {
  if (!element) return '읽을 수 있는 텍스트가 없습니다.';

  // 우선 순위: innerText > alt > title
  const text = element.innerText || element.alt || element.title;
  if (text) return text.trim();

  for (const child of element.children) {
    const childText = findReadableText(child);
    if (childText) return childText;
  }
  return '읽을 수 있는 텍스트가 없습니다.';
}

function readText(element) {
  const text =
    element.value ||
    element.innerText ||
    element.alt ||
    element.title ||
    element.placeholder ||
    element.ariaLabel; // ||
  //'읽을 수 있는 텍스트가 없습니다.';
  if (text) {
    chrome.runtime.sendMessage({ text }); // background.js에 텍스트 전송
  }
}

// 클릭 이벤트 리스너 추가
document.addEventListener('click', (event) => {
  const element = event.target;
  highlightElement(element); // 하이라이트 적용
  readText(element); // TTS로 텍스트 읽기
  const formElement = element.closest('form');

  // 폼 태그 클릭했을 때만 처리
  if (formElement) {
    const formHtml = formElement.outerHTML;

    // 폼 필드에 읽을 수 있는 값이 있는지 확인
    const hasReadableValue = Array.from(formElement.querySelectorAll('input, textarea')).some(
      (input) => {
        return input.value || input.placeholder || input.ariaLabel;
      }
    );

    // 폼 필드에 값이 없으면 백엔드로 API 호출
    if (!hasReadableValue) {
      sendFormToBackend(formHtml)
        .then((result) => {
          console.log('백엔드 응답:', result);

          // 음성 안내 메시지 전송
          chrome.runtime.sendMessage({ text: result.content });
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);

          // 오류 메시지를 음성으로 안내
          chrome.runtime.sendMessage({
            text: '폼 분석 API 호출 중 오류가 발생했습니다. 다시 시도해주세요.',
          });
        });
    } else {
      console.log('폼 필드에 읽을 수 있는 값이 있음');
    }
  }
});

// 폼 데이터를 백엔드로 전송하는 함수
async function sendFormToBackend(formHtml) {
  try {
    const formData = new FormData();
    formData.append('form_lables', formHtml);

    const response = await fetch('http://127.0.0.1:8000/api/form-labels/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('폼 분석 API 호출 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('백엔드 호출 중 오류 발생:', error);
    throw new Error('폼 분석 API 호출 실패');
  }
}

// Tab 키 포커스 이벤트 리스너 추가
document.addEventListener('focusin', (event) => {
  const element = event.target;
  highlightElement(element); // 하이라이트 적용
  readText(element); // TTS로 텍스트 읽기
});

// 폼 필드 입력 음성 안내
document.addEventListener('input', (event) => {
  const element = event.target;
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    chrome.runtime.sendMessage({ text: element.value }); // 입력값 TTS로 읽기
  }
});

// 동적 콘텐츠 안내
const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach((mutation) => {
    if (lastFocusedElement && lastFocusedElement.contains(mutation.target)) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode.nodeType === 1) {
            const text = findReadableText(addedNode);
            if (text && text !== '읽을 수 있는 텍스트가 없습니다.') {
              chrome.runtime.sendMessage({ text });
            }
          }
        });
      } else if (mutation.type === 'characterData') {
        const text = findReadableText(mutation.target);
        if (text && text !== '읽을 수 있는 텍스트가 없습니다.') {
          chrome.runtime.sendMessage({ text });
        }
      }
    }
  });
});

// 동적 콘텐츠 감지
function startObserving(element) {
  if (element) {
    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

document.addEventListener('click', async (event) => {
  const element = event.target;

  // 이미지인지 확인
  if (element.tagName === 'IMG') {
    const altText = element.alt || element.title || '읽을 수 있는 텍스트가 없습니다.';

    if (altText === '읽을 수 있는 텍스트가 없습니다.') {
      // 대체 텍스트가 없으면 이미지를 백엔드로 전송하여 처리
      const imageURL = element.src;

      try {
        const text = await sendImageToBackend(imageURL);

        if (text) {
          console.log('백엔드 응답:', text);
          chrome.runtime.sendMessage({ text });
        } else {
          console.error('translated_caption이 생성되지 않았습니다.');
        }
      } catch (error) {
        console.error('이미지 대체 텍스트 생성 실패:', error);
        chrome.runtime.sendMessage({ text: '이미지 대체 텍스트를 생성할 수 없습니다.' }); // TTS로 안내
      }
    } else {
      chrome.runtime.sendMessage({ text: altText }); // 기존 alt 텍스트 읽기
    }
  } else {
    readText(element); // 일반 텍스트 요소 읽기
  }
});

// 이미지 URL을 백엔드로 전송하는 함수
async function sendImageToBackend(imageURL) {
  try {
    // 외부 이미지를 프록시 서버를 통해 요청
    const proxiedImageURL = `http://127.0.0.1:8000/api/proxy-image/?url=${encodeURIComponent(imageURL)}`;

    const response = await fetch(proxiedImageURL);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    // 백엔드 API 호출
    const result = await fetch('http://127.0.0.1:8000/api/analyze/', {
      method: 'POST',
      body: formData,
    });

    if (!result.ok) {
      throw new Error('이미지 대체 텍스트 생성 API 호출 실패');
    }

    const data = await result.json();
    return data.translated_caption;
  } catch (error) {
    console.error('백엔드 호출 중 오류 발생:', error);
    throw new Error('이미지 대체 텍스트 생성 API 호출 실패');
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.text) {
    chrome.tts.speak(message.text, { lang: currentLang });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start-voice-command') {
    const lang = message.lang; // background.js에서 전달된 lang 값

    startListening(lang); // lang 값을 startListening에 전달

    sendResponse({ status: 'success' });
  }
});

// 음성 인식 시작
function startListening(lang) {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = lang; // 전달된 언어 설정
  recognition.interimResults = false; // 중간 결과 비활성화
  recognition.maxAlternatives = 1; // 단일 결과

  recognition.start();
  console.log('음성 인식 시작됨');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('인식된 텍스트:', transcript);
    chrome.runtime.sendMessage({ text: transcript }); // 인식된 텍스트를 TTS로 전송
  };

  recognition.onerror = (event) => {
    console.error('음성 인식 오류:', event.error);
  };

  recognition.onend = () => {
    console.log('음성 인식 종료');
  };

  // 5초 후 자동 종료
  setTimeout(() => {
    recognition.stop();
    console.log('마이크 자동 종료');
  }, 3000);

  setTimeout(() => {
    sendHtmlToApi();
  }, 3000);
}

let isRequestInProgress = false; // 요청 진행 여부를 추적하는 변수

function sendHtmlToApi() {
  // 요청이 이미 진행 중이라면, 추가 요청을 방지
  if (isRequestInProgress) {
    console.log('이미 요청이 진행 중입니다.');
    return;
  }

  isRequestInProgress = true; // 요청 시작 시 상태 변경

  // 현재 페이지의 HTML을 가져옵니다.
  const htmlContent = document.documentElement.outerHTML;
  const file = new Blob([htmlContent], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('html_file', file, 'page.html'); // 페이지의 HTML을 'page.html'로 파일 첨부
  formData.append('search_term', '로그인'); // 검색어를 'search_term'으로 첨부

  // API 요청 보내기 (FormData는 자동으로 'Content-Type'을 'multipart/form-data'로 설정함)
  fetch('http://127.0.0.1:8000/api/find/', {
    method: 'POST',
    body: formData, // FormData를 요청의 body로 전송
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('API 응답:', data);
      const processedHtml = `
      <html>
        <head>
          <style>
            body {
              height: 100vh; /* 화면 전체 높이 */
              display: flex;
              justify-content: center; /* 수평 가운데 정렬 */
              margin: 0; /* 기본 여백 제거 */
            }
            button {
              width: 100%;
              padding: 10px;
              font-size: 18px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.3s;

              &:hover {
                background-color: #0056b3;
              }
            }
          </style>
        </head>
        <body> 
          <button>로그인</button> 
        </body> 
      </html>
    `;

      document.body.innerHTML = processedHtml;

      // 버튼 클릭 시 /login 페이지로 이동하도록 설정
      const button = document.querySelector('button');
      button.addEventListener('click', () => {
        window.location.href = '/login'; // /login 페이지로 이동
      });
      isRequestInProgress = false; // 응답을 받으면 상태를 되돌립니다.
    })
    .catch((error) => {
      console.error('API 요청 오류:', error);
      isRequestInProgress = false; // 오류 발생 시에도 상태를 되돌립니다.
    });
}
