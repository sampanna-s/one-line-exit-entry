import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const letter =
  "Dear Manager, I resign effective Friday: the warehouse scanner beeps at me in a tone I can only describe as disappointed.";

// Mirror the gate: UTF-8 text, 1-140 characters, single line, not only white space.
const chars = [...letter].length;
if (chars < 1 || chars > 140 || /[\r\n]/.test(letter) || letter.trim() === "") {
  throw new Error(`entry fails the gate: ${chars} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, letter, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
