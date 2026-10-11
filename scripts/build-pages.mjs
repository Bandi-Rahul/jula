import { cp, mkdir, writeFile, appendFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const stage = join(root, ".build/ai/github-pages", `build-${Date.now()}`);
await mkdir(stage, { recursive: true });
await cp(join(root, "src"), join(stage, "src"), {
  recursive: true,
  filter: (source) =>
    !relative(root, source).replaceAll("\\", "/").startsWith("src/app/api"),
});
await cp(join(root, "public"), join(stage, "public"), { recursive: true });
for (const file of [
  "package.json",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
])
  await cp(join(root, file), join(stage, file));
const result = spawnSync(
  process.execPath,
  [join(root, "node_modules/next/dist/bin/next"), "build", stage],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH ?? "/jula",
      SITE_URL: process.env.SITE_URL ?? "https://bandi-rahul.github.io",
      FORM_PROCESSING_APPROVED: "false",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
const output = join(stage, "out");
await writeFile(join(output, ".nojekyll"), "");
await writeFile(
  join(root, ".build/ai/github-pages/latest.json"),
  JSON.stringify({ output }, null, 2),
);
if (process.env.GITHUB_OUTPUT)
  await appendFile(
    process.env.GITHUB_OUTPUT,
    `artifact_path=${relative(root, output).replaceAll("\\", "/")}\n`,
  );
console.log(`GitHub Pages export: ${output}`);
