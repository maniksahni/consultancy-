"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import atlasLand from "@/data/atlasLand.json";

export default function FutureScene({ paused = false }: { paused?: boolean }) {
 const mount=useRef<HTMLDivElement>(null);const pause=useRef(paused);const [ready,setReady]=useState(false);useEffect(()=>{pause.current=paused;},[paused]);
 useEffect(()=>{
  const host=mount.current;if(!host)return;
  let renderer:THREE.WebGLRenderer;
  try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'}); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0x04080f,0);host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.set(0,.25,7.9);
  const globe=new THREE.Group();globe.rotation.z=.17;scene.add(globe);
  const core=new THREE.Mesh(new THREE.SphereGeometry(1.73,64,64),new THREE.MeshBasicMaterial({color:0x071722}));globe.add(core);
  const point=(lat:number,lon:number,r=1.76)=>{const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));};
  const coast:number[]=[];
  atlasLand.forEach(ring=>{for(let i=1;i<ring.length;i++){const a=point(ring[i-1][1],ring[i-1][0]);const b=point(ring[i][1],ring[i][0]);coast.push(a.x,a.y,a.z,b.x,b.y,b.z);}});
  const coastGeo=new THREE.BufferGeometry();coastGeo.setAttribute('position',new THREE.Float32BufferAttribute(coast,3));globe.add(new THREE.LineSegments(coastGeo,new THREE.LineBasicMaterial({color:0x91f5df,transparent:true,opacity:.68})));
  const grid:number[]=[];for(let lat=-60;lat<=60;lat+=20)for(let lon=-180;lon<180;lon+=3){const a=point(lat,lon,1.75),b=point(lat,lon+3,1.75);grid.push(a.x,a.y,a.z,b.x,b.y,b.z);}for(let lon=-180;lon<180;lon+=20)for(let lat=-90;lat<90;lat+=3){const a=point(lat,lon,1.75),b=point(lat+3,lon,1.75);grid.push(a.x,a.y,a.z,b.x,b.y,b.z);}
  const gridGeo=new THREE.BufferGeometry();gridGeo.setAttribute('position',new THREE.Float32BufferAttribute(grid,3));globe.add(new THREE.LineSegments(gridGeo,new THREE.LineBasicMaterial({color:0x54bba8,transparent:true,opacity:.12})));
  const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.86,64,64),new THREE.ShaderMaterial({transparent:true,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending,vertexShader:'varying vec3 vN; varying vec3 vP; void main(){vN=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.0);vP=p.xyz;gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 vN; varying vec3 vP; void main(){float rim=pow(1.0-abs(dot(normalize(vN),normalize(-vP))),3.0);gl_FragColor=vec4(0.22,0.95,0.75,rim*0.38);}' }));globe.add(atmosphere);
  const rings=new THREE.Group();scene.add(rings);[2.05,2.35,2.65].forEach((radius,i)=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.004,5,240),new THREE.MeshBasicMaterial({color:i===1?0x91f5df:0x5c817d,transparent:true,opacity:i===1?.6:.24}));ring.rotation.set(Math.PI/2+.28+i*.19,.1+i*.38,.1);rings.add(ring);});
  const cities=[[48.85,2.35],[28.6,77.2],[40.7,-74],[51.5,-.1],[-33.9,151.2],[43.7,-79.4]];
  cities.forEach(([lat,lon],i)=>{const marker=new THREE.Mesh(new THREE.SphereGeometry(i===0?.04:.025,12,12),new THREE.MeshBasicMaterial({color:i===0?0xd9ff8c:0xb0fff2}));marker.position.copy(point(lat,lon,1.8));globe.add(marker);if(i){const start=point(48.85,2.35,1.8),end=point(lat,lon,1.8);const pts=[];for(let t=0;t<=1;t+=.015){const v=new THREE.Vector3().lerpVectors(start,end,t).normalize().multiplyScalar(1.8+Math.sin(t*Math.PI)*.6);pts.push(v);}const route=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x9cf5d6,transparent:true,opacity:.4}));globe.add(route);}});
  const stars=[];for(let i=0;i<200;i++){stars.push((Math.random()-.5)*13,(Math.random()-.5)*10,(Math.random()-.5)*8-2);}const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x89c4b6,size:.012,transparent:true,opacity:.55})));
  let pointerX=0,pointerY=0,dragging=false,lastX=0,rotation=-1.2,frame=0,last=0;let visible=true;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};const ro=new ResizeObserver(resize);ro.observe(host);resize();const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(host);
  const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;if(dragging){rotation+=(e.clientX-lastX)*.006;lastX=e.clientX;}};
  const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;host.setPointerCapture(e.pointerId);};const up=()=>{dragging=false;};host.addEventListener('pointermove',move);host.addEventListener('pointerdown',down);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);
  const render=(time:number)=>{frame=requestAnimationFrame(render);if(!visible||document.hidden||time-last<30)return;last=time;if(!reduced&&!pause.current&&!dragging)rotation+=.002;globe.rotation.y=rotation;const amount=Math.min(1,scrollY/Math.max(1,innerHeight));if(!reduced){camera.position.x+=(pointerX*.7-camera.position.x)*.035;camera.position.y+=(-pointerY*.4+.25-camera.position.y)*.035;rings.rotation.y=time*.000025;rings.rotation.z=amount*.25;}camera.lookAt(0,0,0);renderer.render(scene,camera);};frame=requestAnimationFrame(render);setReady(true);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerdown',down);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',up);scene.traverse(obj=>{if(obj instanceof THREE.Mesh||obj instanceof THREE.Line||obj instanceof THREE.Points){obj.geometry.dispose();const materials=Array.isArray(obj.material)?obj.material:[obj.material];materials.forEach(m=>m.dispose());}});renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div className={`fx-world-canvas ${ready?'is-ready':''}`} ref={mount} role="img" aria-label="Interactive three-dimensional globe with routes connecting Paris to cities around the world. Drag to rotate."><div className="fx-globe-fallback" aria-hidden="true">◎</div></div>;
}
