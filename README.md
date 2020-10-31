# 目次

- 概要
- 利用技術と内容
- この課題を通して学んだこと
- 苦労した点, 改善点
- 参考

# 概要

![chat_app](https://user-images.githubusercontent.com/43399066/92310638-4740bf00-efeb-11ea-8659-228603429927.png)

- バックエンド: aws Amplify での実装
- フロントエンド： Appsync subsciription によるリアルタイムチャットアプリを Next.js で実装

## Web ページ

username: testuser
password: password でテストログインできます

https://next-chat-app.vercel.app/

# 利用技術と内容

## フロントエンド

- 利用技術

  - react 16.13.1
  - Next.js 9.5.1
  - Typescript 3.9.7

- 内容

  - Appsync subsciription によるリアルタイムチャット
    ![chat](https://user-images.githubusercontent.com/43399066/92310620-25473c80-efeb-11ea-9f7d-e01891fdc7c8.gif)

  - aws-cognito-next によるタブ間でのログイン状態の同期
    ![login](https://user-images.githubusercontent.com/43399066/92310617-1d879800-efeb-11ea-909f-57b0c1c5622b.gif)

  - useReducer によるステート管理

## バックエンド

- 利用技術

  - aws Amplify

- 内容

  - Amplify によるサーバーサイドの作成(auth: cognito, api: Appsync)

# この課題を通して学んだこと

- amplify の基本的な使用方法 aws サービスの学習
- appsync api との連携

# 苦労した点

- appsync と Typescript を併用するのに苦労した

# 改善点

- 適切なファイル分割によるリファクタリング
- スマホサイズだとモーダルが隠れてしまう
- チャットが増えたときの過去のチャットの読み込み

# 参考

- [amplify Docs](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js)
- [Authentication in Next.js using Amazon Cognito](https://medium.com/frontend-digest/authentication-in-next-js-using-amazon-cognito-f30efed6a24f)
- [Observable type would be better to export from '@aws-amplify/api'](https://github.com/aws-amplify/amplify-js/issues/5741)
