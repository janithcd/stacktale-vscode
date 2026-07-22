# stacktale for VS Code

Surface [**stacktale**](https://github.com/stacktale/stacktale)'s `errors-ai.log` inside VS
Code — the AI-ready error reports, one click from the culprit line, one click to your AI.

stacktale is a Java logging library that writes a second log built for a machine to read:
root cause first, your culprit frame marked, the story of what led to the error. This
extension makes that log navigable in the editor — the same tool-window experience the
[JetBrains plugin](https://github.com/stacktale/stacktale-intellij) gives IntelliJ users,
now for VS Code and the AI-native editors built on it (Cursor, Windsurf).

## What it does

- **Error reports view** — a **stacktale** view in the activity bar lists every report in
  `errors-ai.log`, newest first, with the root-cause headline and timestamp. It refreshes
  live as new errors land (and across rotation).
- **Jump to the culprit** — click a report to open the exact `File.java:line` stacktale
  marked as *your* code, not the framework's.
- **Copy report for AI** — the inline copy action puts the whole report block on your
  clipboard, ready to paste to an assistant. (Or point your assistant at the file directly
  with the [stacktale MCP server](https://github.com/stacktale/stacktale/blob/main/docs/mcp-setup.md).)

## Setup

Install the extension. It activates automatically when the workspace contains an
`errors-ai.log`. No configuration needed — it auto-detects the first `errors-ai.log` in the
workspace.

If you keep the file somewhere specific, set the path (relative to the workspace root):

```json
{ "stacktale.file": "build/errors-ai.log" }
```

You get an `errors-ai.log` by adding stacktale to your Java app — see the
[stacktale quickstart](https://github.com/stacktale/stacktale#quickstart).

## Development

```bash
npm install
npm run compile   # tsc → out/
npm test          # compile + run the parser tests
```

Press **F5** in VS Code to launch an Extension Development Host with the extension loaded,
open a project that has an `errors-ai.log`, and the **stacktale** view appears in the
activity bar.

## License

Apache-2.0, like stacktale itself.
