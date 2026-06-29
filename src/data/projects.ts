export type ProjectCategory =
  | "Beauty"
  | "Fashion"
  | "Corporate"
  | "Medical"
  | "Education"
  | "E-commerce";

export type ProjectPlatform = "Web" | "App" | "Web+App";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  platform: ProjectPlatform;
  year: number;
  client: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  cover: string; // gradient class
  accent: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Beauty",
  "Fashion",
  "Corporate",
  "Medical",
  "Education",
  "E-commerce",
];

export const PLATFORMS: ProjectPlatform[] = ["Web", "App", "Web+App"];

export const projects: Project[] = [
  {
    slug: "lumea",
    name: "LUMEA",
    category: "Beauty",
    platform: "Web",
    year: 2025,
    client: "Lumea Skincare",
    summary: "에디토리얼 무드의 클린 뷰티 브랜드 사이트 — 제품 라인업 중심 IA 재설계와 자동 큐레이션.",
    problem: "신규 라인을 출시할 때마다 정보 구조가 무너지고, 모바일에서 제품 탐색이 4단계 이상으로 길어졌다.",
    approach: "성분·피부 타입·시간대 기반 3축 필터를 한 화면에 묶고, 시즌 룩북을 메인 hero로 격상.",
    outcome: "PDP 이탈률 41% 감소, 평균 장바구니 단가 28% 상승.",
    tags: ["Editorial", "Headless Shopify", "Motion"],
    cover: "from-stone-200 via-stone-300 to-stone-100",
    accent: "#c9a987",
  },
  {
    slug: "oblique",
    name: "OBLIQUE",
    category: "Fashion",
    platform: "Web",
    year: 2025,
    client: "Oblique Studio",
    summary: "런웨이 영상을 1차 콘텐츠로 둔 패션 룩북 사이트.",
    problem: "기존 사이트는 룩북이 정적 이미지만 노출되어 시즌 무드가 전달되지 않았다.",
    approach: "WebGL 비디오 마스킹과 스크롤 기반 룩 전환, 제품 정보는 hover 시 좌측 패널로 슬라이드.",
    outcome: "체류 시간 2.4분 → 6.1분, 시즌 컬렉션 조회 175% 증가.",
    tags: ["WebGL", "Lookbook", "Editorial"],
    cover: "from-zinc-800 via-zinc-700 to-zinc-900",
    accent: "#8a8478",
  },
  {
    slug: "nordan",
    name: "NORDAN",
    category: "Corporate",
    platform: "Web",
    year: 2024,
    client: "Nordan Industrial",
    summary: "B2B 제조 기업의 IR·기술 자료 통합 코퍼레이트 사이트.",
    problem: "IR·기술백서·채용이 분리된 3개 서브도메인에 흩어져 있어 일관된 브랜드 톤이 부재.",
    approach: "단일 디자인 시스템과 컴포넌트 라이브러리로 통합, 다국어(KR/EN/JP) CMS 구조.",
    outcome: "기술 문의 리드 60% 증가, 채용 지원 전환율 2.3배.",
    tags: ["Multilingual", "CMS", "Design System"],
    cover: "from-slate-700 via-slate-800 to-slate-900",
    accent: "#5b6f80",
  },
  {
    slug: "verdant-clinic",
    name: "VERDANT CLINIC",
    category: "Medical",
    platform: "Web+App",
    year: 2025,
    client: "Verdant Aesthetic",
    summary: "피부과·성형 클리닉의 웹사이트 + 환자 전용 모바일 앱 — 예약과 시술 후기를 통합.",
    problem: "기존 사이트는 의료광고법 충돌과 과장된 카피로 신뢰도가 낮았고, 예약은 전화로만 가능했다.",
    approach: "법 검토를 통과한 카피 가이드, 의료진 인터뷰 영상, 환자 전용 앱(예약·시술 후기·복약 알림) 동시 런칭.",
    outcome: "상담 예약 완료율 18% → 47%, 앱 MAU 8,200, 재방문률 32% 향상.",
    tags: ["Compliance", "iOS / Android", "Booking"],
    cover: "from-emerald-900 via-emerald-800 to-stone-900",
    accent: "#2fa15c",
  },
  {
    slug: "atelier-class",
    name: "ATELIER CLASS",
    category: "Education",
    platform: "Web",
    year: 2024,
    client: "Atelier Class Academy",
    summary: "디자인 부트캠프의 커리큘럼 쇼케이스와 모집 페이지.",
    problem: "기존 사이트는 강사 정보·커리큘럼·후기·신청이 5개 페이지로 흩어져 모집 전환이 낮았다.",
    approach: "원페이지 스크롤로 단일 내러티브 구성, 강사 카드 hover 시 영상 인터뷰 자동 재생.",
    outcome: "기수당 모집 대기자 1.4배, 모집 페이지 LCP 1.2s 달성.",
    tags: ["Single Page", "Video", "Conversion"],
    cover: "from-amber-200 via-amber-100 to-stone-200",
    accent: "#d4a857",
  },
  {
    slug: "knot-market",
    name: "KNOT MARKET",
    category: "E-commerce",
    platform: "Web",
    year: 2025,
    client: "Knot Market",
    summary: "리빙·가구 큐레이션 커머스 — 갤러리 + 쇼핑 경험을 결합.",
    problem: "이미지 중심 큐레이션이 강점이지만 상세 페이지가 표준 템플릿이라 브랜드 톤이 소실됐다.",
    approach: "에디토리얼 PDP, 스크롤 기반 인테리어 룩북, 장바구니는 드로워로 가볍게.",
    outcome: "객단가 2.1배, 인스타그램 유입 체류시간 4분 30초 돌파.",
    tags: ["Shopify Headless", "Editorial PDP", "Drawer Cart"],
    cover: "from-stone-300 via-stone-200 to-amber-100",
    accent: "#b0926a",
  },
  {
    slug: "harmless-tea",
    name: "HARMLESS",
    category: "Beauty",
    platform: "Web",
    year: 2024,
    client: "Harmless Tea",
    summary: "유기농 차 브랜드의 자사몰 + 브랜드 스토리.",
    problem: "타사몰에서는 표현 못한 정성·산지 이야기를 자사몰로 가져오고 싶었다.",
    approach: "산지 다큐 영상을 hero로, 제품은 우려내는 시간순으로 정렬, 정기구독 플로우 분리.",
    outcome: "정기구독 가입 320%, 매거진 페이지 SNS 공유 8배.",
    tags: ["Subscription", "Documentary", "Editorial"],
    cover: "from-green-900 via-green-800 to-stone-800",
    accent: "#2f6a4a",
  },
  {
    slug: "axis-edu",
    name: "AXIS LMS",
    category: "Education",
    platform: "Web+App",
    year: 2025,
    client: "Axis Learning",
    summary: "기업 교육용 LMS의 마케팅 사이트 + 학습자용 모바일 앱.",
    problem: "B2B SaaS인데 데모 요청까지 단계가 길고, 학습자는 PC에서만 강의를 들을 수 있었다.",
    approach: "실 사용 화면 기반 인터랙티브 데모, 모바일 학습 앱(오프라인 강의 다운로드·진도 동기화) 신규 개발.",
    outcome: "데모 요청 3.1배, 영업 사이클 6주 → 3주, 학습 완주율 41% → 73%.",
    tags: ["SaaS", "iOS / Android", "B2B"],
    cover: "from-indigo-900 via-slate-900 to-zinc-900",
    accent: "#6b7fb8",
  },
  // ===== App-only =====
  {
    slug: "tide-live",
    name: "TIDE LIVE",
    category: "E-commerce",
    platform: "App",
    year: 2025,
    client: "Tide Shopping",
    summary: "라이브 커머스 전용 모바일 앱 — 방송 시청과 결제를 한 화면에서.",
    problem: "기존 웹 라이브는 결제 화면 전환 시 80%가 이탈했고, 모바일 시청 안정성도 낮았다.",
    approach: "React Native + LL-HLS 기반 저지연 스트리밍, 결제 모달은 영상 위에 오버레이로 띄움, 알림 기반 재시청 유도.",
    outcome: "방송 중 결제 전환율 4.2배, 평균 시청 시간 12분, 출시 3개월 만에 다운로드 18만.",
    tags: ["React Native", "Live Streaming", "Push"],
    cover: "from-fuchsia-900 via-rose-900 to-zinc-900",
    accent: "#e8557a",
  },
  {
    slug: "bloom-care",
    name: "BLOOM CARE",
    category: "Medical",
    platform: "App",
    year: 2025,
    client: "Bloom Postpartum",
    summary: "산모와 신생아를 위한 케어 트래커 앱 — 수유·수면·검진 기록을 한곳에.",
    problem: "산후 케어 정보가 블로그·카페·앱에 분산되어 있었고, 보호자와 가족이 동시에 보는 도구가 없었다.",
    approach: "공동 트래커(가족 초대), 의료진 검수 콘텐츠, 알림 기반 검진 리마인더, 클리닉 연동 차트.",
    outcome: "월 활성 사용자 5만, 평균 사용 시간 17분/일, 산후 우울 자가진단 완료 78%.",
    tags: ["iOS / Android", "Multi-user", "Healthcare"],
    cover: "from-rose-200 via-pink-200 to-amber-100",
    accent: "#e8a4b8",
  },
  {
    slug: "routine",
    name: "ROUTINE",
    category: "Beauty",
    platform: "App",
    year: 2024,
    client: "Routine Beauty",
    summary: "스킨케어 루틴 빌더 앱 — 아침·저녁 루틴을 단계별로 기록하고 효과를 추적.",
    problem: "사용자는 본인이 쓰는 제품의 적합성을 알기 어려웠고, 효과 비교는 거의 불가능했다.",
    approach: "성분 DB 5,200개 연동, 사진 일기 + AI 피부 상태 분석, 주간 리포트 자동 생성.",
    outcome: "리텐션 D30 38%, 사용자당 평균 등록 제품 9.4개, 앱스토어 4.8 평점.",
    tags: ["iOS / Android", "AI", "Tracker"],
    cover: "from-stone-100 via-amber-100 to-rose-100",
    accent: "#d6a78a",
  },
];

// Featured — 웹/하이브리드 케이스 (가로 스크롤 갤러리용)
const FEATURED_WEB_SLUGS = [
  "lumea",          // Web · Beauty
  "oblique",        // Web · Fashion
  "nordan",         // Web · Corporate
  "verdant-clinic", // Web+App · Medical
  "knot-market",    // Web · E-commerce
  "axis-edu",       // Web+App · Education
  "harmless-tea",   // Web · Beauty
  "atelier-class",  // Web · Education
];
export const featuredWebProjects: Project[] = FEATURED_WEB_SLUGS.map(
  (slug) => projects.find((p) => p.slug === slug)!,
);

// App Lab — App-only 케이스 (폰 목업 섹션용)
export const featuredAppProjects: Project[] = projects.filter(
  (p) => p.platform === "App",
);

// 기존 호환을 위해 유지 (필요시 제거 가능)
export const featuredProjects = featuredWebProjects.slice(0, 6);
