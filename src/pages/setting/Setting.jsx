import React, { useEffect, useRef, useState } from 'react';
import * as S from './Setting.styles';
import sorigilLogo from '../../assets/images/Sorigil-logo.svg';

function Setting() {
  const [shortcuts, setShortcuts] = useState(null); // null로 초기화
  const [originalShortcuts, setOriginalShortcuts] = useState(null); // 초기 상태 저장

  // 저장된 단축키 불러오기
  useEffect(() => {
    chrome.storage.local.get('shortcuts', (result) => {
      if (result.shortcuts) {
        setShortcuts(result.shortcuts);
        setOriginalShortcuts(result.shortcuts);
      } else {
        // 초기 단축키 설정
        const initialShortcuts = [
          { id: 'custom-shortcut-0', description: '커서 크기', shortcut: '' },
          { id: 'custom-shortcut-1', description: 'Start voice recognition', shortcut: '' },
          { id: 'custom-shortcut-2', description: 'Volume up', shortcut: '' },
          { id: 'custom-shortcut-3', description: 'Volume down', shortcut: '' },
        ];
        setShortcuts(initialShortcuts);
        setOriginalShortcuts(initialShortcuts);
        chrome.storage.local.set({ shortcuts: initialShortcuts });
      }
    });
  }, []);

  // 단축키 변경 핸들러
  const handleShortcutChange = (id, value) => {
    setShortcuts((prevShortcuts) =>
      prevShortcuts.map((shortcut) =>
        shortcut.id === id ? { ...shortcut, shortcut: value } : shortcut
      )
    );
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!shortcuts) return;

    chrome.storage.local.set({ shortcuts }, () => {
      alert('단축키가 저장되었습니다.');
      chrome.runtime.sendMessage({ action: 'update-shortcuts', shortcuts }, (response) => {
        if (response?.status === 'success') {
          console.log('단축키 업데이트 완료');
        } else {
          console.error('단축키 업데이트 실패:', response?.error);
        }
      });
    });
    shortcuts.forEach((shortcut) => {
      saveShortcut(shortcut.id, shortcut.shortcut);
    });
  };

  const saveShortcut = (id, newShortcut) => {
    chrome.storage.local.get('shortcuts', (result) => {
      const shortcuts = result.shortcuts || [];
      const updatedShortcuts = shortcuts.map((s) =>
        s.id === id ? { ...s, shortcut: newShortcut } : s
      );

      chrome.storage.local.set({ shortcuts: updatedShortcuts }, () => {
        console.log('단축키 저장 완료:', updatedShortcuts);
      });
    });
  };

  // 상태가 null이면 로딩 메시지 표시
  if (!shortcuts) {
    return <p>로딩 중...</p>;
  }
  // 수정 취소 버튼 핸들러
  const handleCancel = () => {
    setShortcuts(originalShortcuts); // 초기 상태로 되돌리기
    confirm('수정을 취소하였습니다.');
  };

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
            위치한 설정 박스를 누르고, 사용하고자 하는 단축키를 정확히 입력하여 설정합니다! 마지막에
            저장을 누르셔야 반영됩니다.
          </p>
        </S.TitleContainer>
        <S.Line />
        <S.SettingContent>
          <S.SubContainer>
            <p>웹 뷰 커스터마이징</p>
            <S.FunctionContainer>
              <p>화면 크기</p>
              <input type="text" value="Ctrl+Shife+=" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>탐색 관리</p>
            <S.FunctionContainer>
              <p>다음 항복 이동</p>
              <input type="text" value="Tab" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>이전 항목 이동</p>
              <input type="text" value="Shife+Tab" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>페이지 처음으로 이동</p>
              <input type="text" value="Ctrl+Up" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>페이지 끝으로 이동</p>
              <input type="text" value="Ctrl+Down" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>음성 명령 사용</p>
              <input
                type="text"
                value={shortcuts[1].shortcut}
                placeholder="단축키를 입력하세요"
                onChange={(e) => handleShortcutChange(shortcuts[1].id, e.target.value)}
              />
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>음성 관리</p>
            <S.FunctionContainer>
              <p>소리 키우기</p>
              <input
                type="text"
                value={shortcuts[2].shortcut}
                placeholder="단축키를 입력하세요"
                onChange={(e) => handleShortcutChange(shortcuts[2].id, e.target.value)}
              />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>소리 줄이기</p>
              <input
                type="text"
                value={shortcuts[3].shortcut}
                placeholder="단축키를 입력하세요"
                onChange={(e) => handleShortcutChange(shortcuts[3].id, e.target.value)}
              />
            </S.FunctionContainer>
          </S.SubContainer>
          <S.SubContainer>
            <p>화명 관리</p>
            <S.FunctionContainer>
              <p>화면 크기 키우기</p>
              <input type="text" value="Ctrl+Shife+=" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>화면 크기 줄이기</p>
              <input type="text" value="Ctrl+Shife+-" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>커서 크기 키우기</p>
              <input type="text" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
            <S.FunctionContainer>
              <p>커서 크기 줄이기</p>
              <input type="text" placeholder="단축키를 입력하세요" />
            </S.FunctionContainer>
          </S.SubContainer>
        </S.SettingContent>
        <S.ButtonContainer>
          <S.SaveButton onClick={handleSave}>저장하기</S.SaveButton>
          <S.Button onClick={handleCancel}>수정 취소</S.Button>
        </S.ButtonContainer>
      </S.ContentContainer>
    </S.Container>
  );
}

export default Setting;
