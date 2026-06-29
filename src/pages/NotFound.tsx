import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute mb-4">
        / 404
      </p>
      <h1 className="display-hd text-7xl md:text-9xl">PAGE NOT FOUND</h1>
      <p className="mt-6 max-w-md text-brand-silver">
        찾으시는 페이지가 둥지를 떠났습니다.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:border-brand-green-bright hover:text-brand-green-bright"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
}
