clasp-ts-template
====

## Description

This is `GoogleAppScripts(GAS)` template repository used `Clasp` & `TypeScript`.

## Requirement

- Install node.js(14.16.0)

- Create new `GoogleAppScripts` project and get the scriptId

## Usage

1. Use this template and Create new repository

2. Execute `git clone`

```bash
$ git clone $CREATED_NEW_REPOSITORY_URL
```

3. Install `npm packages`
```bash
$ npm install
```

4. `Clasp`を使って`Google`アカウントにログインしていない場合、`Clasp`を使ってログインする
```bash
$ npx clasp login
```

5. `.clasp.json.sample`を参考に`.clasp.json`を作成する


6. ソースコードを作成する


7. ソースコードをビルドし、アップロードする

```bash
$ npm run publish
```

8. GASのコンソールをブラウザで開く

```bash
$ npx clasp open
```

9. 必要に応じて、GASのコンソールで関数の実行やトリガーの設定を行う


## Install

- node.js（14.16.0）

## Licence

[MIT](./blob/main/LICENSE)

## Author

[s.igarashi](https://github.com/50ra4)
