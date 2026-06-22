# スペイン語 21日間ブートキャンプ 🇪🇸

ゼロから日常会話レベルへ — 1日3時間20分 × 21日間のインタラクティブ学習アプリ。

## 機能
- 21日分の完全なレッスン (文法・語彙・リスニング・アウトプット・クイズ)
- フリップカード式語彙練習 (各日 12〜16語)
- ブロックタイマー (90 / 45 / 45 / 20 分)
- 4択クイズ (各日 8問)
- 自己紹介ビルダー
- 進捗は localStorage に自動保存

---

## ローカル Mac で動かす

```bash
# 1. プロジェクトフォルダに移動
cd spanish-bootcamp

# 2. 依存パッケージをインストール (初回のみ)
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 を開く。ファイルを編集すると即座に反映されます。

---

## デプロイオプション

### ① GitHub Pages (無料・推奨)

```bash
# 1. GitHubでリポジトリを作成 (例: spanish-bootcamp)

# 2. package.json に homepage を追加:
#    "homepage": "https://あなたのユーザー名.github.io/spanish-bootcamp"

# 3. リモートを設定してプッシュ
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ユーザー名/spanish-bootcamp.git
git push -u origin main

# 4. デプロイ (ベースパスをリポジトリ名に合わせる)
VITE_BASE_PATH=/spanish-bootcamp/ npm run deploy
```

URL: `https://ユーザー名.github.io/spanish-bootcamp`

---

### ② Vercel (最も簡単・自動デプロイ)

1. https://vercel.com にサインアップ
2. GitHub リポジトリを接続
3. 設定はデフォルトのまま「Deploy」をクリック
4. プッシュするたびに自動デプロイ

URL: `https://spanish-bootcamp.vercel.app` (または自動割り当て)

---

### ③ Netlify (ドラッグ&ドロップ)

```bash
# ビルド
npm run build

# dist/ フォルダを https://app.netlify.com/drop にドラッグ&ドロップ
```

URL: 自動生成 URL が発行されます。

---

## ファイル構成

```
spanish-bootcamp/
├── src/
│   ├── App.jsx                  # メインルーター
│   ├── styles.css               # グローバルスタイル
│   ├── data/
│   │   └── curriculum.js        # 全21日分のコンテンツ
│   ├── components/
│   │   ├── Dashboard.jsx        # 21日間グリッド
│   │   ├── DayLesson.jsx        # 個別レッスンビュー
│   │   ├── Timer.jsx            # ブロックタイマー
│   │   ├── VocabCards.jsx       # フリップカード語彙
│   │   ├── Quiz.jsx             # 4択クイズ
│   │   ├── GrammarBlock.jsx     # 文法コンテンツ
│   │   ├── ListeningBlock.jsx   # リスニングリソース
│   │   └── OutputBlock.jsx      # アウトプット練習
│   └── hooks/
│       └── useProgress.js       # localStorage 進捗管理
├── package.json
├── vite.config.js
└── index.html
```

## 学習リソース (外部リンク)
- [Language Transfer](https://www.languagetransfer.org/complete-spanish) — 無料音声講座 (全40レッスン)
- [Dreaming Spanish](https://www.dreamingspanish.com/) — 多読・多聴コンテンツ
- [italki](https://www.italki.com/) — オンライン会話レッスン
- [Anki](https://apps.ankiweb.net/) — 間隔反復フラッシュカード
- [HelloTalk](https://www.hellotalk.com/) — 言語交換アプリ

---

¡Buena suerte! 頑張ってください！ 🎉
