import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/essays", label: "エッセイ" },
  { href: "/gears", label: "器具紹介" },
  { href: "/beans", label: "豆メモ" },
  { href: "/disclaimer", label: "免責事項" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e0d8] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-7 text-center">
          <p className="text-sm font-semibold tracking-widest text-[#3a2a20] uppercase">
            コーヒー研究室
          </p>
          <p className="mt-1 text-xs text-[#b0a090]">A Coffee Journal</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#7a6a5a] hover:text-[#5c3d2e] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto mb-6 h-px w-12 bg-[#c8b8a8]" />

        <p className="text-center text-xs text-[#b0a090]">
          © 2026 コーヒー研究室. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
