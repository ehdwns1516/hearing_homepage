# 🦻🏻hearing_homepage.README

# 🔍 기획배경

- 현재 부모님이 운영하시는 보청기 사무실의 홈페이지 유지비용이 연간 약 45만원이 듭니다. 하
  지만 직접 홈페이지를 제작하여 운영하게 된다면 서버비용과 도메인 비용만 부담하면 되므로
  비교적 적은 비용으로 운영할 수 있습니다.
  - 예상 요금: 연간 약 $46(+a)
    - AWS t4g.micro 3년 예약 인스턴스: $103
    - .com으로 끝나는 도메인: 연간 $12
    - 데이텉 송수신에 따른 네트워크 추가 비용: +a
- 기존의 홈페이지에 이미지를 올리거나 수정을 할 때 업체에게 추가 요금을 지불해야 하는 것과
  의사소통의 번거러움이 있었습니다.
- 홈페이지의 URL이 한국어였으면 좋겠다는 부모님의 희망사항이 있었습니다.
- 프론트엔드 개발자를 목표로 좋은 경험과 공부가 될 수 있을 것 같았습니다.

# 📝 결과

- [수원덴마크오티콘.com](http://수원덴마크오티콘.com) 으로 도메인을 정하여 배포하였습니다.
- 관리자 아이디로 이미지 추가 및 삭제를 통하여 직접 홈페이지를 수정할 수 있도록 만들었습니
  다.
- 홈페이지 도메인은 ‘한국어→퓨니코드’로 변환하여 등록할 예정이며 홈페이지 route path는
  encodeURIComponent를 통하여 적용하였습니다.
- KakaoMap API 적용과 Carousel, ImageList를 구현하면서 많은 공부가 되었습니다.

# 🚧 업데이트 예정

- 보청기 정보를 카드형 리스트로 나열할 수 있는 컴포넌트 구현
- 보청기 타입과 제조사별로 필터링하여 확인할 수 있는 기능
- 반응형 웹

## 👨‍🦳 사용자 View

- 메인 페이지

  ![전체 화면.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4f01e0d7-7ae4-4e1d-aaf1-cda6c4eaa38b/전체_화면.png)

  - TopNavBar 메뉴에 마우스 오버한 모습
    ![스크린샷 2022-05-03 오후 1.17.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0ad3580a-6c79-493d-a956-59b52216ae35/스크린샷_2022-05-03_오후_1.17.44.png)
  - 빠른 길찾기 버튼과 지도
    ![스크린샷 2022-05-03 오후 1.19.12.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24f4b716-a984-4503-a19d-756e948b8a93/스크린샷_2022-05-03_오후_1.19.12.png)
    - 빠른 길찾기 버튼을 눌렀을 때 kakaomap 빠른 길찾기 페이지가 오픈됩니다.
      ![스크린샷 2022-05-03 오후 1.18.27.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/326415eb-b17c-422b-a6f2-29151756fd98/스크린샷_2022-05-03_오후_1.18.27.png)
    - 지도에 있는 사무실 위치의 marker를 눌렀을 때 kakaomap의 사무실 정보 페이지가 오픈됩
      니다.
      ![스크린샷 2022-05-03 오후 1.18.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1911c24-c802-4948-af6f-0ae41f2325c7/스크린샷_2022-05-03_오후_1.18.49.png)

- 상세 페이지(수직으로 나열된 이미지 타입)

  ![스크린샷 2022-04-29 오후 3.59.11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0b559a4-4847-4b52-9455-f69629b2a9a7/스크린샷_2022-04-29_오후_3.59.11.png)

- 상세 페이지(ImageList를 포함한 타입)

  ![스크린샷 2022-04-29 오후 3.59.32.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b530803-7cbb-45da-a9e7-96a3ec20fa37/스크린샷_2022-04-29_오후_3.59.32.png)

  - 이미지 클릭시 확대 모달창
    ![스크린샷 2022-05-03 오후 1.27.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/125fa466-0764-40f6-8bc0-ab05742c8cd1/스크린샷_2022-05-03_오후_1.27.13.png)

- 준비중인 페이지(페이지에 업로드한 이미지가 0개일 때)
  ![스크린샷 2022-04-29 오후 4.01.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aea5aa36-83b3-400b-8a18-b0eee8f626dd/스크린샷_2022-04-29_오후_4.01.10.png)

## 🧑‍💻 관리자 View

- 관리자 로그인 페이지: 로그인 정보는 쿠키에 저장됩니다.
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/14a40c4f-9dd7-4682-93cc-8d9fb982cf56/Untitled.png)
- 메인 페이지: Carousel의 설정 버튼 이외에 사용자 view와 동일합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7bc918b2-f7d1-4170-8d39-8d64e8cb82b8/Untitled.png)

- 메인 페이지 Carousel 설정 모달창

  - Carousel 이미지에 url 적용: Carousel 아래에 있는 input에 url을 입력하고 ‘적용하기’ 버
    튼을 누르면 Carousel의 현재 이미지에 오픈할 url를 저장할 수 있습니다. 이후에는 메인페
    이지에서 적용한 Carousel의 이미지를 클릭했을 시 저장된 url 페이지가 오픈됩니다다.
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6234bdf-af7d-4fd7-a72b-d71d0f7a668f/Untitled.png)
  - Carousel 이미지 삭제: 삭제할 이미지에 마우스 오버하면 삭제버튼을 확인할 수 있습니다.
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc686a77-4535-4ac6-af3c-155a9943a247/Untitled.png)
  - Carousel 이미지 추가: Carousel의 왼쪽 추가 버튼을 누르면 현재 페이지 바로 전 위치에 이
    미지를 추가할 수 있고 오른쪽 추가 버튼을 누르면 바로 다음 위치에 이미지를 추가할 수 있
    습니다.
    ![스크린샷 2022-05-03 오후 1.01.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/057b82bc-660a-454f-800f-747fa995c39c/스크린샷_2022-05-03_오후_1.01.46.png)

- 상세 페이지(수직으로 나열된 이미지 타입)

  ![스크린샷 2022-05-03 오후 1.40.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/51790fca-4252-4766-b9d8-a087e6ce37d1/스크린샷_2022-05-03_오후_1.40.31.png)

  - 수정 버튼 클릭: 수정 버튼을 누르면 이미지 추가 버튼을 확인할 수 있고 이미지 삭제 버튼
    과 이미지 추가 버튼을 확인할 수 있습니다. 이미지 추가 버튼은 각 이미지의 상단과 하단에
    위치하며 해당 위치의 버튼을 눌러 이미지를 추가하면 그 위치에 이미지를 추가할 수 있습니
    다.
    ![스크린샷 2022-05-03 오후 1.40.37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e6331b6f-78be-45c8-982a-4ac2f99d61d2/스크린샷_2022-05-03_오후_1.40.37.png)
  - 이미지1 아래의 이미지 추가 버튼을 통해 이미지를 추가한 모습
    ![스크린샷 2022-05-03 오후 1.40.59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1bd7ada3-5b45-4b21-90d3-88dfccd1d12c/스크린샷_2022-05-03_오후_1.40.59.png)

- 상세 페이지(ImageList를 포함한 타입)
  ![스크린샷 2022-05-03 오후 1.13.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b0ec741-3cbc-4291-af3b-1f934e815b12/스크린샷_2022-05-03_오후_1.13.54.png)
  - 수정 버튼: 수정 버튼을 누르면 이미지 추가 버튼과 각 이미지마다 삭제 버튼을 확인할 수
    있습니다. 이미지 추가를 하면 ImageList의 첫번째 index에 추가됩니다.
