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

研究テーマは `content/research/` 直下のディレクトリ名に対応する。

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

すでに対象テーマ用の YAML が `data/publications/<project>.yaml` として存在していた場合は、そのファイルの `venues:` に追記する。

対応する YAML がない場合は、新しく `data/publications/<project>.yaml` を作成する。
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
  title: Paper Title
  authors:
  - Author 1
  - Author 2 
  abstract: |
    Abstract text here.
  venue: Venue yyyy
  venue_short: Venue
  year: yyyy
  date: yyyy-mm-dd
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
| `abstract` | 論文概要 |
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

研究テーマは `content/research/<theme>/` に作成する。
`<theme>` は研究テーマの ID として使われ、論文 YAML の `projects:` から参照される。

基本的には、1つの研究テーマにつき次の2ファイルを置けばよい。

```text
content/research/<theme>/index.md
content/research/<theme>/index.ja.md
```

`index.md` が英語版、`index.ja.md` が日本語版に対応する。

### 1. 研究テーマ用のディレクトリを作る

まず、`content/research/` の下に研究テーマ用のディレクトリを作る。

例：

```text
content/research/learning-dynamics-equilibrium-games/
```

このディレクトリ名が、論文 YAML で指定するテーマ ID になる。

```yaml
projects:
- learning-dynamics-equilibrium-games
```

### 2. 英語版と日本語版のファイルを置く

研究テーマごとに、英語版 `index.md` と日本語版 `index.ja.md` を置く。

```text
content/research/learning-dynamics-equilibrium-games/index.md
content/research/learning-dynamics-equilibrium-games/index.ja.md
```

英語版と日本語版では、フロントマターの内容を対応させる。

```yaml
---
title: "Learning Dynamics and Equilibrium Computation in Games"
short: "Learning Dynamics"
summary: "How can learning algorithms converge quickly to Nash equilibrium?"
order: 1
keywords: ["Learning in Games", "Learning Dynamics", "Equilibrium Computation"]
showReadingTime: false
showDate: false
---
```

日本語版では、`summary` や本文を日本語で書く。

```yaml
---
title: "Learning Dynamics and Equilibrium Computation in Games"
short: "Learning Dynamics"
summary: "ナッシュ均衡へ高速に収束する学習アルゴリズムとは？"
order: 1
keywords: ["Learning in Games", "Learning Dynamics", "Equilibrium Computation"]
showReadingTime: false
showDate: false
---
```

### 主な項目

| 項目 | 内容 |
|---|---|
| `title` | 研究テーマの正式名 |
| `short` | チップや関連論文などに表示する短いラベル |
| `summary` | 研究テーマ一覧のカードに表示する一文。問いかけの形で書く |
| `order` | 研究テーマ一覧での並び順。英語版・日本語版で同じ値に揃える |
| `keywords` | キーワード |
| `showReadingTime` | 読了時間を表示するか |
| `showDate` | 日付を表示するか |

### 3. 本文を書く

本文は、導入の段落と焦点のリストで構成する。

英語版では見出しを `## Key questions` とする。

```markdown
This theme studies learning algorithms for computing equilibria in games. I focus on last-iterate convergence to Nash equilibrium and perturbation-based methods for stabilizing learning dynamics.

## Key questions

- How can learning algorithms converge quickly to Nash equilibrium?
- How can perturbation-based methods stabilize learning dynamics?
- When do multi-agent learning dynamics fail to converge?
```

日本語版では見出しを `## 研究の焦点` とする。

```markdown
本テーマでは、ゲームの均衡を計算する学習アルゴリズムを扱う。特に、更新される戦略そのものがナッシュ均衡へ収束するようなアルゴリズムの構築や、利得摂動を用いた学習ダイナミクスの安定化に着目する。

## 研究の焦点

- 学習アルゴリズムはどのようにしてナッシュ均衡へ高速に収束できるか
- 利得摂動を用いて学習ダイナミクスをどのように安定化できるか
- マルチエージェントの学習ダイナミクスはいつ収束しないのか
```

### 4. 論文 YAML から参照する

研究テーマに論文を紐づけるには、論文 YAML の `projects:` にテーマ ID を指定する。

```yaml
projects:
- learning-dynamics-equilibrium-games
```

複数の研究テーマに紐づける場合は、複数指定する。

```yaml
projects:
- learning-dynamics-equilibrium-games
- bandits-online-learning
```

### 5. 表示を確認する

追加後、ローカルでサイトを起動する。

```bash
hugo server
```

以下を確認する。

- 研究テーマ一覧ページにカードが表示されるか
- 英語版・日本語版の両方で表示されるか
- `order` の順に並んでいるか
- 論文 YAML の `projects:` から正しく紐づいているか
- 論文詳細ページの研究テーマチップに表示されるか
- 研究テーマ詳細ページの「関連論文」に表示されるか

## 公開（デプロイ）

`master` への push で **GitHub Actions が自動ビルド＆公開**する（`.github/workflows/deploy.yml`）ため、手動コピーは不要。
