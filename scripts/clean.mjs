import { rmSync } from "fs";
import { join } from "path";

const nextDir = join(process.cwd(), ".next");

try {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("✓ Removed .next cache");
} catch (err) {
  console.error("Failed to clean .next:", err);
  process.exit(1);
}
