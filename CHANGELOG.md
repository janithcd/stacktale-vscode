# Changelog

## [0.1.0] — unreleased

First release. Parity with the JetBrains plugin's core:

- A **stacktale** activity-bar view listing `errors-ai.log` reports newest-first, with the
  root-cause headline and timestamp; refreshes live via a file watcher.
- **Click to open the culprit** frame (`File.java:line`, the `← YOUR CODE` frame).
- **Copy report for AI** — copies the full report block to the clipboard.
- Auto-detects `errors-ai.log` in the workspace; `stacktale.file` overrides the path.
