# task-board

## プロジェクト概要

テキスト入力でタスクを追加・完了切替・削除できるタスクボードアプリ。
タスクは localStorage に保存され、リロードしても保持される。

## 技術スタック

- React 19 + TypeScript
- Vite 8 (ビルド・開発サーバー)
- ESLint (typescript-eslint)
- デプロイ: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)

## デプロイ先

https://mikkuman326-cmd.github.io/task-board/

- `main` ブランチへのpushで自動デプロイされる。
- `vite.config.ts` の `base` はリポジトリ名に合わせて `/task-board/` に設定済み。

## コンポーネントの命名規約

- コンポーネントファイルはパスカルケース (`App.tsx` など)。
- 各コンポーネントに対応するスタイルは同名の `.css` ファイル (`App.css`) に記述する。
- 型定義は `src/types.ts` に集約し、型名はパスカルケース (`Task` など) とする。
- グローバルなスタイル・CSS変数は `src/index.css` に置く。

## Git運用ルール

- **コードに変更を加えるたびに、コミットしてGitHubにプッシュすること。**
  - 変更内容ごとに分かりやすいコミットメッセージを付け、作業をこまめに記録する。
  - 作業途中で区切りが悪くても、変更を加えたら都度プッシュし、リモートとローカルの差分を溜め込まない。
- コミット前に `git status` / `git diff` で変更内容を確認する。
- 機密情報(.env、認証情報など)を含むファイルはコミットしない。
- force push (`git push --force`) や `git reset --hard` などの破壊的操作は、ユーザーの明示的な許可がない限り行わない。
