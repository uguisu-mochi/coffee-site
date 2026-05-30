import Link from "next/link";

const NAV_ITEMS = [
  {
    href: "/beans",
    en: "Bean Notes",
    ja: "コーヒー豆メモ",
    desc: "飲んだ豆の記録と味のレーダーチャート",
  },
  {
    href: "/essays",
    en: "Essays",
    ja: "エッセイ",
    desc: "コーヒーにまつわる、ちいさな記録",
  },
  {
    href: "/gears",
    en: "Gears",
    ja: "器具紹介",
    desc: "愛用しているコーヒー器具を紹介",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5]">
      <main className="flex w-full max-w-xl flex-col items-center gap-12 px-6 py-24 text-center">
        {/* サイトタイトル */}
        <div className="space-y-3">
          <p className="text-xs tracking-widest text-[#b0a090] uppercase">A Coffee Journal</p>
          <h1 className="text-4xl font-semibold tracking-wide text-[#3a2a20]">
            Coffee &amp; Notes
          </h1>
          <p className="text-base leading-relaxed text-[#7a6a5a]">
            コーヒーの記録、エッセイ、器具のこと。
          </p>
        </div>

        <div className="h-px w-12 bg-[#c8b8a8]" />

        {/* ナビゲーション */}
        <nav className="flex w-full flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-[#ede5db] transition-shadow hover:shadow-md"
            >
              <div className="text-left">
                <p className="text-base font-semibold text-[#3a2a20] group-hover:text-[#5c3d2e] transition-colors">
                  {item.en}
                  <span className="ml-2 text-xs font-normal text-[#b0a090]">{item.ja}</span>
                </p>
                <p className="mt-0.5 text-xs text-[#a09080]">{item.desc}</p>
              </div>
              <span className="ml-4 shrink-0 text-[#c8b8a8] transition-colors group-hover:text-[#8a7060]">
                →
              </span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
