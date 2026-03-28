# Shared Schedule Planner

GitHub Pages に置ける、共有閲覧向けの送迎スケジュールアプリです。  
PCでは表表示、スマホではカード表示になります。

## 重要
この構成では `data/shared-schedule.json` を全員で読みます。

- URLにアクセスした人は同じデータを見られる
- GitHub上のJSONを更新すれば全員に反映される
- ただし **GitHub Pages単体ではブラウザから安全にGitHubへ直接保存できない**

つまり、この版は次の用途に向いています。

- 家族や関係者に同じ予定を見せたい
- 管理者が GitHub の JSON を更新する
- 閲覧側はURLを開くだけでよい

## フォルダ構成

```text
schedule-planner-shared/
├─ index.html
├─ css/
│  └─ style.css
├─ data/
│  └─ shared-schedule.json
├─ js/
│  ├─ main.js
│  ├─ config.js
│  ├─ api/
│  │  └─ sharedRepo.js
│  ├─ data/
│  │  └─ normalize.js
│  ├─ ui/
│  │  ├─ stats.js
│  │  └─ table.js
│  └─ utils/
│     ├─ date.js
│     └─ dom.js
└─ README.md
```

## 公開方法

1. GitHub で新しいリポジトリを作る
2. このファイル一式をアップロードする
3. Settings → Pages → Branch を `main` / `/root` に設定
4. 数分待つ
5. 公開URLにアクセスする

## データ更新方法

### 方法1: GitHub上で直接編集
- `data/shared-schedule.json` を開く
- 鉛筆アイコンから編集
- Commit changes
- 数十秒〜数分で反映

### 方法2: ローカルでJSONを書き換えてpush
- JSONを書き換える
- commit & push
- Pages側に反映

## JSON形式

```json
{
  "updatedAt": "2026-03-28T00:00:00.000Z",
  "months": {
    "2026-04": {
      "2026-04-06": {
        "plan": "あり",
        "done": "",
        "pickup": "18:30",
        "note": "塾"
      }
    }
  }
}
```

## みんながブラウザ上から編集もしたい場合
その場合は GitHub Pages 単体では足りません。  
Supabase や Firebase のようなデータ保存先を追加する必要があります。

その版も必要なら次に作れます。
