import React from 'react';
import * as S from './HelpContent.styles';

function HelpContent() {
  const helpContentData = [
    {
      header: 'SORIGIL 시작하기',
      contents: [
        'SORIGIL은 스크린 리더 확장 프로그램으로, 저시력자 혹은 시각 장애인들을 위한 웹 사용성을 향상시키기 위해 개발되었습니다. 시각적 정보에 접근하기 어려운 사용자들을 위해 웹 콘텐츠를 음성으로 읽어주고, 이미지를 설명하며, 다양한 맞춤형 설정을 제공합니다.',
        'SORIGIL을 처음 시작하려면 다음 단계를 따라주세요: 확장 프로그램 설치하기: 해당 확장 프로그램 SORIGIL을 설치합니다. 설치가 완료되면 브라우저 오른쪽 상단에서 확장 프로그램 아이콘을 클릭해 확장 프로그램을 불러올 수 있습니다. 개발자 모드로 전환 후 확장 프로그램을 로드하면 SORIGIL을 실행할 수 있습니다.',
        '권한 허용: SORIGIL은 탭 접근 및 음성 관련 기능을 사용하기 위해 권한을 요청합니다. 원활한 작동을 위해 모든 권한을 허용해주세요.',
        '환경 설정: SORIGIL의 음성 설정 페이지에서 음성 속도, 음조, 언어 등 기본 설정을 조정할 수 있습니다. 처음 사용하는 경우 기본 설정을 유지한 상태로 시작할 수 있으며 필요에 따라 적절히 수정합니다.',
      ],
    },
    {
      header: 'SORIGIL에서 제공하는 기능',
      contents: [
        '선택한 영역 읽어주기: 웹 페이지에서 특정 텍스트 영역을 선택하면, SORIGIL이 선택한 영역을 음성으로 읽어줍니다. 이 기능은 긴 문서를 읽거나 특정 정보를 빠르게 확인하고 싶을 때 유용합니다.',
        '이미지 대체 텍스트 생성: 이미지에 대체 텍스트(ALT)가 없더라도 SORIGIL은 AI 기반 분석을 통해 이미지를 설명합니다. 이 기능은 웹페이지의 시각적 콘텐츠를 이해하는 데 큰 도움을 줍니다.',
        '음성 명령으로 기능 호출: 음성 명령으로 SORIGIL의 주요 기능을 제어할 수 있습니다. 단축키 명령어를 누른 상태에서 해당 웹페이지에서 찾고자 하는 기능을 명령하면 해당 기능에 맞는 콘텐츠만 불러올 수 있습니다. 이 기능을 통해 필요한 기능을 더욱 빠르게 찾을 수 있게 됩니다.',
      ],
    },
    {
      header: 'SORIGIL 단축키 설정하기',
      contents: [
        '단축키로 빠른 기능 호출: 자주 사용하는 기능을 빠르게 실행하기 위해 단축키를 설정할 수 있습니다. 기본 단축키는 사용자가 필요에 따라 설정 페이지에서 변경할 수 있습니다.',
        '기본 제공 단축키는 다음과 같습니다: 음성 명령을 통한 기능 호출: Ctrl + Shift + X, 소리 키우기: Ctrl + Shift + =, 소리 줄이기: Ctrl + Shift + -',
        '단축키를 설정하는 방법: 단축키 설정 페이지를 엽니다. 변경하고자 하는 기능 옆에 있는 입력란을 클릭합니다. 새로운 단축키를 입력한 뒤 저장 버튼을 눌러 저장합니다. 저장된 단축키는 즉시 활성화되며, 설정한 단축키를 사용하여 해당 기능을 실행할 수 있습니다.',
      ],
    },
    {
      header: 'SORIGIL 음성 설정하기',
      contents: [
        'SORIGIL은 다양한 음성 설정을 지원하여 사용자의 편의에 맞게 조정할 수 있습니다.',
        '설정 가능한 항목: 언어: 한국어와 영어를 포함한 여러 언어 중 선택할 수 있습니다. 음성 속도: 음성 읽기의 빠르기를 조절할 수 있습니다. (1배속~3배속) 음조: 음성 톤을 조정하여 더 높거나 낮은 톤으로 변경 가능합니다. 음량: 음성 합성의 소리를 키우거나 줄일 수 있습니다.',
        '설정 방법: 음성 설정 페이지를 엽니다. 각 설정 항목에 대해 슬라이더나 드롭다운 메뉴를 사용하여 원하는 값을 선택합니다. 변경 내용을 저장하면 즉시 반영됩니다.',
      ],
    },
  ];

  // const handleSearchChange = (term) => {
  //   setSearchTerm(term);

  //   if (term.trim() === '') {
  //     setFilteredContent(helpContentData);
  //   } else {
  //     const filtered = helpContentData.filter((section) =>
  //       section.header.toLowerCase().includes(term.toLowerCase())
  //     );

  //     setFilteredContent(filtered.length > 0 ? filtered : helpContentData); // 검색 결과 없으면 전체 콘텐츠 표시
  //   }
  // };

  return (
    <S.Container>
      {helpContentData.map((section, index) => (
        <S.ContentContainer key={index}>
          <S.Header>{section.header}</S.Header>
          {section.contents.map((content, idx) => (
            <S.Content key={idx}>{content}</S.Content>
          ))}
        </S.ContentContainer>
      ))}
    </S.Container>
  );
}
export default HelpContent;
