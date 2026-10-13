import http from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,join,extname} from "node:path";
const root=resolve("out");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg",".jpeg":"image/jpeg",".ico":"image/x-icon",".txt":"text/plain"};
const port=Number(process.env.PORT||3000);
http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url||"/","http://localhost").pathname);
  if(pathname.includes("\0"))throw Error("invalid pathname");
  let file=pathname==="/"?"/index.html":pathname;
  if(file.endsWith("/"))file+="index.html";
  const tryPaths=[file];
  if(!extname(file))tryPaths.push(file+".html",file+"/index.html");
  let content=null,actual="";
  for(const candidate of tryPaths){
   const path=resolve(join(root,"."+candidate));
   if(!path.startsWith(root+"/"))continue;
   try{if((await stat(path)).isFile()){content=await readFile(path);actual=path;break;}}catch{}
  }
  if(!content){res.writeHead(404,{"content-type":"text/plain"});res.end("Not found");return;}
  res.writeHead(200,{"content-type":mime[extname(actual)]||"application/octet-stream"});
  res.end(content);
 }catch{res.writeHead(400);res.end("Bad request");}
}).listen(port,"127.0.0.1",()=>console.log("Serving static Next export on http://127.0.0.1:"+port));
