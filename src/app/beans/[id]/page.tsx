import { client } from "@/lib/microcms";
import { TasteNote, TasteScores } from "@/types/coffee";
import Image from "next/image";
import Link from "next/link";
import TasteChart from "@/components/TasteChart";

const TASTE_LABELS: { key: keyof TasteScores; label: string }[] = [
  { key: "acidity", label: "酸味" },
  { key: "sweetness", label: "甘み" },
  { key: "bitterness", label: "苦味" },
  { key: "body", label: "コク" },
  { key: "aroma", label: "香り" },
];

export async function generateStaticParams() {
  const { contents } = await client.getList<TasteNote>({
    endpoint: "tastenote",
    queries: { fields: ["id"], limit: 100 },
  });
  return contents.map((bean) => ({ id: bean.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bean = await client.getListDetail<TasteNote>({
    endpoint: "tastenote",
    contentId: id,
    queries: { depth: 2 },
  });
  return {
    title: bean.coffeeName,
    description: `${bean.coffeeName}${bean.shop ? ` — ${bean.shop.name}で購入` : ""}したコーヒー豆の記録`,
    openGraph: {
      images: bean.photo ? [{ url: bean.photo.url }] : [],
    },
  };
}

export default async function BeanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bean = await client.getListDetail<TasteNote>({
    endpoint: "tastenote",
    contentId: id,
    queries: { depth: 2 },
  });

  // TasteChart 用にフラットスコアをオブジェクト化
  const tasteScores: TasteScores = {
    acidity: bean.acidity,
    sweetness: bean.sweetness,
    bitterness: bean.bitterness,
    body: bean.body,
    aroma: bean.aroma,
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ヘッダー */}
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <Link
            href="/beans"
            className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors"
          >
            ← 豆メモ一覧へ戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 space-y-14">
        {/* ── ヒーローセクション ── */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* 写真 */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f0ebe4] shadow-sm">
            {bean.photo ? (
              <Image
                src={bean.photo.url}
                alt={bean.photo.alt ?? bean.coffeeName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#c8b8a8] text-sm">
                No Image
              </div>
            )}
          </div>

          {/* 基本情報 */}
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-2xl font-semibold leading-snug text-[#3a2a20] sm:text-3xl">
              {bean.coffeeName}
            </h1>

            {/* 購入店舗情報 */}
            {bean.shop && (
              <div className="rounded-xl bg-white p-4 ring-1 ring-[#ede5db] space-y-1.5">
                <p className="text-xs font-medium tracking-wide text-[#b0a090] uppercase">
                  購入店舗
                </p>
                <p className="text-base font-semibold text-[#3a2a20]">{bean.shop.name}</p>
                {bean.shop.address && (
                  <p className="text-sm text-[#7a6a5a]">{bean.shop.address}</p>
                )}
              </div>
            )}

            {/* 味スコア数値一覧 */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {TASTE_LABELS.map(({ key, label }) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#b0a090]">{label}</span>
                  <span className="text-xl font-bold text-[#6B4635]">
                    {bean[key]}
                  </span>
                  <span className="text-[10px] text-[#c8b8a8]">/ 5</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── レーダーチャート ── */}
        <section>
          <h2 className="mb-6 text-lg font-semibold text-[#3a2a20]">味のバランス</h2>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#ede5db]">
            <TasteChart scores={tasteScores} />
          </div>
        </section>

        {/* ── コメント ── */}
        {bean.comment && (
          <section>
            <h2 className="mb-6 text-lg font-semibold text-[#3a2a20]">テイストメモ</h2>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#ede5db]">
              <article
                className="prose-essay"
                dangerouslySetInnerHTML={{ __html: bean.comment }}
              />
            </div>
          </section>
        )}

        {/* フッターナビ */}
        <div className="border-t border-[#e8e0d8] pt-10 text-center">
          <Link
            href="/beans"
            className="inline-flex items-center gap-2 rounded-full border border-[#c8b8a8] px-6 py-3 text-sm text-[#7a5a4a] transition-colors hover:bg-[#f0ebe4]"
          >
            ← 豆メモ一覧へ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
