import React, { useEffect, useRef, useState } from 'react';
import * as S from './Setting.styles';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';

function Setting() {
  const [shortcuts, setShortcuts] = useState({});
  const [inputValues, setInputValues] = useState({});
  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    chrome.storage.local.set({ shortcuts: inputValues }, () => {
      alert('단축키가 저장되었습니다.');
      setShortcuts(inputValues);

      // background로 단축키 전달
      chrome.runtime.sendMessage(
        { action: 'save-shortcuts', shortcuts: inputValues },
        (response) => {
          if (response?.status === 'success') {
            console.log('단축키가 저장되었습니다.');
          } else {
            console.error('단축키 저장 실패:', response?.error);
          }
        }
      );
    });
  };

  useEffect(() => {
    // 저장된 단축키 불러오기
    chrome.storage.local.get('shortcuts', (result) => {
      if (result.shortcuts) {
        setShortcuts(result.shortcuts);
        setInputValues(result.shortcuts);
      }
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Logo src={sorigilLogo} alt="sorigil" />
      </S.Header>
      <S.ContentContainer>
        <S.TitleContainer>
          <h1>단축키 설정</h1>
          <p>
            아래의 입력란에 자주 사용하는 웹 뷰에 대한 단축키를 맞춤 설정합니다. 각 기능의 오른쪽에
            위치한 설정 박스를 누르고, 단축키를 직접 누르면 해당 단축키로 설정됩니다.
          </p>
        </S.TitleContainer>
        <S.Line />
        <S.SettingContent>
          <S.SubContainer>
            <p>웹 뷰 커스터마이징</p>
            <S.FunctionContainer>
              <p>화면 크기</p>
              Ctrl + +
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p> 커서 크기 </p>
              <input
                type="text"
                value={inputValues[0] || ''}
                onChange={(e) => handleInputChange(0, e.target.value)}
                placeholder="단축키 입력"
                style={{
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              ></input>
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>탐색 관리</p>
            <S.FunctionContainer>
              <p>다음 항복 이동</p>
              <div>Tab</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>이전 항목 이동</p>
              <div>Shift + Tab</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>페이지 처음으로 이동</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>페이지 끝으로 이동</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>음성 명령 사용</p>
              <input
                type="text"
                value={inputValues[1] || ''}
                onChange={(e) => handleInputChange(1, e.target.value)}
                placeholder="단축키 입력"
                style={{
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>음성 관리</p>
            <S.FunctionContainer>
              <p>소리 키우기</p>
              <input
                type="text"
                value={inputValues[2] || ''}
                onChange={(e) => handleInputChange(2, e.target.value)}
                placeholder="단축키 입력"
                style={{
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>소리 줄이기</p>
              <input
                type="text"
                value={inputValues[3] || ''}
                onChange={(e) => handleInputChange(3, e.target.value)}
                placeholder="단축키 입력"
                style={{
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>화명 관리</p>
            <S.FunctionContainer>
              <p>화면 크기 키우기</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>화면 크기 줄이기</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>커서 크기 키우기</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>커서 크기 줄이기</p>
              <div>단축키를 선택하세요</div>
            </S.FunctionContainer>
          </S.SubContainer>
        </S.SettingContent>
        <S.ButtonContainer>
          <S.SaveButton onClick={handleSave}>저장하기</S.SaveButton>
          <S.Button>수정 취소</S.Button>
        </S.ButtonContainer>
      </S.ContentContainer>
    </S.Container>
  );
}

export default Setting;
