import { client } from "@/lib/microcms";
import { Item } from "@/types/coffee";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "器具紹介",
  description: "コーヒーを楽しむための器具を紹介します",
};

export default async function GearsPage() {
  const { contents: items } = await client.getList<Item>({
    endpoint: "items",
    queries: { orders: "-createdAt", limit: 100 },
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors">
            ← ホームへ
          </Link>
          <span className="text-xs tracking-widest text-[#b0a090] uppercase">Coffee Gears</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-[#3a2a20]">Gears</h1>
          <p className="mt-3 text-sm text-[#9a8878]">コーヒーをもっと楽しくする器具たち</p>
          <div className="mt-6 mx-auto h-px w-12 bg-[#c8b8a8]" />
        </div>

        {items.length === 0 && (
          <p className="text-center text-[#9a8878]">まだ器具が登録されていません。</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/gears/${item.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#ede5db] transition-shadow hover:shadow-md"
            >
              {/* 商品画像（1枚目） */}
              <div className="relative aspect-square overflow-hidden bg-[#f0ebe4]">
                {item.images.length > 0 ? (
                  <Image
                    src={item.images[0].url}
                    alt={item.images[0].alt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#c8b8a8] text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* カテゴリバッジ */}
                {item.category.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.category.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="mt-2 text-base font-semibold leading-snug text-[#3a2a20] group-hover:text-[#5c3d2e] transition-colors line-clamp-2">
                  {item.title}
                </h2>

                <span className="mt-auto pt-4 text-xs text-[#a09080] group-hover:text-[#7a5a4a] transition-colors">
                  詳細を見る →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
