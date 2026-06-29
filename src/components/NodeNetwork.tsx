import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero 배경용 노드 네트워크.
 * - Points로 노드 표현
 * - 가까운 노드끼리 LineSegments로 연결
 * - 마우스 위치에 가까운 노드는 그쪽으로 끌어당겨짐 (attract)
 * - 노드 각자 작은 브라우니안 모션
 */
export default function NodeNetwork() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const NODE_COUNT = 90;
    const CONNECT_DIST = 1.6;
    const MOUSE_RADIUS = 1.8;
    const MOUSE_STRENGTH = 0.7;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Node positions
    const positions = new Float32Array(NODE_COUNT * 3);
    const basePositions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const RANGE_X = 11;
    const RANGE_Y = 6;
    const RANGE_Z = 2;
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * RANGE_X;
      const y = (Math.random() - 0.5) * RANGE_Y;
      const z = (Math.random() - 0.5) * RANGE_Z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom shader-less material via canvas texture for soft dots
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dctx = dotCanvas.getContext("2d")!;
    const grad = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(245, 241, 232, 1)");
    grad.addColorStop(0.4, "rgba(245, 241, 232, 0.6)");
    grad.addColorStop(1, "rgba(245, 241, 232, 0)");
    dctx.fillStyle = grad;
    dctx.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const nodeMat = new THREE.PointsMaterial({
      size: 0.12,
      map: dotTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xf5f1e8,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    scene.add(points);

    // Lines — max segments preallocated
    const MAX_LINKS = NODE_COUNT * 8;
    const linePositions = new Float32Array(MAX_LINKS * 6);
    const lineColors = new Float32Array(MAX_LINKS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse
    const mouse = new THREE.Vector3(0, 0, 0);
    const targetMouse = new THREE.Vector3(0, 0, 0);
    const ndc = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // unproject to z=0 plane
      const v = new THREE.Vector3(ndc.x, ndc.y, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      targetMouse.copy(camera.position).add(dir.multiplyScalar(dist));
    };
    window.addEventListener("pointermove", onMove);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Animation
    let raf = 0;
    const greenColor = new THREE.Color(0x2fa15c);
    const ivoryColor = new THREE.Color(0xf5f1e8);
    const tmpColor = new THREE.Color();

    const animate = () => {
      // Lerp mouse
      mouse.lerp(targetMouse, 0.08);

      // Update nodes
      const posAttr = nodeGeo.attributes.position as THREE.BufferAttribute;
      const pArr = posAttr.array as Float32Array;
      for (let i = 0; i < NODE_COUNT; i++) {
        const ix = i * 3;
        // brownian drift
        pArr[ix] += velocities[ix];
        pArr[ix + 1] += velocities[ix + 1];
        pArr[ix + 2] += velocities[ix + 2];

        // pull back to base (spring)
        pArr[ix] += (basePositions[ix] - pArr[ix]) * 0.005;
        pArr[ix + 1] += (basePositions[ix + 1] - pArr[ix + 1]) * 0.005;
        pArr[ix + 2] += (basePositions[ix + 2] - pArr[ix + 2]) * 0.01;

        // mouse attraction
        const dx = mouse.x - pArr[ix];
        const dy = mouse.y - pArr[ix + 1];
        const dz = mouse.z - pArr[ix + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
          const d = Math.sqrt(d2);
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH * 0.02;
          pArr[ix] += dx * force;
          pArr[ix + 1] += dy * force;
          pArr[ix + 2] += dz * force;
        }
      }
      posAttr.needsUpdate = true;

      // Build lines
      let li = 0;
      const linePosArr = linePositions;
      const lineColArr = lineColors;
      for (let i = 0; i < NODE_COUNT; i++) {
        const ax = pArr[i * 3];
        const ay = pArr[i * 3 + 1];
        const az = pArr[i * 3 + 2];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const bx = pArr[j * 3];
          const by = pArr[j * 3 + 1];
          const bz = pArr[j * 3 + 2];
          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            if (li >= MAX_LINKS) break;
            const d = Math.sqrt(d2);
            const t = 1 - d / CONNECT_DIST;

            // tint by proximity to mouse
            const mdx = (ax + bx) * 0.5 - mouse.x;
            const mdy = (ay + by) * 0.5 - mouse.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            const greenT = Math.max(0, 1 - md / 3.5);
            tmpColor.copy(ivoryColor).lerp(greenColor, greenT);
            const r = tmpColor.r * t;
            const g = tmpColor.g * t;
            const b = tmpColor.b * t;

            linePosArr[li * 6] = ax;
            linePosArr[li * 6 + 1] = ay;
            linePosArr[li * 6 + 2] = az;
            linePosArr[li * 6 + 3] = bx;
            linePosArr[li * 6 + 4] = by;
            linePosArr[li * 6 + 5] = bz;

            lineColArr[li * 6] = r;
            lineColArr[li * 6 + 1] = g;
            lineColArr[li * 6 + 2] = b;
            lineColArr[li * 6 + 3] = r;
            lineColArr[li * 6 + 4] = g;
            lineColArr[li * 6 + 5] = b;

            li++;
          }
        }
      }
      // zero out remaining
      for (let k = li; k < MAX_LINKS; k++) {
        linePosArr[k * 6] = 0;
        linePosArr[k * 6 + 1] = 0;
        linePosArr[k * 6 + 2] = 0;
        linePosArr[k * 6 + 3] = 0;
        linePosArr[k * 6 + 4] = 0;
        linePosArr[k * 6 + 5] = 0;
      }
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // gentle camera drift
      camera.position.x = mouse.x * 0.1;
      camera.position.y = mouse.y * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      renderer.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      dotTex.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      aria-hidden
    />
  );
}
