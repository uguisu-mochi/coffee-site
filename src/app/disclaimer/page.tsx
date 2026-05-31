import Link from "next/link";

export const metadata = {
  title: "免責事項",
  description: "コーヒー研究室の免責事項・アフィリエイト開示・著作権に関するページです。",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#faf8f5]">
      <header className="border-b border-[#e8e0d8] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <Link
            href="/"
            className="text-sm text-[#8a7060] hover:text-[#5c3d2e] transition-colors"
          >
            ← ホームへ
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-[#3a2a20]">免責事項</h1>
          <div className="mt-6 mx-auto h-px w-12 bg-[#c8b8a8]" />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#ede5db]">
          <article className="prose-essay">
            <h2>アフィリエイトプログラムについて</h2>
            <p>
              当サイト「コーヒー研究室」は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、<strong>Amazonアソシエイト・プログラム</strong>の参加者です。
            </p>
            <p>
              また、楽天グループ株式会社が運営する<strong>楽天アフィリエイトプログラム</strong>にも参加しており、当サイト内に掲載された楽天市場へのリンクを経由してご購入いただいた場合、当サイトに報酬が発生することがあります。
            </p>
            <p>
              器具紹介ページに掲載しているAmazonおよび楽天市場へのリンクは、これらのアフィリエイトプログラムを通じたものです。商品の価格・在庫状況等はリンク先で変動する場合があります。最新情報は各サービスのページにてご確認ください。
            </p>

            <h2>免責事項</h2>
            <p>
              当サイトに掲載されているコーヒー豆・器具・抽出方法等に関する情報は、管理人個人の経験と知識に基づくものです。情報の正確性・完全性・有用性については最善を尽くしておりますが、その内容を保証するものではありません。
            </p>
            <p>
              当サイトに掲載された商品へのリンクを経由して第三者サービス（Amazon・楽天市場等）にてご購入いただいた場合、商品の品質・配送・返品・その他取引に関するトラブルや損害について、当サイトは一切の責任を負いかねます。購入・取引に関するお問い合わせは、直接各サービスへお願いいたします。
            </p>
            <p>
              当サイトは、掲載情報の内容を予告なく変更・削除する場合があります。また、メンテナンス等によりサイトへのアクセスが一時的にできない場合がありますが、それにより生じた損害について当サイトは責任を負いかねます。あらかじめご了承ください。
            </p>

            <h2>著作権について</h2>
            <p>
              当サイト「コーヒー研究室」に掲載されているすべてのテキスト・写真・デザイン等の著作物は、特別な表記がない限り管理人に帰属します。
            </p>
            <p>
              これらの著作物の無断複製・転載・改変・商業利用等を禁止します。引用する場合は出典（サイト名およびページURL）を明記のうえ、必要に応じて事前にご連絡ください。
            </p>
          </article>

          <div className="mt-10 border-t border-[#e8e0d8] pt-6 text-right">
            <p className="text-xs text-[#b0a090]">最終更新: 2026年5月</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#c8b8a8] px-6 py-3 text-sm text-[#7a5a4a] transition-colors hover:bg-[#f0ebe4]"
          >
            ← ホームへ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
