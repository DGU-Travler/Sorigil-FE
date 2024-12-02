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
  const text =
    element.value ||
    element.innerText ||
    element.alt ||
    element.title ||
    element.placeholder ||
    element.ariaLabel ||
    element.value ||
    '읽을 수 있는 텍스트가 없습니다.';
  if (text) {
    chrome.runtime.sendMessage({ text }); // background.js에 텍스트 전송
  }
}

// 클릭 이벤트 리스너 추가
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

// 폼 필드 입력 음성 안내
document.addEventListener('input', (event) => {
  const element = event.target;
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    chrome.runtime.sendMessage({ text: element.value }); // 입력값 TTS로 읽기
  }
});
