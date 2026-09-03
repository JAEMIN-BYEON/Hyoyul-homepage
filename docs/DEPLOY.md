# 배포 가이드 (GitHub Pages + 가비아)

작성일 2026.09.03. 대상: hyoyul.co.kr / 저장소 JAEMIN-BYEON/Hyoyul-homepage

## 1. 배포 구조

- 호스팅: GitHub Pages (무료, 저장소가 공개라 추가 비용·계정 없음)
- 반영 방식: main 브랜치에 푸시하면 1~2분 내 자동 배포. 수정이 잦아도 별도 작업 없음
- 도메인: 가비아 등록 hyoyul.co.kr → DNS만 GitHub로 변경
- 폰트: Pretendard 서브셋 92개 파일을 assets/fonts/에 셀프호스팅 완료 (CDN 의존 제거)

## 2. 최초 1회 설정

### 2-1. GitHub Pages 켜기

1. 브랜치 병합 후 GitHub 저장소 → Settings → Pages
2. Source: Deploy from a branch / Branch: main / 폴더: / (root) → Save
3. Custom domain에 `www.hyoyul.co.kr` 입력 → Save (저장소의 CNAME 파일과 일치)
4. DNS 전파 후 Enforce HTTPS 체크

### 2-2. 가비아 DNS 설정

가비아 → My가비아 → 도메인 관리 → hyoyul.co.kr → DNS 정보 → DNS 관리에서 아래 레코드 등록.
기존 클릭엔 관련 레코드(A 또는 CNAME)는 삭제.

| 타입 | 호스트 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | jaemin-byeon.github.io. |

- 전파에 수 분~수 시간 소요. `hyoyul.co.kr`, `www.hyoyul.co.kr` 둘 다 접속 확인 후 다음 단계로
- 클릭엔 해지는 전환 확인 이후에 진행 (먼저 해지하면 전환 전까지 사이트 공백 발생)

### 2-3. 상담 폼 이메일 연동 (Formspree)

폼 발송은 Formspree 무료 플랜(월 50건) 기준으로 준비되어 있음. 연동 절차:

1. https://formspree.io 가입 (수신 메일: hyoyul0428@naver.com)
2. New form 생성 → `https://formspree.io/f/xxxxxxxx` 형태의 endpoint 발급
3. `pages/consult.html`에서 `FORMSPREE_ID`를 발급받은 ID(xxxxxxxx)로 교체 후 푸시
4. 첫 발송 시 Formspree가 보내는 확인 메일에서 승인

연동 전에는 폼 제출 시 전화·이메일 안내 문구가 표시됨. 접수되면 hyoyul0428@naver.com으로
상호·담당자명·연락처·문의분야·문의내용이 담긴 메일이 옴. 스팸 차단용 honeypot 필드 적용됨.

## 3. 배포 후 수정 흐름

1. Claude Code(또는 직접 편집)로 파일 수정
2. main에 푸시 → 1~2분 내 자동 반영
3. 프리뷰 시안을 계속 쓰려면 수정 후 `python3 tools/build-preview.py` 실행 (배포와는 무관, 아티팩트 미리보기 전용)

## 4. 배포 파일 구성

| 파일 | 용도 |
|---|---|
| CNAME | GitHub Pages 커스텀 도메인 (www.hyoyul.co.kr) |
| .nojekyll | Jekyll 빌드 생략 (정적 파일 그대로 서빙) |
| robots.txt | 검색엔진 허용, docs/ 제외, sitemap 위치 안내 |
| sitemap.xml | 전체 21개 페이지 목록 (페이지 추가·삭제 시 갱신 필요) |
| 404.html | 없는 주소 접속 시 안내 페이지 |

## 5. 공개 전 남은 확인 사항

- [ ] Formspree ID 교체 (2-3)
- [ ] "확정 후 기재" placeholder 정리 (학력, 김민지 자격 등)
- [ ] 함께한 기업 명단·로고, 인물 사진 교체
- [ ] 이용약관·개인정보처리방침 페이지 (푸터 링크가 현재 #none)
- [ ] 네이버 서치어드바이저·구글 서치콘솔 등록 (선택)
