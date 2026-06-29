export interface ProcessStep {
  index: string;
  title: string;
  korean: string;
  body: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "DISCOVERY",
    korean: "상담 & 분석",
    body: "프로젝트의 목적, 타깃, 비즈니스 모델을 함께 정의합니다. 시장과 경쟁 브랜드를 분석해 사이트의 방향을 잡습니다.",
    duration: "1–2주",
    activities: [
      "클라이언트 킥오프 미팅",
      "타깃 사용자 인터뷰",
      "경쟁 브랜드 벤치마킹",
      "비즈니스 목표·KPI 정의",
    ],
    deliverables: ["프로젝트 브리프", "사용자 페르소나"],
    output: "방향이 정해진 문서 한 묶음",
  },
  {
    index: "02",
    title: "DEFINITION",
    korean: "기획 & 설계",
    body: "사이트맵, 핵심 화면 와이어프레임, 콘텐츠 가이드를 정리합니다. 이 단계에서 모든 의사결정의 기준이 만들어집니다.",
    duration: "2–3주",
    activities: [
      "정보 구조(IA) 설계",
      "사이트맵 작성",
      "와이어프레임 제작",
      "콘텐츠 가이드라인 수립",
    ],
    deliverables: ["사이트맵", "와이어프레임", "콘텐츠 가이드"],
    output: "디자인이 시작될 수 있는 청사진",
  },
  {
    index: "03",
    title: "DESIGN",
    korean: "디자인",
    body: "비주얼 아이덴티티와 UI를 디자인합니다. 데스크톱·모바일·태블릿을 동시에 검토하며 디자인 시스템을 함께 구축합니다.",
    duration: "3–4주",
    activities: [
      "무드보드 & 컨셉 시안",
      "디자인 시스템 구축",
      "풀스크린 시안 (PC/태블릿/모바일)",
      "인터랙션 프로토타입",
    ],
    deliverables: ["디자인 시안", "디자인 시스템", "프로토타입"],
    output: "개발에 그대로 넘길 수 있는 완성형 디자인",
  },
  {
    index: "04",
    title: "DEVELOPMENT",
    korean: "퍼블리싱 & 개발",
    body: "정적 퍼블리싱부터 인터랙션, CMS 연동까지 깔끔하게 구현합니다. 매주 진행 데모를 통해 투명하게 공유합니다.",
    duration: "4–6주",
    activities: [
      "컴포넌트 단위 개발",
      "인터랙션 & 모션 구현",
      "CMS / API 연동",
      "주간 데모 & 피드백",
    ],
    deliverables: ["스테이징 사이트", "운영 매뉴얼"],
    output: "런칭 전 실제로 동작하는 사이트",
  },
  {
    index: "05",
    title: "LAUNCH",
    korean: "런칭 & 운영",
    body: "QA와 성능 점검, 검색엔진 등록을 마치고 런칭합니다. 이후 데이터를 기반으로 페이지를 개선하며 함께 성장시킵니다.",
    duration: "1주 + 이후",
    activities: [
      "QA & 성능 최적화",
      "검색엔진 등록 (SEO)",
      "도메인 / 서버 셋업",
      "런칭 후 데이터 모니터링",
    ],
    deliverables: ["런칭된 사이트", "월간 운영 리포트"],
    output: "끝이 아니라 출발선",
  },
];
