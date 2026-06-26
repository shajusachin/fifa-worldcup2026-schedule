import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
const ROOT = process.cwd();
const TYPES = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css'};
createServer(async (req,res)=>{
  try{
    let f = decodeURIComponent(req.url.split('?')[0]);
    if(f==='/'||f==='') f='/index.html';
    const data = await readFile(join(ROOT,f));
    res.writeHead(200,{'Content-Type':TYPES[extname(f)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  }catch{ res.writeHead(404); res.end('not found'); }
}).listen(8099,()=>console.log('serving on http://localhost:8099'));
