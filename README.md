# 저시력자를 위한 스크린 리더 확장 프로그램

## 주요 기능

1. 선택한 구역에 대한 음성 안내
2. 폼 필드 입력 음성 안내
3. 동적 콘텐츠 변화 안내
4. 대체 텍스트가 없는 이미지에 대하여 ai를 활용한 대체 텍스트 자동 생성
5. 레이블이 없는 폼 필드에 대하여 ai를 활용한 설명 자동 생성
6. 음성 명령으로 기능 호출
7. 사용자 맞춤형 단축키 및 TTS 설정

## 코드 흐름

### 클라이언트

#### 1. 선택한 구역에 대한 음성 안내 `highlightElement` `findReadableText` `readText`

- 구역 하이라이트는 보도 블록 색과 유사한 **#F7C800** 사용
- `findReadableText` 함수에서 선택한 요소의 innerText, alt, title 중 존재하는 값 탐색
- 만약 읽을 수 있는 텍스트가 없다면, 자식 태그까지 순회해서 탐색
- `readText` 함수에서는 요소의 value, innerText, alt, title, placeholder, ariaLabel 중 존재하는 값을 TTS로 안내 <br/>

#### 2. 폼 필드 입력 음성 안내

- **_input_** 혹은 **_textarea_** 필드 내 value 값이 있다면 TTS로 안내

#### 3. 동적 콘텐츠 변화 안내 `startObserving` `MutationObserver`

- `MutationObserver`으로 DOM의 변화 감지
- `findReadableText`으로 자식 태그까지 순회하며 탐색
- `startObserving` 함수로 호출

#### 4. 대체 텍스트가 없는 이미지에 대하여 ai를 활용한 대체 텍스트 자동 생성 `sendImageToBackend`

- img 클릭 시 alt, title 값이 있다면 해당 text를 TTS로 안내
- 만약 대체 텍스트가 없다면, `sendImageToBackend` 함수로 해당 img를 백엔드 서버로 전송해 ai로 대체 텍스트 생성 후 TTS로 안내

#### 5. 레이블이 없는 폼 필드에 대하여 ai를 활용한 설명 자동 생성 `sendFormToBackend`

- 폼 필드 클릭시 value, placeholder, ariaLabel 내용이 있다면 해당 내용 안내
- 읽을 수 있는 내용이 없다면 해당 form 태그의 내용을 백엔드 서버로 전송해 ai로 폼 필드 레이블 생성 후 TTS로 안내

#### 6. 음성 명령으로 기능 호출 `startListening` `sendHtmlToApi`

- 클라이언트가 단축키 **custom-shortcut-1(Ctrl+Shift+X)** 클릭시 마이크 활성화
- 음성 명령 인식 후 백엔드 서버로 명령과 해당 페이지 HTML 전송
- 백엔드 서버에서 ai로 HTML 구조를 분석한 뒤, 관련 기능을 response
- 프론트엔드에서는 해당 기능만을 화면에 크게 보여줌으로써 클라이언트가 쉽게 기능을 찾을 수 있음

#### 7. 사용자 맞춤형 단축키 및 TTS 설정 `speechSynthesis` `getVoices` `loadShortcuts`

- TTS는 `speechSynthesis` api 사용
- `getVoices`로 해당 os에서 사용할 수 있는 TTS 목록 반환 (한국어와 영어만 필터링 해 반환)
- TTS는 `background.js`에서 관리
- `handleVoiceChange` 음성 변경 함수
- `handleLanguageChange` 언어 변경 함수
- `handleSpeedChange` 속도 변경 함수
- `handleTonChange` 음조 변경 함수
- `handleVolumeChange` 볼륨 변경 함수
- 변경된 내용을 로컬 스토리지에 자동으로 저장해 사용자가 따로 저장 버튼을 누르는 작업을 번거로운 작업을 없앰
  <br/><br/>
- `loadShortcuts` 함수로 로컬 스토리지에 저장된 단축키 로드
- `handleShortcutAction` 단축키 동작 처리 함수
- `pressedKeys` 단축키 실행

### 클라이언트 - 서버

#### 1. 대체 텍스트 생성<br/>

1-1. 클라이언트가 img 클릭<br/>
1-2. 읽을 수 있는 텍스트가 없는 경우 `proxiedImageURL`로 외부 이미지를 프록시 서버를 통해 요청<br/>
1-3. 이미지 주소를 `blob`을 사용해 image file로 변환<br/>
1-4. 연동한 api로 formData 전송<br/>
1-5. 백엔드에서 ai로 이미지 대체 텍스트 생성<br/>
1-6. 백엔드에서 response 받은 **translated_caption**를 TTS로 출력<br/>

#### 2. 폼 필드 레이블 생성<br/>

2-1. 클라이언트가 form 클릭<br/>
2-2. 폼 필드 내의 input, textarea에 value, placeholder, ariaLabel이 있는지 확인<br/>
2-3. 관련 내용이 없다면 폼 태그 내부 내용을 formHtml으로 읽어 백엔드 서버로 formData 전송<br/>
2-4. 백엔드에서 response 받은 **data**를 TTS로 출력<br/>

#### 3. 음성 명령 기능 호출<br/>

3-1. 클라이언트가 음성 명령 단축키 클릭 후 마이크 활성화가 되면, 찾고자 하는 기능 음성 명령<br/>
3-1. `SpeechRecognition`으로 음성 명령 인식<br/>
3-2. `sendHtmlToApi` 함수에서 현재 페이지 HTML 가져오기<br/>
3-3. `blob`으로 HTML 코드를 file로 변환<br/>
3-4. formData에 **html_file(HTML 코드)**와 **search_term(인식된 음성 명령)** 저장 후 백엔드 서버로 전송<br/>
3-5. 백엔드에서 관련 기능을 찾은 후 해당 부분 HTML을 **processed_data**으로 제공<br/>
3-6. document.body.innerHTML으로 해당 페이지 덮어쓰기<br/>

## 프론트 세팅

```commandline
npm install
npm run build
```

브라우저에 build 된 폴더를 업로드한다.

## 백엔드 세팅

1. 가상환경 생성

```commandline
python -m venv venv
source venv/Scripts/activate
```

2. 의존성 모듈 설치

```commandline
pip install -r requirements.txt
```

3. .env 파일 추가 후 실행

```commandline
python manage.py migrate
python manage.py runserver
```
