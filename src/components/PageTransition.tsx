/**
 * 시각 패널만 담당. cover/uncover 타이밍은 App.tsx가 결정.
 * - active=true: 아래에서 위로 차오름
 * - active=false: 아래로 빠짐
 * 한 방향(아래→위→아래)로 흐름.
 */
export default function PageTransition({ active }: { active: boolean }) {
  return (
    <div
      className={`page-transition ${active ? "active" : ""}`}
      aria-hidden
    />
  );
}
