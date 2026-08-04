作品カードとポップアップの文章は `works.js` で管理します。

主な項目:

- `id`: 画像フォルダ名。`src/assets/works/{id}/` と一致させる
- `featured`: `true` の作品だけをサイトに表示
- `title`: カードに出る短いタイトル
- `category`: フィルター分類
- `meta`: 補足情報
- `summary`: カードとポップアップ冒頭に出る短い説明
- `description`: 元タイトルや補足説明
- `details.background`: 背景
- `details.role`: 自分の役割
- `details.outcome`: 成果
- `details.learning`: 学び
- `imagePositions.cover`: カバー画像の切り取り位置
- `imagePositions.image2`: 2枚目画像の切り取り位置
- `imagePositions.image3`: 3枚目画像の切り取り位置

`details` は空欄なら画面に出ません。

縦長画像の切り取り位置を変えたいとき:

```js
imagePositions: {
  cover: 'center 35%',
  image2: 'center 45%',
  image3: 'center 60%',
}
```

数字を小さくすると上寄り、大きくすると下寄りになります。
