clasp-ts-template
====

## Description

This is `GoogleAppsScript(GAS)` template repository used `Clasp` & `TypeScript`.

## Requirement

- Install node.js(14.16.0)

- Create new `GoogleAppsScript` project and get the project's scriptId

## Usage

1. Use this template and Create new repository.

2. Execute `git clone`.

```bash
$ git clone $CREATED_NEW_REPOSITORY_URL
```

3. Install `npm packages`.

```bash
$ npm install
```

4. Use clasp and log in to a google account if you haven't logged in with `Clasp` yet.

```bash
$ npx clasp login
```

5. Create `.clasp.json` by referring to [.clasp.json.sample](./blob/main/.clasp.sample.json).

6. Build and upload the files.

```bash
$ npm run publish
```

8. Open a `GAS` console using browser.

```bash
$ npx clasp open
```

9. Execute the function or set up a trigger if necessary.

10. Pushing the branch to remote will run the [ci.yml](.github/workflows/ci.yml) test.

11. The processing of [cd.yml](.github/workflows/cd.yml) will run if you merge the PR of the branch that matches `release/v*` into the `main` branch.

## Install

- node.js（14.16.0）

## Licence

[MIT](./blob/main/LICENSE)

## Author

[s.igarashi](https://github.com/50ra4)
