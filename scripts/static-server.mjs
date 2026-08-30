import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'out');
const basePath = '/mi-cocina-semanal';
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

createServer((request, response) => {
  const rawPath = decodeURIComponent((request.url ?? '/').split('?')[0]);
  const relative = rawPath.startsWith(basePath) ? rawPath.slice(basePath.length) || '/' : rawPath;
  let file = normalize(join(root, relative === '/' ? 'index.html' : relative));
  if (!file.startsWith(root)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(4174, '127.0.0.1', () => console.log('Static site ready on http://127.0.0.1:4174/mi-cocina-semanal/'));
