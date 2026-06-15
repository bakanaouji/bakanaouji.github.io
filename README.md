# bakanaouji.github.io

bakanaouji の個人サイト。Hugo + [Blowfish](https://github.com/nunocoracao/blowfish) テーマで構築。

## ローカルプレビュー

submodule（テーマ）を初回だけ取得する。

```bash
git submodule update --init --recursive
hugo server
```

`http://localhost:1313/` で確認。`ja/` 配下が日本語版。

## 新しい論文を追加する

論文の情報は `data/publications/<project>.yaml` に書く。ページ（HTML）はここから自動生成されるので、`content/` 以下に Markdown を手で作る必要はない。

1. 追加する論文をどの研究テーマに紐づけるか決める。各テーマは `content/research/` 直下のディレクトリに対応する（例: `learning-dynamics-equilibrium-games`）。
2. そのテーマに紐づく YAML が `data/publications/` にあれば、その `venues:` に1件追記する。なければ新しく `data/publications/<project>.yaml` を作り、先頭の `projects:` にそのディレクトリ名を書く。
3. 発表1回分の情報（タイトル・著者・会議名・日付・リンクなど）を、`venues:` の1項目として埋める:

```yaml
projects:                  # この論文が紐づく研究テーマ（content/research/ 配下のディレクトリ名）
- learning-dynamics-equilibrium-games
venues:
- lang: en                 # "en": EN/JA 両サイトに表示 / "ja": JA サイトのみ
  featured: true           # 任意。true でトップの Selected Publications に掲載
  title: 論文タイトル
  authors:
  - Kenshi Abe
  - ...
  abstract: ...
  venue: ICLR 2025         # 会議・論文誌の正式名
  venue_short: ICLR        # スラッグに使う短縮名
  year: 2025
  date: 2025-04-24         # YYYY-MM-DD。並び替えに使用（year は date から補完される）
  type: Conference         # Conference / Workshop / Journal / Preprint など
  links:
  - name: arXiv
    url: https://arxiv.org/abs/XXXX.XXXXX
```

4. `hugo server` でプレビューし、論文一覧ページと、紐づけたテーマページの「関連論文」に表示されることを確認する。
   - テーマページの「関連論文」に出るのは `lang: en` の発表のみ（`lang: ja` の国内発表などは除外される）。

## 研究テーマを追加・修正する

1. `content/research/<theme>/` に、英語版 `index.md` と日本語版 `index.ja.md` の2ファイルを置く。
2. フロントマターは英語版・日本語版で内容を対応させる:
   - `title` / `short`（チップに出る短いラベル）
   - `summary`（カードに出る一文。問いかけの形で書く）
   - `order`（カードの並び順。英語版・日本語版で同じ値に揃える）
   - `keywords`
3. 本文は、導入の段落1つ + 見出し（英語版は `## Key questions`、日本語版は `## 研究の焦点`）。
4. ディレクトリ名 `<theme>` が、論文 YAML の `projects:` から参照するテーマ ID になる。

## 公開（デプロイ）

`master` への push で **GitHub Actions が自動ビルド＆公開**する（`.github/workflows/deploy.yml`）ため、手動コピーは不要。
