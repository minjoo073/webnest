export interface ServiceGroup {
  key: string;
  title: string;
  tagline: string;
  body: string;
  items: { label: string; description: string }[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    key: "strategy",
    title: "STRATEGY",
    tagline: "브랜드 분석부터 시작합니다.",
    body: "사이트 제작 전에 시장과 사용자, 경쟁 브랜드를 먼저 분석합니다. 데이터와 인터뷰를 기반으로 사이트의 목적과 핵심 메시지를 정의합니다.",
    items: [
      { label: "브랜드 분석 & 포지셔닝", description: "타깃·경쟁사·자사 강점을 정의" },
      { label: "정보 구조 설계", description: "사용자 흐름 기반 IA" },
      { label: "콘텐츠 전략", description: "톤·매니페스토·카피 가이드" },
      { label: "SEO 로드맵", description: "검색 노출과 키워드 설계" },
    ],
  },
  {
    key: "design",
    title: "DESIGN",
    tagline: "Swiss Grid와 에디토리얼 무드로.",
    body: "디자인은 장식이 아니라 의사결정의 결과입니다. 브랜드와 콘텐츠가 중심이 되는 미니멀한 시각 언어로 완성도를 끌어올립니다.",
    items: [
      { label: "UI/UX 디자인", description: "사용자 중심 화면 설계" },
      { label: "비주얼 아이덴티티", description: "컬러·타이포·이미지 톤 정의" },
      { label: "디자인 시스템", description: "확장 가능한 컴포넌트 라이브러리" },
      { label: "모션 디자인", description: "스크롤·hover 기반 인터랙션" },
    ],
  },
  {
    key: "development",
    title: "DEVELOPMENT",
    tagline: "빠르고, 단단하고, 확장 가능하게.",
    body: "최신 프레임워크로 깔끔한 코드를 작성합니다. 페이지 로드 속도와 검색 노출, 운영 편의성까지 함께 설계합니다.",
    items: [
      { label: "프론트엔드 개발", description: "React · Next · TypeScript" },
      { label: "모바일 앱 개발", description: "React Native · Expo · iOS / Android" },
      { label: "WebGL & 인터랙션", description: "Three.js · GSAP · Lenis" },
      { label: "Headless CMS / API", description: "Sanity · Strapi · 백오피스 연동" },
      { label: "성능 최적화", description: "Core Web Vitals 기준 통과" },
    ],
  },
  {
    key: "growth",
    title: "GROWTH",
    tagline: "런칭은 시작입니다.",
    body: "사이트는 살아 움직이는 자산입니다. 운영하면서 발견되는 데이터를 바탕으로 페이지를 개선하고, 새로운 기능을 더해갑니다.",
    items: [
      { label: "전환율 최적화 (CRO)", description: "AB 테스트와 퍼널 개선" },
      { label: "애널리틱스", description: "GA4 · Hotjar · 자체 대시보드" },
      { label: "유지보수", description: "월간 운영 + 보안 패치" },
      { label: "신규 기능 개발", description: "런칭 후 점진적 기능 추가" },
    ],
  },
];

export interface ServiceLine {
  label: string;
  description: string;
}

export const productLineup: ServiceLine[] = [
  { label: "기업 홈페이지", description: "회사 소개·IR·채용까지 통합" },
  { label: "브랜드 사이트", description: "브랜드 무드와 스토리텔링 중심" },
  { label: "쇼핑몰 구축", description: "Shopify · 카페24 · 자체 솔루션" },
  { label: "랜딩페이지", description: "캠페인·신제품 출시용 단일 페이지" },
  { label: "모바일 앱", description: "iOS · Android · React Native · Expo" },
  { label: "웹 + 앱 통합", description: "데이터 연동된 웹사이트와 앱 동시 제작" },
  { label: "리뉴얼", description: "기존 사이트의 IA·디자인 재정비" },
  { label: "유지보수", description: "월간 콘텐츠·운영·보안" },
];
