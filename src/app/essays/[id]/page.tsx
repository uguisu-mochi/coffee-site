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

export async function generateStaticParams() {
  const { contents } = await client.getList<Essay>({
    endpoint: "essays",
    queries: { fields: ["id"], limit: 100 },
  });
  return contents.map((essay) => ({ id: essay.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const essay = await client.getListDetail<Essay>({
    endpoint: "essays",
    contentId: id,
  });
  return {
    title: essay.title,
    description: `${essay.title} | Coffee Essay`,
    openGraph: {
      images: essay.thumbnail ? [{ url: essay.thumbnail.url }] : [],
    },
  };
}

export default async function EssayDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const essay = await client.getListDetail<Essay>({
    endpoint: "essays",
    contentId: id,
  });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <Link
            href="/essays"
            className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors"
          >
            ← エッセイ一覧へ戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <time className="text-xs tracking-widest text-[#b0a090] uppercase">
            {formatDate(essay.publishedAt ?? essay.createdAt)}
          </time>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-wide text-[#3a2a20] sm:text-4xl">
            {essay.title}
          </h1>
          <div className="mt-6 mx-auto h-px w-12 bg-[#c8b8a8]" />
        </div>

        {/* サムネイル */}
        {essay.thumbnail && (
          <div className="relative mb-14 aspect-[16/9] overflow-hidden rounded-2xl bg-[#f0ebe4] shadow-sm">
            <Image
              src={essay.thumbnail.url}
              alt={essay.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* 本文 */}
        <article
          className="prose-essay"
          dangerouslySetInnerHTML={{ __html: essay.article }}
        />

        <div className="mt-16 border-t border-[#e8e0d8] pt-10 text-center">
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 rounded-full border border-[#c8b8a8] px-6 py-3 text-sm text-[#7a5a4a] transition-colors hover:bg-[#f0ebe4]"
          >
            ← エッセイ一覧へ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
