import { client } from "@/lib/microcms";
import { Item } from "@/types/coffee";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

export async function generateStaticParams() {
  const { contents } = await client.getList<Item>({
    endpoint: "items",
    queries: { fields: ["id"], limit: 100 },
  });
  return contents.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await client.getListDetail<Item>({
    endpoint: "items",
    contentId: id,
  });
  return {
    title: item.title,
    description: `${item.category.join(" / ")} | ${item.title}`,
    openGraph: {
      images: item.images.length > 0 ? [{ url: item.images[0].url }] : [],
    },
  };
}

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await client.getListDetail<Item>({
    endpoint: "items",
    contentId: id,
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <Link
            href="/gears"
            className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors"
          >
            ← 器具一覧へ戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* 左: 画像ギャラリー */}
          <div>
            {item.images.length > 0 ? (
              <ImageGallery photos={item.images} />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-[#f0ebe4] text-[#c8b8a8] text-sm">
                No Image
              </div>
            )}
          </div>

          {/* 右: 商品情報 */}
          <div className="flex flex-col gap-5">
            {/* カテゴリバッジ */}
            {item.category.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.category.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* 商品名 */}
            <h1 className="text-2xl font-semibold leading-snug text-[#3a2a20] sm:text-3xl">
              {item.title}
            </h1>

            <div className="h-px bg-[#e8e0d8]" />

            {/* アフィリエイトボタン */}
            <div className="flex flex-col gap-3">
              {item.amazonUrl && (
                <a
                  href={item.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  <span>Amazonで見る</span>
                  <span className="text-xs opacity-80">↗</span>
                </a>
              )}
              {item.rakutenUrl && (
                <a
                  href={item.rakutenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#BF0000] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  <span>楽天市場で見る</span>
                  <span className="text-xs opacity-80">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 商品紹介文 */}
        {item.comment && (
          <div className="mt-14">
            <h2 className="mb-6 text-lg font-semibold text-[#3a2a20]">商品について</h2>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#ede5db]">
              <article
                className="prose-essay"
                dangerouslySetInnerHTML={{ __html: item.comment }}
              />
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-[#e8e0d8] pt-10 text-center">
          <Link
            href="/gears"
            className="inline-flex items-center gap-2 rounded-full border border-[#c8b8a8] px-6 py-3 text-sm text-[#7a5a4a] transition-colors hover:bg-[#f0ebe4]"
          >
            ← 器具一覧へ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
