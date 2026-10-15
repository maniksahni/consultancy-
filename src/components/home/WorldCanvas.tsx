"use client";
import { useEffect, useRef } from "react";
import atlasLand from "@/data/atlasLand.json";

/** A small orthographic atlas, drawn locally without a 3D runtime. */
export default function WorldCanvas({ destination = 0, paused = false }: { destination?: number; paused?: boolean }) {
  const destinationRef = useRef(destination);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { destinationRef.current = destination; }, [destination]);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const ctx = node.getContext("2d");
    if (!ctx) return;
    let frame = 0, angle = -.25, target = -.25, dragging = false, lastX = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let lastDestination = -1;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(node);
    const resize = () => { const dpr = Math.min(devicePixelRatio, 2); node.width = node.clientWidth * dpr; node.height = node.clientHeight * dpr; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(node);
    const project = (lat: number, lon: number, radius: number, cx: number, cy: number) => {
      const a = lat * Math.PI / 180, b = lon * Math.PI / 180 + angle;
      const x = Math.cos(a) * Math.sin(b), y = Math.sin(a), z = Math.cos(a) * Math.cos(b);
      const tilt = -.25;
      return { x: cx + radius * x, y: cy - radius * (y * Math.cos(tilt) - z * Math.sin(tilt)), z: y * Math.sin(tilt) + z * Math.cos(tilt) };
    };
    const cities = [{ name:"PARIS", lat:48.85,lon:2.35 },{name:"LONDON",lat:51.5,lon:-.12},{name:"NEW YORK",lat:40.7,lon:-74},{name:"TORONTO",lat:43.65,lon:-79.38},{name:"BERLIN",lat:52.5,lon:13.4},{name:"SYDNEY",lat:-33.9,lon:151.2},{name:"DUBLIN",lat:53.35,lon:-6.26}];
    const inside = (lon:number, lat:number, ring:number[][]) => { let hit=false; for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>lat)!==(b[1]>lat) && lon<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit; };
    const dots:number[][]=[];
    atlasLand.forEach(ring=>{const xs=ring.map(p=>p[0]),ys=ring.map(p=>p[1]);const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.max(-60,Math.min(...ys)),maxY=Math.max(...ys);for(let lat=minY;lat<maxY;lat+=2.6)for(let lon=minX;lon<maxX;lon+=2.6)if(inside(lon,lat,ring))dots.push([lat,lon]);});
    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      if(lastDestination!==destinationRef.current){lastDestination=destinationRef.current;target=-cities[lastDestination].lon*Math.PI/180;}
      if (!dragging && !reduced && !pausedRef.current) target += .0005;
      angle += (target - angle) * .07;
      const w = node.width, h = node.height, r = Math.min(w,h) * .39, cx=w*.5, cy=h*.51;
      ctx.clearRect(0,0,w,h);
      const glow=ctx.createRadialGradient(cx-r*.4,cy-r*.5,0,cx,cy,r);
      glow.addColorStop(0,"#254977");glow.addColorStop(1,"#0b1f42");ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="#afc9e02e";ctx.lineWidth=w/1000;
      const line=(points:{x:number,y:number,z:number}[])=>{ctx.beginPath();let pen=false;points.forEach(p=>{if(p.z>0){if(!pen)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);pen=true;}else pen=false;});ctx.stroke();};
      for(let lat=-75;lat<=75;lat+=15) line(Array.from({length:181},(_,i)=>project(lat,i*2-180,r,cx,cy)));
      for(let lon=-180;lon<180;lon+=15) line(Array.from({length:91},(_,i)=>project(i*2-90,lon,r,cx,cy)));
      ctx.strokeStyle="#c6d5d283";ctx.lineWidth=w/1100;
      atlasLand.forEach(land=>line(land.map(([lon,lat])=>project(lat,lon,r,cx,cy))));
      ctx.fillStyle="#adc8ca88";
      dots.forEach(([lat,lon])=>{const p=project(lat,lon,r,cx,cy);if(p.z>.04){ctx.globalAlpha=Math.min(1,p.z+.15);ctx.fillRect(p.x,p.y,w*.0022,w*.0022);}});ctx.globalAlpha=1;
      cities.forEach((city,i)=>{const p=project(city.lat,city.lon,r,cx,cy);if(p.z<.1)return;ctx.beginPath();ctx.arc(p.x,p.y,i===destinationRef.current?w*.009:w*.004,0,Math.PI*2);ctx.fillStyle=i===destinationRef.current?"#f0ca86":"#e4dfd3";ctx.fill();if(i===destinationRef.current){ctx.beginPath();ctx.arc(p.x,p.y,w*.022,0,Math.PI*2);ctx.strokeStyle="#f0ca8677";ctx.stroke();ctx.fillStyle="#f0ca86";ctx.font=`${w*.021}px sans-serif`;ctx.fillText(city.name,p.x+w*.03,p.y+w*.006);}});
      ctx.strokeStyle="#e1c28c55";ctx.beginPath();ctx.ellipse(cx,cy,r*1.13,r*.28,-.32,0,Math.PI*2);ctx.stroke();
    };
    const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;node.setPointerCapture(e.pointerId);};
    const move=(e:PointerEvent)=>{if(dragging){target+=(e.clientX-lastX)*.008;lastX=e.clientX;}};
    const up=()=>{dragging=false;};
    node.addEventListener("pointerdown",down);node.addEventListener("pointermove",move);node.addEventListener("pointerup",up);node.addEventListener("pointercancel",up);draw();
    return()=>{cancelAnimationFrame(frame);ro.disconnect();observer.disconnect();node.removeEventListener("pointerdown",down);node.removeEventListener("pointermove",move);node.removeEventListener("pointerup",up);node.removeEventListener("pointercancel",up);};
  },[]);
  return <canvas ref={canvas} className="nx-globe" role="img" aria-label="Rotating atlas showing seven study destinations. Drag to rotate." />;
}
