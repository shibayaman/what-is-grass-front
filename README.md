# what-is-grass

what はくさ。

## what is what is grass

言葉の Wikipedia を作ろうとしてる。

## 始め方
**重要: オープンキャンパスの人へ**
<br>こちらは開発ブランチです。デモができる様には作っていません。
<br>オープンキャンパスで使いたい方は https://github.com/shibayaman/what-is-grass-front/tree/demo を見てください。

```bash
$ git clone https://github.com/shibayaman/what-is-grass-front.git

# yarn workspace を使っているので yarn でインストールして欲しい。
$ yarn install
```

## 構成

| フォルダ | パッケージ名          | 説明                           |
| -------- | --------------------- | ------------------------------ |
| web      | @what-is-grass/web    | Web サイト版                   |
| mobile   | @what-is-grass/mobile | モバイル版                     |
| shared   | @what-is-grass/shared | web と mobile で共有するコード |

## web

開発サーバーの起動

```
$ yarn dev:web
```

プロダクションサーバーの起動

```
$ yarn start:web
```

## shared

変更検知してビルド

```
$ yarn dev:shared
```

1 回だけビルド

```
$ yarn build:shard
```
