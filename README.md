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

論文ページは `data/publications/<project>.yaml` から**自動生成**されるため、Markdownファイルを手動で作る・編集する必要はない。

### 手順

1. その論文が属する研究プロジェクトを決める。`projects` には `content/research/` 直下のディレクトリ名を指定する（例: `learning-dynamics-equilibrium-games`）。
2. 既存プロジェクトなら該当ファイルの `venues:` に追記。新規プロジェクトなら `data/publications/<project>.yaml` を新規作成する。
3. venue のフィールドを埋める:

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

4. `hugo server` で確認する。`publications` 一覧と、`projects` で紐づけた研究テーマページの「関連論文」に出ることをチェック。
   - 研究テーマページの関連論文は `lang: en` の venue のみ表示する（国内発表など `ja` は除外される）。

## 研究テーマを追加・修正する

- 1テーマ = `content/research/<theme>/index.md`（EN）+ `index.ja.md`（JA）の対。
- フロントマターは EN / JA で対応させる:
  - `title` / `short`（チップ用の短縮ラベル）
  - `summary`（カードに出る一文。問いの形）
  - `order`（カードの並び順。EN / JA で揃える）
  - `keywords`
- 本文は導入1段落 + 見出し（EN は `## Key questions` / JA は `## 研究の焦点`）。
- `<theme>`（ディレクトリ名）が、論文YAMLの `projects:` から参照されるIDになる。

## 公開（デプロイ）

`master` への push で **GitHub Actions が自動ビルド＆公開**する（`.github/workflows/deploy.yml`）。手動コピーは不要。

- 作業はフィーチャーブランチ → PR → `master` にマージ。マージで公開される。
- ビルド出力（`docs/`）はコミットしない。Pages へは Actions がアーティファクトとして配信する。
