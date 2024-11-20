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
  const text = findReadableText(element);
  chrome.runtime.sendMessage({ text }); // background.js에 텍스트 전송
}

// 일반 DOM에 클릭 이벤트 리스너 추가
document.addEventListener('click', (event) => {
  const element = event.target;
  highlightElement(element); // 하이라이트 적용
  readText(element); // TTS로 텍스트 읽기
});

// Tab 키 포커스 이벤트 리스너 추가
document.addEventListener('focusin', (event) => {
  const element = event.target;
  highlightElement(element); // 하이라이트 적용
  readText(element); // TTS로 텍스트 읽기
});

// iFrame에서 발생하는 메시지 처리
window.addEventListener('message', (event) => {
  try {
    // 보안 확인: iFrame에서 온 메시지만 처리
    const allowedOrigins = ['https://trusted-iframe-domain.com'];
    if (!allowedOrigins.includes(event.origin)) {
      console.warn('허용되지 않은 출처에서 온 메시지:', event.origin);
      return;
    }

    const { type, elementInfo } = event.data;

    // 메시지 타입에 따라 처리
    if (type === 'highlight') {
      console.log('iFrame에서 전달된 요소 정보:', elementInfo);
      // iFrame에서 받은 정보로 하이라이트
      const mockElement = { innerText: elementInfo.textContent }; // 모의 객체 생성
      highlightElement(mockElement);
    } else if (type === 'readText') {
      console.log('iFrame에서 요청된 텍스트 읽기:', elementInfo.textContent);
      const mockElement = { innerText: elementInfo.textContent }; // 모의 객체 생성
      readText(mockElement);
    }
  } catch (error) {
    console.error('iFrame 메시지 처리 중 오류 발생:', error);
  }
});

// iFrame이 로드되었음을 확인하고 메시지 전송
const iframes = document.querySelectorAll('iframe');
iframes.forEach((iframe) => {
  try {
    // iFrame에 초기 메시지 전달 (필요 시)
    iframe.contentWindow.postMessage({ type: 'initialize', message: 'Hello iFrame!' }, '*');
  } catch (error) {
    console.warn('iFrame에 메시지를 보낼 수 없음:', iframe.src, error);
  }
});
