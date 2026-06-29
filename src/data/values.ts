export interface Value {
  index: string;
  title: string;
  body: string;
}

export const values: Value[] = [
  {
    index: "01",
    title: "BRAND FIRST",
    body: "디자인보다 브랜드가 먼저입니다. 무엇을 말할지 정한 뒤에 어떻게 보일지 결정합니다.",
  },
  {
    index: "02",
    title: "ONE FLOW",
    body: "기획·디자인·개발을 분리하지 않습니다. 한 팀이 처음부터 끝까지 책임집니다.",
  },
  {
    index: "03",
    title: "CRAFT",
    body: "1px 단위까지 정성을 다합니다. 픽셀, 코드, 카피 모두 동등하게 다듬습니다.",
  },
  {
    index: "04",
    title: "TRANSPARENT",
    body: "주간 데모와 실시간 작업 공유. 진행 상황을 숨기지 않고 함께 결정합니다.",
  },
];

export const stats = [
  { value: "120+", label: "프로젝트 런칭" },
  { value: "98%", label: "재계약률" },
  { value: "4.9", label: "클라이언트 평점" },
  { value: "0", label: "지연 프로젝트" },
];
