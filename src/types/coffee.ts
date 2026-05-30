import { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

// ─── 店舗マスター ───────────────────────────────────────────
export type Shop = MicroCMSListContent & {
  name: string;       // 店舗名
  address: string;    // 住所
};

// ─── コーヒー豆ノート ────────────────────────────────────────
// 味スコアは API ルートにフラットに存在する（tasteScores のネストなし）
export type TasteScores = {
  acidity: number;    // 酸味
  sweetness: number;  // 甘み
  bitterness: number; // 苦味
  body: number;       // コク
  aroma: number;      // 香り
};

export type TasteNote = MicroCMSListContent & TasteScores & {
  coffeeName: string;       // 豆の名前（フィールドID: coffeeName）
  shop?: Shop;              // 購入店舗リレーション（未設定の場合あり）
  photo?: MicroCMSImage;    // 商品の写真（未設定の場合あり）
  comment?: string;         // コメント
};

// ─── エッセイ ────────────────────────────────────────────────
export type Essay = MicroCMSListContent & {
  title: string;             // タイトル
  thumbnail?: MicroCMSImage; // サムネイル画像（未設定の場合あり）
  article: string;           // 本文（リッチテキスト → HTML、フィールドID: article）
  // 公開日は MicroCMSListContent の publishedAt を使用
};

// ─── アイテム ────────────────────────────────────────────────
export type Item = MicroCMSListContent & {
  title: string;             // アイテム名（フィールドID: title）
  category: string[];        // カテゴリ（複数選択 → 配列）
  images: MicroCMSImage[];   // 写真（複数枚、フィールドID: images）
  comment: string;           // 商品紹介文（フィールドID: comment）
  amazonUrl?: string;        // Amazonリンク
  rakutenUrl?: string;       // 楽天リンク
};
