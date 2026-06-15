# bakanaouji.github.io

bakanaouji の個人サイト。Hugo + [Blowfish](https://github.com/nunocoracao/blowfish) テーマで構築。

## ローカルプレビュー

submodule（テーマ）を初回だけ取得する。

```bash
git submodule update --init --recursive
hugo server
```

`http://localhost:1313/` で確認。`ja/` 配下が日本語版。

## 論文情報の追加方法

論文情報は `data/publications/<project>.yaml` に追加する。
論文一覧ページや論文詳細ページの HTML は YAML から自動生成されるため、`content/` 以下に論文用の Markdown を手で作る必要はない。

基本的には、既存の `data/publications/*.yaml` を開き、`venues:` の下に論文情報を1件追加すればよい。

### 1. 紐づける研究テーマを決める

まず、追加する論文をどの研究テーマに紐づけるかを決める。

研究テーマは `content/research/` 直下のディレクトリに対応する。

例：

```text
content/research/learning-dynamics-equilibrium-games/
```

この場合、YAML では次のように指定する。

```yaml
projects:
- learning-dynamics-equilibrium-games
```

複数の研究テーマに紐づける場合は、`projects:` に複数指定する。

```yaml
projects:
- learning-dynamics-equilibrium-games
- bandits-online-learning
```

### 2. YAML ファイルを選ぶ

すでに対象テーマ用のファイルが `data/publications/` にある場合は、そのファイルの `venues:` に追記する。

```text
data/publications/learning-dynamics-equilibrium-games.yaml
```

対応するファイルがない場合は、新しく作成する。

```text
data/publications/<project>.yaml
```

新しく作る場合は、ファイルの先頭に、そのファイルに含まれる論文が紐づく研究テーマを `projects:` として書く。

```yaml
projects:
- learning-dynamics-equilibrium-games

venues:
```

### 3. `venues:` に論文情報を追加する

1本の論文・発表は、`venues:` の1項目として追加する。

```yaml
projects:
- learning-dynamics-equilibrium-games

venues:
- lang: en
  featured: true
  title: Asymmetric Perturbation in Solving Bilinear Saddle-Point Optimization
  authors:
  - Kenshi Abe
  - Mitsuki Sakamoto
  - Kaito Ariu
  - Atsushi Iwasaki
  abstract: |
    Abstract text here.
  venue: ICML 2026
  venue_short: ICML
  year: 2026
  date: 2026-07-01
  type: Conference
  links:
  - name: arXiv
    url: https://arxiv.org/abs/XXXX.XXXXX
```

### 主な項目

| 項目 | 内容 |
|---|---|
| `lang` | `en` は英語・日本語の両サイトに表示、`ja` は日本語サイトのみに表示 |
| `featured` | `true` にするとトップページの Selected Publications / 主要論文に表示 |
| `title` | 論文タイトル |
| `authors` | 著者リスト |
| `abstract` | アブストラクト |
| `venue` | 会議・論文誌名。例: `ICML 2026` |
| `venue_short` | 短縮名。スラッグ生成などに使用。例: `ICML` |
| `year` | 年。通常は `date` から補完される |
| `date` | 並び替えに使う日付。形式は `YYYY-MM-DD` |
| `type` | `Conference`, `Workshop`, `Journal`, `Preprint` など |
| `links` | arXiv, Paper, Code などのリンク |

### 4. 表示を確認する

追加後、ローカルでサイトを起動する。

```bash
hugo server
```

以下を確認する。

- 論文一覧ページに表示されるか
- 論文詳細ページが生成されるか
- 紐づけた研究テーマページの「関連論文」に表示されるか
- `featured: true` の場合、トップページの主要論文に表示されるか

### 注意

研究テーマページの「関連論文」に表示されるのは `lang: en` の項目のみ。
`lang: ja` の国内発表や日本語記事は、日本語サイトには表示されるが、研究テーマページの関連論文には表示されない。

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
