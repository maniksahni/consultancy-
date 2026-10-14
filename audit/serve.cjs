const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(process.env.ALTHEA_PREVIEW_ROOT || 'out');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=path.join(root,pathname);
  if(!file.startsWith(root+path.sep)&&file!==root) {res.writeHead(403);return res.end();}
  if(pathname==='/') file=path.join(root,'index.html');
  else if(!path.extname(file)) file+='.html';
  if(!fs.existsSync(file)){res.statusCode=404;file=path.join(root,'404.html');}
  const ext=path.extname(file);
  res.setHeader('Content-Type',types[ext]||'application/octet-stream');
  res.setHeader('Cache-Control',pathname.startsWith('/_next/static/')||pathname.startsWith('/images/')?'public,max-age=31536000,immutable':'no-cache');
  res.setHeader('Vary','Accept-Encoding');
  const stream=fs.createReadStream(file);
  if(/html|css|js|svg|xml/.test(ext)&&req.headers['accept-encoding']?.includes('gzip')){res.setHeader('Content-Encoding','gzip');stream.pipe(zlib.createGzip()).pipe(res);}
  else stream.pipe(res);
}).listen(Number(process.env.PORT||3018),'127.0.0.1');
