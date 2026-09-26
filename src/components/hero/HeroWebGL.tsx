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

    // Lazy load after critical first paint / LCP is completely finished
    const schedule = (cb: () => void) => {
      const win = window as any;
      if (typeof win.requestIdleCallback === "function") {
        return win.requestIdleCallback(cb, { timeout: 3000 });
      }
      return setTimeout(cb, 1800);
    };

    const cancelSchedule = (id: number) => {
      const win = window as any;
      if (typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };

    const idleId = schedule(async () => {
      try {
        const THREE = await import("three");
        if (disposed || !host.current || window.innerWidth < 1024) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.z = 3;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        // Cap pixel ratio to 1.0 to eliminate mobile / low-end GPU strain
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
        renderer.setClearColor(0x14120c, 0);
        node.appendChild(renderer.domElement);

        let targetPointerX = 0;
        let targetPointerY = 0;
        let targetScroll = 0;

        const uniforms = {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
        };
        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms,
          vertexShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uPointer;
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
              gl_FragColor=vec4(color,clamp(ribbon*0.28*edge*(1.0-uScroll*0.35),0.0,0.20));
            }`,
        });

        // 32x20 segments provides identical visual fidelity with 75% fewer vertex calculations
        const geometry = new THREE.PlaneGeometry(5.8, 3.8, 32, 20);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const resize = () => {
          const width = node.clientWidth;
          const height = node.clientHeight;
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
        };

        const pointer = (event: PointerEvent) => {
          targetPointerX = event.clientX / window.innerWidth;
          targetPointerY = event.clientY / window.innerHeight;
        };

        const scroll = () => {
          targetScroll = Math.min(window.scrollY / Math.max(node.clientHeight, 1), 1);
        };

        const observer = new ResizeObserver(resize);
        observer.observe(node);
        window.addEventListener("pointermove", pointer, { passive: true });
        window.addEventListener("scroll", scroll, { passive: true });
        resize();

        let frame = 0;
        let isVisible = true;
        const animate = () => {
          if (!isVisible) {
            frame = 0;
            return;
          }
          uniforms.uTime.value = performance.now() / 1000;
          uniforms.uPointer.value.x += (targetPointerX - uniforms.uPointer.value.x) * 0.08;
          uniforms.uPointer.value.y += (targetPointerY - uniforms.uPointer.value.y) * 0.08;
          uniforms.uScroll.value = targetScroll;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(animate);
        };
        animate();

        // Halt WebGL GPU cycles completely when hero is outside viewport
        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible && frame === 0) {
              animate();
            }
          },
          { threshold: 0 }
        );
        visibilityObserver.observe(node);

        const onViewportChange = () => {
          if (window.innerWidth < 1024) teardown();
        };
        window.addEventListener("resize", onViewportChange);

        teardown = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          window.removeEventListener("resize", onViewportChange);
          visibilityObserver.disconnect();
          observer.disconnect();
          window.removeEventListener("pointermove", pointer);
          window.removeEventListener("scroll", scroll);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        /* Static gradient fallback remains visible */
      }
    });

    return () => {
      disposed = true;
      cancelSchedule(idleId);
      teardown();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className="hero-webgl pointer-events-none absolute inset-0" />;
}
