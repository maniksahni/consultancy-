"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// A live dotted globe: flights leave Delhi for Paris and six more destinations.
// Land points come from Natural Earth (public domain), precomputed into /data/globe-dots.json.
type City = { name: string; lat: number; lon: number; home?: boolean };
const ORIGIN: City = { name: "New Delhi", lat: 28.61, lon: 77.21 };
const CITIES: City[] = [
  { name: "Paris", lat: 48.86, lon: 2.35, home: true },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Dublin", lat: 53.35, lon: -6.26 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Boston", lat: 42.36, lon: -71.06 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

function toVec(lat: number, lon: number, r = 1) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const dotVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime; uniform float uPixel;
  varying float vFacing; varying float vLat; varying float vTwinkle;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 n = normalize(world.xyz);
    vFacing = dot(n, normalize(cameraPosition - world.xyz));
    vLat = position.y;
    vTwinkle = 0.65 + 0.35 * sin(uTime * 1.6 + aSeed * 40.0);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixel * (2.4 + aSeed * 1.2) * (3.2 / -mv.z);
  }`;
const dotFragment = /* glsl */ `
  varying float vFacing; varying float vLat; varying float vTwinkle;
  void main() {
    vec2 c = gl_PointCoord - 0.5; float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    vec3 violet = vec3(0.55, 0.47, 1.0); vec3 rose = vec3(1.0, 0.45, 0.66); vec3 apricot = vec3(1.0, 0.72, 0.45);
    vec3 col = mix(mix(rose, violet, smoothstep(-0.2, 0.55, vLat)), apricot, smoothstep(0.55, 0.95, vLat) * 0.35);
    float front = smoothstep(-0.05, 0.45, vFacing);
    gl_FragColor = vec4(col * (0.75 + 0.7 * vTwinkle), core * front);
  }`;
const arcVertex = /* glsl */ `
  attribute float aT; varying float vT;
  void main() { vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const arcFragment = /* glsl */ `
  uniform float uProgress; uniform vec3 uColor; varying float vT;
  void main() {
    float head = smoothstep(uProgress - 0.22, uProgress, vT) * (1.0 - smoothstep(uProgress, uProgress + 0.01, vT));
    float base = 0.28 * step(vT, uProgress + 0.01) + 0.06;
    gl_FragColor = vec4(uColor, max(head, base));
  }`;
const glowVertex = /* glsl */ `
  varying vec3 vNormal; varying vec3 vView;
  void main() { vNormal = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`;
const glowFragment = /* glsl */ `
  varying vec3 vNormal; varying vec3 vView;
  void main() {
    float d = -dot(vNormal, vView);
    float f = pow(smoothstep(0.0, 0.62, d), 2.2);
    vec3 col = mix(vec3(0.45, 0.36, 1.0), vec3(1.0, 0.45, 0.7), 0.3);
    gl_FragColor = vec4(col, f * 0.55);
  }`;
const beaconFragment = /* glsl */ `
  uniform float uTime; uniform vec3 uColor; varying float vPhase;
  void main() {
    vec2 c = gl_PointCoord - 0.5; float d = length(c) * 2.0;
    float pulse = fract(uTime * 0.55 + vPhase);
    float ring = smoothstep(0.08, 0.0, abs(d - pulse)) * (1.0 - pulse);
    float core = smoothstep(0.22, 0.0, d);
    float a = max(core, ring);
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }`;
const beaconVertex = /* glsl */ `
  attribute float aSize; attribute float aPhase; uniform float uPixel; varying float vPhase;
  void main() { vPhase = aPhase; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = uPixel * aSize * (3.2 / -mv.z); }`;

export default function Globe({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const labelParis = useRef<HTMLSpanElement>(null);
  const labelHome = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); }
    catch { el.dataset.fallback = "true"; return; }
    const pixel = Math.min(2, devicePixelRatio || 1);
    renderer.setPixelRatio(pixel);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    const globe = new THREE.Group();
    scene.add(globe);

    // Face the India–Europe corridor towards the viewer, tilted to the north.
    const focus = toVec(40, 40);
    const baseYaw = -Math.atan2(focus.x, focus.z);
    let yaw = baseYaw, pitch = 0.42, velocity = 0;
    globe.rotation.set(pitch, yaw, 0);

    const occluder = new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x07060d }));
    globe.add(occluder);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(1.22, 64, 64), new THREE.ShaderMaterial({ vertexShader: glowVertex, fragmentShader: glowFragment, transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(glow);

    const dotUniforms = { uTime: { value: 0 }, uPixel: { value: pixel } };
    const dotMaterial = new THREE.ShaderMaterial({ vertexShader: dotVertex, fragmentShader: dotFragment, uniforms: dotUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    let dots: THREE.Points | undefined;
    let cancelled = false;
    fetch("/data/globe-dots.json").then((r) => r.json()).then((flat: number[]) => {
      if (cancelled) return;
      const count = flat.length / 2;
      const positions = new Float32Array(count * 3);
      const seeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const v = toVec(flat[i * 2], flat[i * 2 + 1], 1.001);
        positions.set([v.x, v.y, v.z], i * 3);
        seeds[i] = Math.random();
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      dots = new THREE.Points(geometry, dotMaterial);
      globe.add(dots);
      if (reduced) render();
    }).catch(() => {});

    // Flight paths from Delhi.
    const origin = toVec(ORIGIN.lat, ORIGIN.lon);
    const arcs = CITIES.map((city, i) => {
      const end = toVec(city.lat, city.lon);
      const lift = 1 + 0.18 + origin.distanceTo(end) * 0.22;
      const c1 = origin.clone().lerp(end, 0.25).normalize().multiplyScalar(lift);
      const c2 = origin.clone().lerp(end, 0.75).normalize().multiplyScalar(lift);
      const curve = new THREE.CubicBezierCurve3(origin.clone().multiplyScalar(1.002), c1, c2, end.clone().multiplyScalar(1.002));
      const pts = curve.getPoints(90);
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      geometry.setAttribute("aT", new THREE.BufferAttribute(new Float32Array(pts.map((_, k) => k / (pts.length - 1))), 1));
      const color = city.home ? new THREE.Color("#ffb46b") : new THREE.Color(i % 2 ? "#ff6fa3" : "#9d8bff");
      const material = new THREE.ShaderMaterial({ vertexShader: arcVertex, fragmentShader: arcFragment, uniforms: { uProgress: { value: 0 }, uColor: { value: color } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const line = new THREE.Line(geometry, material);
      globe.add(line);
      return { material, offset: i * 0.37, speed: city.home ? 0.16 : 0.11 + (i % 3) * 0.02 };
    });

    // Pulsing beacons: Paris largest, Delhi as the origin.
    const beaconCities = [{ ...ORIGIN, size: 22 }, ...CITIES.map((c) => ({ ...c, size: c.home ? 34 : 16 }))];
    const beaconGeo = new THREE.BufferGeometry();
    beaconGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(beaconCities.flatMap((c) => { const v = toVec(c.lat, c.lon, 1.006); return [v.x, v.y, v.z]; })), 3));
    beaconGeo.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(beaconCities.map((c) => c.size)), 1));
    beaconGeo.setAttribute("aPhase", new THREE.BufferAttribute(new Float32Array(beaconCities.map((_, i) => i * 0.17)), 1));
    const beaconUniforms = { uTime: { value: 0 }, uPixel: { value: pixel }, uColor: { value: new THREE.Color("#ffd6a8") } };
    const beacons = new THREE.Points(beaconGeo, new THREE.ShaderMaterial({ vertexShader: beaconVertex, fragmentShader: beaconFragment, uniforms: beaconUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    globe.add(beacons);

    const parisWorld = toVec(48.86, 2.35, 1.02);
    const homeWorld = toVec(ORIGIN.lat, ORIGIN.lon, 1.02);
    const tmp = new THREE.Vector3();
    function placeLabel(label: HTMLSpanElement | null, local: THREE.Vector3) {
      if (!label) return;
      tmp.copy(local).applyMatrix4(globe.matrixWorld);
      const facing = tmp.clone().normalize().dot(camera.position.clone().sub(tmp).normalize());
      tmp.project(camera);
      const w = el!.clientWidth, h = el!.clientHeight;
      label.style.transform = `translate(${(tmp.x * 0.5 + 0.5) * w}px, ${(-tmp.y * 0.5 + 0.5) * h}px)`;
      label.style.opacity = facing > 0.15 ? "1" : "0";
    }

    function resize() {
      const w = el!.clientWidth, h = el!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      const wide = camera.aspect > 1.15;
      globe.position.set(wide ? 1.05 : 0, wide ? 0.02 : -0.62, 0);
      glow.position.copy(globe.position);
      camera.position.z = wide ? 5.1 : 5.6;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Drag to spin, with inertia; the globe keeps a slow drift when idle.
    let dragging = false, lastX = 0, lastY = 0;
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); el.dataset.drag = "true"; };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      velocity = dx * 0.005;
      yaw += velocity;
      pitch = THREE.MathUtils.clamp(pitch + dy * 0.004, -0.2, 0.9);
    };
    const up = () => { dragging = false; el.dataset.drag = "false"; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    let frame = 0, visible = true;
    const clock = new THREE.Clock();
    function render() {
      globe.rotation.set(pitch, yaw, 0);
      globe.updateMatrixWorld();
      renderer.render(scene, camera);
      placeLabel(labelParis.current, parisWorld);
      placeLabel(labelHome.current, homeWorld);
    }
    function tick() {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      dotUniforms.uTime.value = t;
      beaconUniforms.uTime.value = t;
      arcs.forEach((arc) => { arc.material.uniforms.uProgress.value = ((t * arc.speed + arc.offset) % 1.25); });
      if (!dragging) { velocity *= 0.95; yaw += velocity + 0.0009; }
      render();
    }
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(el);
    if (reduced) { arcs.forEach((arc, i) => { arc.material.uniforms.uProgress.value = 0.6 + i * 0.05; }); render(); }
    else tick();
    el.dataset.ready = "true";

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro.disconnect(); io.disconnect();
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose(); const mat = m.material as THREE.Material | THREE.Material[] | undefined; (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose()); });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={`lx-globe ${className}`} aria-hidden="true">
    <span ref={labelParis} className="lx-globe-label is-home"><b>Paris</b><small>Althéa · home</small></span>
    <span ref={labelHome} className="lx-globe-label"><b>New Delhi</b><small>Your starting point</small></span>
  </div>;
}
