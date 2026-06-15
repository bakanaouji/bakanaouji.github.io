---
title: "Language Model Alignment and Preference Optimization"
summary: "大規模言語モデルのアライメントと選好最適化。Best-of-N・最小ベイズリスク復号・DPO などで報酬ハッキングを抑えつつ整合性を高める。"
order: 2
keywords: ["LLM Alignment","Preference Optimization","Decoding"]
showReadingTime: false
showDate: false
---

大規模言語モデルを人間の選好に整合させる手法を研究している。Best-of-N サンプリング、最小ベイズリスク (MBR) 復号、選好データのフィルタリング(DPO)などを通じて、報酬ハッキングを抑えつつ出力の整合性を高める。

## Key questions
- 報酬ハッキングを抑えつつ整合性をどう高めるか
- 選好データの質をどう評価・フィルタリングするか
- 復号・サンプリング戦略は整合性にどう影響するか
