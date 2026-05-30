"use client";

import { TasteNote, TasteScores } from "@/types/coffee";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// ── 定数 ────────────────────────────────────────────────────
const TASTE_KEYS: { key: keyof TasteScores; label: string }[] = [
  { key: "acidity", label: "酸味" },
  { key: "sweetness", label: "甘み" },
  { key: "bitterness", label: "苦味" },
  { key: "body", label: "コク" },
  { key: "aroma", label: "香り" },
];

const MIN_SCORE_OPTIONS = [
  { value: 0, label: "指定なし" },
  { value: 3, label: "3以上" },
  { value: 4, label: "4以上" },
  { value: 5, label: "5のみ" },
];

// ── 味スコア ドット表示 ──────────────────────────────────────
function ScoreDots({ score }: { score: number }) {
  const clamped = Math.min(5, Math.max(0, score));
  return (
    <span className="tracking-tight text-[#8B6355]">
      {"●".repeat(clamped)}
      <span className="text-[#d4c4b4]">{"●".repeat(5 - clamped)}</span>
    </span>
  );
}

// ── メインコンポーネント ────────────────────────────────────
type SortDir = "none" | "asc" | "desc";
type MinScoreState = Record<keyof TasteScores, number>;

export default function BeanSearchList({ beans }: { beans: TasteNote[] }) {
  const [searchText, setSearchText] = useState("");
  const [minScores, setMinScores] = useState<MinScoreState>({
    acidity: 0,
    sweetness: 0,
    bitterness: 0,
    body: 0,
    aroma: 0,
  });
  const [shopSort, setShopSort] = useState<SortDir>("none");

  const filtered = useMemo(() => {
    let result = beans;

    // ── フリーテキスト検索（豆の名前 or コメント）
    const q = searchText.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (b) =>
          b.coffeeName.toLowerCase().includes(q) ||
          (b.comment ?? "").toLowerCase().includes(q)
      );
    }

    // ── 味スコアフィルター（全項目が指定以上）
    result = result.filter((b) =>
      TASTE_KEYS.every(({ key }) => (b[key] ?? 0) >= minScores[key])
    );

    // ── 店舗名ソート（shop が存在するものだけ対象）
    if (shopSort !== "none") {
      result = [...result].sort((a, b) => {
        const nameA = a.shop?.name ?? "";
        const nameB = b.shop?.name ?? "";
        const cmp = nameA.localeCompare(nameB, "ja");
        return shopSort === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [beans, searchText, minScores, shopSort]);

  function updateMinScore(key: keyof TasteScores, value: number) {
    setMinScores((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-8">
      {/* ── 検索・絞り込みパネル ── */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#ede5db] space-y-5">
        {/* テキスト検索 + ソート */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="豆の名前やコメントで検索…"
            className="flex-1 rounded-xl border border-[#ddd4c8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#3a2a20] placeholder-[#b0a090] outline-none focus:border-[#8B6355] focus:ring-2 focus:ring-[#8B6355]/20"
          />
          <select
            value={shopSort}
            onChange={(e) => setShopSort(e.target.value as SortDir)}
            className="rounded-xl border border-[#ddd4c8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#3a2a20] outline-none focus:border-[#8B6355]"
          >
            <option value="none">並び順: デフォルト</option>
            <option value="asc">店舗名 昇順 (A→Z)</option>
            <option value="desc">店舗名 降順 (Z→A)</option>
          </select>
        </div>

        {/* 味スコアフィルター */}
        <div>
          <p className="mb-3 text-xs font-medium tracking-wide text-[#9a8878] uppercase">
            味の特徴で絞り込む
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {TASTE_KEYS.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-[#7a6a5a]">{label}</label>
                <select
                  value={minScores[key]}
                  onChange={(e) => updateMinScore(key, Number(e.target.value))}
                  className="rounded-lg border border-[#ddd4c8] bg-[#faf8f5] px-2 py-1.5 text-xs text-[#3a2a20] outline-none focus:border-[#8B6355]"
                >
                  {MIN_SCORE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 件数表示 ── */}
      <p className="text-sm text-[#9a8878]">
        {filtered.length} 件
        {filtered.length !== beans.length && ` / ${beans.length} 件中`}
      </p>

      {/* ── 豆カードグリッド ── */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[#b0a090]">
          条件に一致する豆メモが見つかりませんでした。
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bean) => (
            <Link
              key={bean.id}
              href={`/beans/${bean.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#ede5db] transition-shadow hover:shadow-md"
            >
              {/* 写真 */}
              <div className="relative aspect-square overflow-hidden bg-[#f0ebe4]">
                {bean.photo ? (
                  <Image
                    src={bean.photo.url}
                    alt={bean.photo.alt ?? bean.coffeeName}
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

              {/* テキスト */}
              <div className="flex flex-1 flex-col p-5 gap-2">
                {/* 店舗バッジ */}
                {bean.shop && (
                  <span className="w-fit rounded-full bg-[#f0ebe4] px-2.5 py-0.5 text-xs text-[#7a5a4a]">
                    {bean.shop.name}
                  </span>
                )}

                {/* 豆名 */}
                <h2 className="text-base font-semibold leading-snug text-[#3a2a20] group-hover:text-[#5c3d2e] transition-colors line-clamp-2">
                  {bean.coffeeName}
                </h2>

                {/* 味スコア */}
                <div className="mt-auto pt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                  {TASTE_KEYS.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#b0a090] w-6 shrink-0">{label}</span>
                      <ScoreDots score={bean[key] ?? 0} />
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
