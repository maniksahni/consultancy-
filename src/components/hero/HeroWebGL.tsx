"use client";

import { useEffect, useRef } from "react";

export default function HeroWebGL() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    if (reduced || coarse || window.innerWidth < 1024 || (memory && memory <= 4) || (cores && cores <= 4)) return;
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;

    let disposed = false;
    let teardown = () => {};
    const idle = window.setTimeout(async () => {
      try {
        const THREE = await import("three");
        if (disposed || !host.current || window.innerWidth < 1024) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.z = 3;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x14120c, 0);
        node.appendChild(renderer.domElement);
        const uniforms = {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
        };
        const material = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, uniforms,
          vertexShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uPointer;
            // Compact 2D gradient noise. Its low amplitude keeps the mesh calm.
            vec2 hash(vec2 p) { p = vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453); }
            float noise(vec2 p) { vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(dot(hash(i),f),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
            void main() {
              vUv=uv;
              vec3 p=position;
              float flow=noise(uv*3.2+vec2(uTime*0.045, uTime*0.025));
              p.z += flow*0.13 + 0.045*sin(uv.x*8.0+uTime*0.18);
              p.x += (uPointer.x-0.5)*0.045*uv.y;
              gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
            }`,
          fragmentShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform float uScroll;
            uniform vec2 uPointer;
            vec2 hash(vec2 p) { p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453); }
            float noise(vec2 p) { vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(dot(hash(i),f),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
            void main() {
              float n=noise(vUv*3.0+vec2(uTime*0.038,-uTime*0.025));
              float ribbon=exp(-pow((vUv.y-0.53-n*0.16-(uPointer.y-0.5)*0.05)*3.0,2.0));
              float edge=smoothstep(0.0,0.3,vUv.x)*smoothstep(1.0,0.62,vUv.x);
              vec3 ink=vec3(0.078,0.071,0.047);
              vec3 warm=vec3(0.76,0.36,0.10);
              vec3 cream=vec3(0.95,0.89,0.76);
              vec3 color=mix(ink,mix(warm,cream,clamp(n*0.7+0.27,0.0,1.0)),ribbon*0.55);
              gl_FragColor=vec4(color,clamp(ribbon*0.35*edge*(1.0-uScroll*0.35),0.0,0.30));
            }`,
        });
        const geometry = new THREE.PlaneGeometry(5.8, 3.8, 64, 40);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const resize = () => {
          const { width, height } = node.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
        };
        const pointer = (event: PointerEvent) => {
          uniforms.uPointer.value.set(event.clientX / window.innerWidth, event.clientY / window.innerHeight);
        };
        const scroll = () => { uniforms.uScroll.value = Math.min(window.scrollY / Math.max(node.clientHeight, 1), 1); };
        const observer = new ResizeObserver(resize);
        observer.observe(node);
        window.addEventListener("pointermove", pointer, { passive: true });
        window.addEventListener("scroll", scroll, { passive: true });
        resize();
        let frame = 0;
        const animate = () => {
          uniforms.uTime.value = performance.now() / 1000;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(animate);
        };
        animate();
        const onViewportChange = () => { if (window.innerWidth < 1024) teardown(); };
        window.addEventListener("resize", onViewportChange);
        teardown = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("resize", onViewportChange);
          observer.disconnect();
          window.removeEventListener("pointermove", pointer);
          window.removeEventListener("scroll", scroll);
          geometry.dispose(); material.dispose(); renderer.dispose();
          renderer.domElement.remove();
        };
      } catch { /* Static gradient remains visible if WebGL fails. */ }
    }, 650);
    return () => { disposed = true; clearTimeout(idle); teardown(); };
  }, []);

  return <div ref={host} aria-hidden="true" className="hero-webgl pointer-events-none absolute inset-0" />;
}
