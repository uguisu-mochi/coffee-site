import { client } from "@/lib/microcms";
import { Essay } from "@/types/coffee";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

export const metadata = {
  title: "エッセイ",
  description: "コーヒーにまつわるエッセイ一覧",
};

export default async function EssaysPage() {
  const { contents: essays } = await client.getList<Essay>({
    endpoint: "essays",
    queries: { orders: "-publishedAt", limit: 100 },
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors">
            ← ホームへ
          </Link>
          <span className="text-xs tracking-widest text-[#b0a090] uppercase">Coffee Essay</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-[#3a2a20]">Essays</h1>
          <p className="mt-3 text-sm text-[#9a8878]">コーヒーにまつわる、ちいさな記録</p>
          <div className="mt-6 mx-auto h-px w-12 bg-[#c8b8a8]" />
        </div>

        {essays.length === 0 && (
          <p className="text-center text-[#9a8878]">まだエッセイが投稿されていません。</p>
        )}

        <div className="grid gap-10 sm:grid-cols-2">
          {essays.map((essay) => (
            <Link
              key={essay.id}
              href={`/essays/${essay.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#ede5db] transition-shadow hover:shadow-md"
            >
              {/* サムネイル */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#f0ebe4]">
                {essay.thumbnail ? (
                  <Image
                    src={essay.thumbnail.url}
                    alt={essay.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#c8b8a8] text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs tracking-wide text-[#b0a090]">
                  {formatDate(essay.publishedAt ?? essay.createdAt)}
                </time>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-[#3a2a20] group-hover:text-[#5c3d2e] transition-colors line-clamp-2">
                  {essay.title}
                </h2>
                <span className="mt-auto pt-4 text-xs text-[#a09080] group-hover:text-[#7a5a4a] transition-colors">
                  続きを読む →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
