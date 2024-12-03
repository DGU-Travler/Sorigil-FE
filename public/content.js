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
        const { best_caption, translated_caption } = await sendImageToBackend(imageURL);
        if (best_caption) {
          chrome.runtime.sendMessage({ text: best_caption });
        } else {
          console.error('best_caption이 생성되지 않았습니다.');
        }

        // translated_caption이 있을 경우 TTS로 읽기
        if (translated_caption) {
          chrome.runtime.sendMessage({ text: translated_caption });
        } else {
          console.error('translated_caption이 생성되지 않았습니다.');
        }

        // 만약 두 개의 텍스트가 모두 없으면 안내
        if (!best_caption && !translated_caption) {
          chrome.runtime.sendMessage({ text: '이미지 대체 텍스트를 생성할 수 없습니다.' });
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
    const response = await fetch(imageURL);
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
    return {
      best_caption: data.best_caption, // 원본 텍스트 (best_caption)
      translated_caption: data.translated_caption, // 번역된 텍스트 (translated_caption)
    };
  } catch (error) {
    console.error('백엔드 호출 중 오류 발생:', error);
    throw new Error('이미지 대체 텍스트 생성 API 호출 실패');
  }
}
