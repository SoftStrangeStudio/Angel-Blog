import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.resolve(projectRoot, process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
};

if (!fs.existsSync(root)) {
  console.error(`Static output does not exist: ${root}`);
  process.exit(1);
}

function resolveRequest(urlValue) {
  const pathname = decodeURIComponent(new URL(urlValue, `http://127.0.0.1:${port}`).pathname);
  const cleanPath = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(root, cleanPath);
  if (!candidate.startsWith(root)) return null;

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  const directoryIndex = path.join(candidate, "index.html");
  if (fs.existsSync(directoryIndex)) return directoryIndex;
  if (!path.extname(candidate) && fs.existsSync(`${candidate}.html`)) return `${candidate}.html`;
  return path.join(root, "404.html");
}

const server = http.createServer((request, response) => {
  const filePath = resolveRequest(request.url ?? "/");
  if (!filePath || !fs.existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const isFallback = filePath.endsWith(`${path.sep}404.html`);
  response.writeHead(isFallback ? 404 : 200, {
    "Cache-Control": "no-store",
    "Content-Type": mimeTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
