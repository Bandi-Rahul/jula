import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import handler from "serve-handler";

const { output } = JSON.parse(
  await readFile(".build/ai/github-pages/latest.json", "utf8"),
);
const prefix = process.env.PAGES_BASE_PATH ?? "/jula";
const port = Number(process.env.PORT ?? 3002);
createServer((request, response) => {
  if (request.url === "/" || request.url === prefix) {
    response.writeHead(302, { Location: `${prefix}/` });
    response.end();
    return;
  }
  if (!request.url?.startsWith(`${prefix}/`)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const url = new URL(request.url, `http://localhost:${port}`);
  const path = url.pathname.slice(prefix.length);
  request.url = `${path}${path.endsWith("/") ? "index.html" : ""}${url.search}`;
  return handler(request, response, {
    public: output,
    cleanUrls: false,
    directoryListing: false,
  });
}).listen(port, "127.0.0.1", () =>
  console.log(`Static JULA preview: http://localhost:${port}${prefix}/`),
);
