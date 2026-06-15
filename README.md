# bakanaouji.github.io

阿部拳之の個人サイト。Hugo + [Blowfish](https://github.com/nunocoracao/blowfish) テーマで構築。

## ディレクトリ構成

| パス | 役割 |
|---|---|
| `content/` | ページ本体。`research/`（研究テーマ）、`publications/`（論文一覧）、`_index.*`（トップ） |
| `data/publications/` | **論文データの単一の真実**。研究プロジェクト1件 = YAML 1ファイル |
| `config/_default/` | Hugo設定（`hugo.toml`）、メニュー（`menus.*.toml`）、パラメータ（`params.toml`）、言語（`languages.*.toml`） |
| `layouts/` | カスタムページレイアウト |
| `i18n/` | UI文言の翻訳（`en.yaml` / `ja.yaml`） |
| `themes/blowfish/` | テーマ本体（git submodule） |
| `docs/` | Hugoのビルド出力。`.gitignore` 済み（コミットしない） |

## ローカルプレビュー

submodule（テーマ）を初回だけ取得する。

```bash
git submodule update --init --recursive
hugo server
```

`http://localhost:1313/` で確認。`ja/` 配下が日本語版。

## 新しい論文を追加する

論文ページは `data/publications/<project>.yaml` から**自動生成**される。ページ用Markdownを手で作る必要はない。

仕組み:

- ファイル1つ = 研究プロジェクト1件。ファイル名（拡張子を除いた `<project>`）がURLスラッグに使われる。
- 1本の論文が複数の発表場所（プレプリント→ワークショップ→本会議など）を持つ場合は、その分だけ `venues[]` に列挙する。各 venue が1ページずつ生成される。
- 生成されるページのスラッグは `<project>-<venue_short>-<year>`（小文字化）。

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
  title: Boosting Perturbed Gradient Ascent for Last-Iterate Convergence in Games
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
    url: https://arxiv.org/abs/2410.02388
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
- Pages の公開ソース設定は **GitHub Actions**（Settings → Pages）。

> 旧 `deploy.sh`（develop でビルドして master のルートへ手動コピーする方式）は本ワークフローに置き換えたため廃止した。
