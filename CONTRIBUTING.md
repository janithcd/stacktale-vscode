# Contributing to stacktale for VS Code

Thanks for stopping by the campfire. 🔥

This is the VS Code / Cursor / Windsurf editor extension for
[**stacktale**](https://github.com/stacktale/stacktale). The library lives in the main
repo; this repo is just the extension that surfaces its `errors-ai.log` in the editor.

New here? The [`good first issue`](https://github.com/stacktale/stacktale-vscode/labels/good%20first%20issue)
label marks issues written to be picked up cold — each one names the files to touch and how
to verify.

## Claim the issue before you start

**Comment on the issue saying you'd like to take it, and wait for a reply before writing
code.** A short "I'd like to work on this" is enough — no need to restate the issue or
explain your plan. This is the only thing standing between you and someone else spending an
evening on the same fix, and it lets us tell you upfront if an issue is already half-done or
narrower than it looks. If nobody replies in a day or two, open the PR anyway.

Two exceptions, where you should just open the PR: an obvious typo or broken link, and
anything already assigned to you.

## Build & test

```bash
npm install
npm run compile   # tsc → out/
npm test          # compile + run the parser tests (node --test)
```

Press **F5** in VS Code to launch an Extension Development Host with the extension loaded.
Open a project that has an `errors-ai.log` and the **stacktale** view appears in the
activity bar. CI runs `compile` + `test` on every push.

## Where the pieces live

- **`src/stParser.ts`** — pure parser for the `errors-ai.log` (`st/1`) format. No VS Code
  API here, so it's unit-testable in plain Node. This mirrors the parser in the
  [JetBrains plugin](https://github.com/stacktale/stacktale-intellij); keep them in step.
- **`src/extension.ts`** — the VS Code glue: the tree view, the file watcher, the commands.
- **`src/test/parser.test.ts`** — `node:test` cases for the parser.

## The report format is a public API

The `errors-ai.log` format (`st/1`, and the opt-in `st-json/1`) is specified in the main
repo's [docs/FORMAT.md](https://github.com/stacktale/stacktale/blob/main/docs/FORMAT.md).
Parse defensively — a malformed or partially-written line must never crash the view — and
when in doubt about a field, check FORMAT.md rather than guessing.

## Working style

- New parsing behavior arrives with the test that demanded it (`src/test/`).
- Commits: conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `test:`), imperative
  mood, reference issues (`Closes #N`).
- One logical change per PR; explain the *why*, link the issue.

By taking part you agree to the main repo's
[Code of Conduct](https://github.com/stacktale/stacktale/blob/main/CODE_OF_CONDUCT.md).
