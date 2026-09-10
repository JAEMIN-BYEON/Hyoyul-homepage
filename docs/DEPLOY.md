# 효율경영자문 홈페이지 배포 매뉴얼

기준일 2026.09.10 / 저장소 JAEMIN-BYEON/Hyoyul-homepage / 도메인 hyoyul.co.kr (가비아 등록)

## 0. 구조 요약

- 호스팅: GitHub Pages (무료). main 브랜치에 푸시하면 1~2분 내 자동 반영
- 도메인: 가비아 DNS를 GitHub로 향하게 변경 (아래 표)
- 상담 폼: Formspree 연동 준비 완료, 폼 ID만 교체하면 hyoyul0428@naver.com으로 접수 메일 수신
- 폰트·이미지: 저장소에 셀프호스팅 완료, 외부 의존 없음

## 1. 최초 배포 (1회)

### 1-1. GitHub Pages 켜기 — 약 3분

1. github.com/JAEMIN-BYEON/Hyoyul-homepage 접속 → Settings → 왼쪽 메뉴 Pages
2. Build and deployment > Source: **Deploy from a branch**
3. Branch: **main** / 폴더 **/ (root)** 선택 → Save
4. 1~2분 뒤 `https://jaemin-byeon.github.io/Hyoyul-homepage/` 에서 사이트 확인
5. Custom domain 칸에 `www.hyoyul.co.kr` 입력 → Save (저장소의 CNAME 파일과 일치해야 함. 이미 넣어둠)

### 1-2. 가비아 DNS 변경 — 약 5분 + 전파 대기

My가비아 → 도메인 → hyoyul.co.kr → 관리 → DNS 정보 → DNS 관리에서:

| 작업 | 타입 | 호스트 | 값/위치 |
|---|---|---|---|
| 삭제 | 기존 클릭엔 관련 A/CNAME 레코드 전부 | | |
| 추가 | A | @ | 185.199.108.153 |
| 추가 | A | @ | 185.199.109.153 |
| 추가 | A | @ | 185.199.110.153 |
| 추가 | A | @ | 185.199.111.153 |
| 추가 | CNAME | www | jaemin-byeon.github.io. |

- 전파는 보통 수 분~수 시간. `hyoyul.co.kr`과 `www.hyoyul.co.kr` 둘 다 새 사이트가 뜨는지 확인
- 확인 후 GitHub Settings → Pages에서 **Enforce HTTPS** 체크 (인증서 자동 발급, 최대 24시간)

### 1-3. 클릭엔 해지 — DNS 전파 확인 후에만

새 사이트 접속이 확인되기 전에 해지하면 그 사이 홈페이지 공백이 생김. 반드시 순서 지킬 것.

### 1-4. 상담 폼 이메일 연동 (Formspree) — 약 5분

1. formspree.io 가입 (수신 메일 hyoyul0428@naver.com)
2. New form 생성 → `https://formspree.io/f/xxxxxxxx` 형태의 ID 발급
3. 발급 ID를 Claude에게 전달 → pages/consult.html의 `FORMSPREE_ID` 교체 후 푸시
4. 첫 발송 시 Formspree 확인 메일에서 승인 → 이후 접수 건마다 메일 수신 (무료 월 50건)

연동 전에는 폼 제출 시 전화·이메일 안내 문구가 표시됨 (공백 없음).

## 2. 배포 후 수정 흐름 (점진 개선)

1. Claude Code 세션에서 수정 요청 (지금처럼)
2. 수정 내용을 **main 브랜치에 병합·푸시하는 것까지** 요청 — main에 반영되어야 실사이트에 뜸
3. 푸시 후 1~2분 내 자동 반영. 별도 업로드·빌드 작업 없음
4. 시안 미리보기(아티팩트)는 참고용이며 실사이트와 무관

## 3. 남은 콘텐츠 작업 (사이트는 운영하면서 채움)

- [ ] Formspree ID 교체 (1-4)
- [ ] 전문인력 상반신 사진 7명 (칸은 준비됨, 파일만 주면 반영)
- [ ] 이태휘·김민지 학력, 김민지 자격
- [ ] (주)에스엠피 로고 원본 (회사에 요청)
- [ ] 이용약관·개인정보처리방침 페이지 (푸터 링크 #none 상태)
- [ ] 인사이트 칼럼 8편·FAQ 검수
- [ ] 네이버 서치어드바이저·구글 서치콘솔 등록 (검색 노출, 선택)

## 4. 문제가 생기면

- 사이트가 안 뜸: GitHub 저장소 → Actions 탭에서 pages-build-deployment 실패 여부 확인
- 도메인 접속 안 됨: 가비아 DNS 레코드 값과 위 표 대조, 전파 대기 (최대 48시간)
- 폼 메일 안 옴: Formspree 대시보드에서 접수 여부 확인, 스팸함 확인
- 무엇이든 Claude Code 세션에 증상을 말하면 원인 확인 가능
