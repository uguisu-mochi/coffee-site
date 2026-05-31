# コーヒー研究室 — 仕様・設計ドキュメント

## 概要

**サイト名:** コーヒー研究室  
**サブタイトル:** A Coffee Journal  
**説明:** コーヒーの記録、エッセイ、器具のこと。

コーヒーにまつわる3つのコンテンツ（豆メモ・エッセイ・器具紹介）を管理・公開するパーソナルブログ。コンテンツ管理に microCMS を使用し、Next.js App Router で静的生成（SSG）する構成。

---

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---|---|---|
| フレームワーク | Next.js | 16.2.6 |
| UI ライブラリ | React | 19.2.4 |
| スタイリング | Tailwind CSS | v4 |
| CMS | microCMS (`microcms-js-sdk`) | 3.4.0 |
| チャート | Recharts | 3.8.1 |
| アイコン | lucide-react | 1.17.0 |
| 言語 | TypeScript | 5.x |

---

## ページ構成・ルーティング

```
/               → トップページ（ナビゲーションハブ）
/essays         → エッセイ一覧
/essays/[id]    → エッセイ詳細（SSG: generateStaticParams）
/beans          → コーヒー豆メモ一覧（クライアント側絞り込み付き）
/beans/[id]     → 豆メモ詳細（SSG: generateStaticParams）
/gears          → 器具紹介一覧
/gears/[id]     → 器具詳細（SSG: generateStaticParams）
```

詳細ページはすべて `generateStaticParams` によるビルド時静的生成。`generateMetadata` で OGP も設定済み。

---

## microCMS エンドポイント

### `essays` — エッセイ

| フィールドID | 型 | 必須 | 説明 |
|---|---|---|---|
| `title` | string | ✓ | タイトル |
| `thumbnail` | image | | サムネイル画像 |
| `article` | richText | ✓ | 本文（HTML として出力） |
| `publishedAt` | datetime | — | MicroCMSListContent の公開日を使用 |

取得クエリ: `orders: "-publishedAt"`, `limit: 100`

### `tastenote` — コーヒー豆メモ

| フィールドID | 型 | 必須 | 説明 |
|---|---|---|---|
| `coffeeName` | string | ✓ | 豆の名前 |
| `shop` | relation (Shop) | | 購入店舗（depth: 2 で展開） |
| `photo` | image | | 商品写真 |
| `comment` | richText | | テイストメモ（HTML） |
| `acidity` | number | ✓ | 酸味 (0–5) |
| `sweetness` | number | ✓ | 甘み (0–5) |
| `bitterness` | number | ✓ | 苦味 (0–5) |
| `body` | number | ✓ | コク (0–5) |
| `aroma` | number | ✓ | 香り (0–5) |

取得クエリ: `orders: "-createdAt"`, `limit: 100`, `depth: 2`  
※ 味スコアはフラットに API ルートへ配置（`tasteScores` のネストなし）

### `items` — 器具紹介

| フィールドID | 型 | 必須 | 説明 |
|---|---|---|---|
| `title` | string | ✓ | アイテム名 |
| `category` | select（複数） | ✓ | カテゴリ（配列） |
| `images` | image（複数） | ✓ | 商品写真（複数枚） |
| `comment` | richText | ✓ | 商品紹介文（HTML） |
| `amazonUrl` | string | | Amazon リンク |
| `rakutenUrl` | string | | 楽天市場リンク |

取得クエリ: `orders: "-createdAt"`, `limit: 100`

### `shops` — 店舗マスター（リレーション先）

| フィールドID | 型 | 説明 |
|---|---|---|
| `name` | string | 店舗名 |
| `address` | string | 住所 |

---

## コンポーネント設計

### Server Components（ページ）

全ページはデフォルトで Server Component。microCMS への fetch はサーバー側で実行し、結果を props として Client Component へ渡す。

### Client Components

| コンポーネント | ファイル | 役割 |
|---|---|---|
| `BeanSearchList` | `src/components/BeanSearchList.tsx` | 豆メモ一覧の検索・絞り込み・ソート |
| `TasteChart` | `src/components/TasteChart.tsx` | 味スコアのレーダーチャート（Recharts） |
| `ImageGallery` | `src/components/ImageGallery.tsx` | 器具詳細の画像ギャラリー（サムネイル切り替え） |

### `BeanSearchList` の絞り込み仕様

- **テキスト検索:** 豆の名前(`coffeeName`) またはコメント(`comment`) を部分一致（大文字小文字無視）
- **味スコアフィルター:** 酸味・甘み・苦味・コク・香りそれぞれに最低スコア（指定なし / 3以上 / 4以上 / 5のみ）を設定
- **ソート:** 店舗名で昇順・降順（日本語ロケール対応）
- フィルタ結果件数を表示

---

## 環境変数

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン（必須） |
| `MICROCMS_API_KEY` | microCMS の API キー（必須） |

未設定の場合はサーバー起動時にエラーをスロー（`src/lib/microcms.ts`）。

---

## デザインシステム

### カラーパレット

| 用途 | カラーコード |
|---|---|
| 背景 | `#faf8f5`（クリーム） |
| 白カード背景 | `#ffffff` |
| テキスト（メイン） | `#3a2a20`（ダークブラウン） |
| テキスト（サブ） | `#7a6a5a` |
| テキスト（ミュート） | `#9a8878` / `#b0a090` |
| アクセント | `#8B6355` / `#6B4635`（コーヒーブラウン） |
| ボーダー | `#ede5db` / `#e8e0d8` |
| プレースホルダー背景 | `#f0ebe4` |
| Amazon ボタン | `#FF9900` |
| 楽天ボタン | `#BF0000` |

### タイポグラフィ

- フォント: Geist Sans / Geist Mono（Google Fonts）
- リッチテキスト本文: `.prose-essay` クラス（`globals.css` で定義）
  - 行間 1.9、文字色 `#3a2a20`
  - 見出し（h2–h4）、段落、画像、リスト、引用、コードブロックのスタイルを含む

### メタデータ

```
title.default: "コーヒー研究室"
title.template: "%s | コーヒー研究室"
description: "コーヒーの記録、エッセイ、器具のこと。"
```

各詳細ページで `generateMetadata` により OGP 画像も設定。

---

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（フォント・メタデータ）
│   ├── globals.css         # Tailwind 読み込み・.prose-essay スタイル
│   ├── page.tsx            # トップページ（ナビゲーション）
│   ├── essays/
│   │   ├── page.tsx        # エッセイ一覧
│   │   └── [id]/page.tsx   # エッセイ詳細
│   ├── beans/
│   │   ├── page.tsx        # 豆メモ一覧
│   │   └── [id]/page.tsx   # 豆メモ詳細
│   └── gears/
│       ├── page.tsx        # 器具一覧
│       └── [id]/page.tsx   # 器具詳細
├── components/
│   ├── BeanSearchList.tsx  # 豆メモ検索・絞り込みリスト（Client）
│   ├── TasteChart.tsx      # レーダーチャート（Client）
│   └── ImageGallery.tsx    # 画像ギャラリー（Client）
├── lib/
│   └── microcms.ts         # microCMS クライアント初期化
└── types/
    └── coffee.ts           # 型定義（Shop, TasteScores, TasteNote, Essay, Item）
```
