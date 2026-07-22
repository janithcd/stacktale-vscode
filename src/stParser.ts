// Parses the st/1 text in errors-ai.log into reports. Pure — no vscode dependency — so it
// is unit-testable headless. Mirrors the IntelliJ plugin's parser: tolerant of unknown
// lines (forward compatibility per the st/1 spec), of the self-describing file header
// (which quotes the delimiter mid-line inside a '#' comment), and of truncated/rotated files.

export interface StFrame {
  /** The source file name as written in the frame, e.g. "PaymentService.java". */
  file: string;
  line: number;
  /** The full trimmed frame line, for the tooltip. */
  text: string;
}

export interface StReport {
  id: string;
  timestamp: string;
  headline: string;
  culprit?: StFrame;
  frames: StFrame[];
  /** The full report block, verbatim — what "Copy report for AI" copies. */
  block: string;
}

const START = "━━━ ERROR #";
const END = "━━━ END #";
// id + timestamp from "━━━ ERROR #a1b2 ━━━ 2026-07-10 20:16:40.412 thread=… ━━━"
const HEADER = /^━━━ ERROR #(\S+) ━━━ (.+?) thread=/;
// a frame carrying a source location: "…(PaymentService.java:44)"
const FRAME = /\(([\w$]+\.(?:java|kt|groovy|scala)):(\d+)\)/;

export function parseReports(content: string): StReport[] {
  const reports: StReport[] = [];
  if (!content) {
    return reports;
  }
  const lines = content.split("\n").map(stripCr);
  let i = 0;
  while (i < lines.length) {
    // a real report starts with the delimiter at column 0; the header only quotes it mid-line
    if (!lines[i].startsWith(START)) {
      i++;
      continue;
    }
    const block: string[] = [lines[i]];
    let j = i + 1;
    while (j < lines.length) {
      const bl = lines[j];
      if (bl.startsWith(START)) {
        break; // next block began — this one was truncated
      }
      block.push(bl);
      if (bl.startsWith(END)) {
        j++;
        break;
      }
      j++;
    }
    const report = parseBlock(block);
    if (report) {
      reports.push(report);
    }
    i = j;
  }
  return reports;
}

function parseBlock(block: string[]): StReport | undefined {
  const header = HEADER.exec(block[0]);
  if (!header) {
    return undefined;
  }
  const id = header[1];
  const timestamp = header[2].trim();
  const headline = block.length > 1 ? block[1].trim() : "";

  let culprit: StFrame | undefined;
  const frames: StFrame[] = [];
  for (const bl of block) {
    const fm = FRAME.exec(bl);
    if (fm) {
      const frame: StFrame = { file: fm[1], line: parseInt(fm[2], 10), text: bl.trim() };
      frames.push(frame);
      if (!culprit && (bl.includes("← YOUR CODE") || bl.includes("← culprit"))) {
        culprit = frame;
      }
    }
  }
  if (!culprit && frames.length > 0) {
    culprit = frames[0];
  }
  return { id, timestamp, headline, culprit, frames, block: block.join("\n") };
}

function stripCr(s: string): string {
  return s.endsWith("\r") ? s.slice(0, -1) : s;
}
