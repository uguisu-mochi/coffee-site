import { client } from "@/lib/microcms";
import { TasteNote } from "@/types/coffee";
import Link from "next/link";
import BeanSearchList from "@/components/BeanSearchList";

export const metadata = {
  title: "コーヒー豆メモ",
  description: "飲んだコーヒー豆の記録と味の評価",
};

export default async function BeansPage() {
  const { contents: beans } = await client.getList<TasteNote>({
    endpoint: "tastenote",
    queries: { orders: "-createdAt", limit: 100, depth: 2 },
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ヘッダー */}
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors">
            ← ホームへ
          </Link>
          <span className="text-xs tracking-widest text-[#b0a090] uppercase">Bean Notes</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* ページタイトル */}
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-[#3a2a20]">Bean Notes</h1>
          <p className="mt-3 text-sm text-[#9a8878]">飲んだ豆の記録と、味の記憶</p>
          <div className="mt-6 mx-auto h-px w-12 bg-[#c8b8a8]" />
        </div>

        <BeanSearchList beans={beans} />
      </main>
    </div>
  );
}
