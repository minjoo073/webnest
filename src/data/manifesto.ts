export interface Credo {
  index: string;
  en: string;
  ko: string;
  body: string;
  statValue: string;
  statLabel: string;
  statCaption: string;
}

export const credos: Credo[] = [
  {
    index: "01",
    en: "DESIGN IS A DECISION",
    ko: "디자인보다 의도를 먼저 묻습니다.",
    body: "사이트를 만들기 전에 왜 만드는지부터 함께 정의합니다. 시각적 결정 하나하나가 그 답 위에서 만들어집니다.",
    statValue: "1",
    statLabel: "ONE BRIEF",
    statCaption: "프로젝트 시작은 단 하나의 명확한 브리프에서.",
  },
  {
    index: "02",
    en: "CODE IS DESIGN",
    ko: "코드 한 줄까지 디자인의 일부입니다.",
    body: "보이지 않는 코드의 구조가 결국 사용자 경험을 결정합니다. 그래서 디자이너와 개발자가 처음부터 끝까지 한 팀입니다.",
    statValue: "0",
    statLabel: "ZERO OUTSOURCING",
    statCaption: "외주 없이 본진이 시안부터 코드까지 직접.",
  },
  {
    index: "03",
    en: "LAUNCH IS A START",
    ko: "런칭은 끝이 아니라 시작입니다.",
    body: "사이트는 살아있는 자산입니다. 데이터를 보며 매달 페이지를 다듬고, 새 기능을 더하며 함께 키워나갑니다.",
    statValue: "100%",
    statLabel: "IN-HOUSE CRAFT",
    statCaption: "픽셀·카피·코드·운영까지 모두 사내에서.",
  },
];
