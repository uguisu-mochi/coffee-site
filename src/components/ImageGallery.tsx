"use client";

import { MicroCMSImage } from "microcms-js-sdk";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ photos }: { photos: MicroCMSImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const main = photos[activeIndex];

  return (
    <div className="space-y-3">
      {/* メイン画像 */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0ebe4]">
        <Image
          src={main.url}
          alt={main.alt ?? "商品画像"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
          priority={activeIndex === 0}
        />
      </div>

      {/* サムネイル一覧（2枚以上のときのみ表示） */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === activeIndex
                  ? "border-[#7a5a4a]"
                  : "border-transparent hover:border-[#c8b8a8]"
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.alt ?? `商品画像 ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
