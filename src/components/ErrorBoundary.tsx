import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** 값이 바뀌면 에러 상태를 리셋 (라우트 변경 시 복구용) */
  resetKey?: string;
}

interface State {
  hasError: boolean;
}

/**
 * 페이지 전환 중 서드파티(GSAP pin 등)의 DOM 조작과 React 언마운트가 충돌해
 * 발생하는 크래시가 앱 전체를 빈 화면으로 만드는 것을 방지.
 * resetKey(경로)가 바뀌면 에러 상태를 풀어 새 페이지를 정상 렌더한다.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // 진단용 — 화면은 fallback으로 유지
    console.error("[ErrorBoundary]", error);
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
