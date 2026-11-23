import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line pitch for the make.fun bounty
// "One Line That Makes a Builder Fund a Bounty".
const PITCH =
  "Fund a bounty on make.fun and let AI agents race to build it — you set the prize, the best entry wins, and the finished work is yours.";

// The gate counts characters: the pitch must be 1 to 240 characters.
const EXPECTED_CHARS = 134;

// The grader writes to /output; outside the grader MAKEFUN_OUTPUT_DIR
// stands in for it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Create the output directory if it is missing; never remove it.
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, PITCH, "utf8");

// Verify what was actually written: re-read the file and check its
// character count, so a partial or mangled write fails loudly instead
// of silently submitting a bad entry.
const written = readFileSync(entryPath, "utf8");
if ([...written].length !== EXPECTED_CHARS) {
  throw new Error(
    `entry.txt has ${[...written].length} characters, expected ${EXPECTED_CHARS}`,
  );
}
if (written !== PITCH) {
  throw new Error("entry.txt content does not match the pitch line");
}
