import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const NODES = [
  { label: 'LangGraph', color: '#ff6b35', r: 0.26, base: [ 0.0,  0.05,  0.0  ] }, // 0 — hub
  { label: 'FAISS',     color: '#e8a030', r: 0.20, base: [-1.4,  0.90,  0.0  ] }, // 1
  { label: 'FastAPI',   color: '#5ec4b0', r: 0.18, base: [ 1.35, 0.90,  0.1  ] }, // 2
  { label: 'LangChain', color: '#8090cc', r: 0.20, base: [-1.3, -0.70,  0.0  ] }, // 3
  { label: 'MLflow',    color: '#d4b84a', r: 0.16, base: [ 0.2,  1.70,  0.0  ] }, // 4
  { label: 'AWS',       color: '#f0c060', r: 0.18, base: [ 1.3, -0.65,  0.0  ] }, // 5
  { label: 'PySpark',   color: '#cc9966', r: 0.15, base: [-0.1, -1.65,  0.0  ] }, // 6
  { label: 'ChromaDB',  color: '#a78bfa', r: 0.17, base: [-2.2,  0.20,  0.1  ] }, // 7
  { label: 'Agent 1',   color: '#f472b6', r: 0.15, base: [-0.5,  2.05,  0.15 ] }, // 8
  { label: 'Agent 2',   color: '#4ade80', r: 0.15, base: [ 2.2,  0.05, -0.1  ] }, // 9
  { label: 'Agent 3',   color: '#60a5fa', r: 0.15, base: [ 0.7, -2.00,  0.1  ] }, // 10
];

const EDGES = [
  [0, 1],  // LangGraph → FAISS
  [0, 2],  // LangGraph → FastAPI
  [0, 3],  // LangGraph → LangChain
  [0, 4],  // LangGraph → MLflow
  [1, 3],  // FAISS → LangChain
  [2, 5],  // FastAPI → AWS
  [3, 6],  // LangChain → PySpark
  [5, 6],  // AWS → PySpark
  [0, 7],  // LangGraph → ChromaDB
  [0, 8],  // LangGraph → Agent 1
  [0, 9],  // LangGraph → Agent 2
  [0, 10], // LangGraph → Agent 3
  [8, 1],  // Agent 1 → FAISS
  [9, 2],  // Agent 2 → FastAPI
  [10, 6], // Agent 3 → PySpark
];

const PARTICLES = [
  { from: 0,  to: 1,  speed: 0.38, delay: 0.00 },
  { from: 0,  to: 2,  speed: 0.32, delay: 0.35 },
  { from: 0,  to: 3,  speed: 0.42, delay: 0.65 },
  { from: 0,  to: 4,  speed: 0.28, delay: 0.15 },
  { from: 1,  to: 3,  speed: 0.45, delay: 0.50 },
  { from: 2,  to: 5,  speed: 0.36, delay: 0.80 },
  { from: 3,  to: 6,  speed: 0.33, delay: 0.25 },
  { from: 5,  to: 6,  speed: 0.40, delay: 0.70 },
  { from: 0,  to: 7,  speed: 0.35, delay: 0.10 },
  { from: 0,  to: 8,  speed: 0.30, delay: 0.45 },
  { from: 0,  to: 9,  speed: 0.37, delay: 0.60 },
  { from: 0,  to: 10, speed: 0.34, delay: 0.90 },
  { from: 8,  to: 1,  speed: 0.43, delay: 0.20 },
  { from: 9,  to: 2,  speed: 0.39, delay: 0.55 },
  { from: 10, to: 6,  speed: 0.31, delay: 0.75 },
];

function GraphScene() {
  const groupRefs    = useRef([]);
  const innerRefs    = useRef([]);
  const glowRefs     = useRef([]);
  const lineRefs     = useRef([]);
  const particleRefs = useRef([]);

  const nodePos = useRef(NODES.map(n => new THREE.Vector3(...n.base)));
  const tmp     = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    NODES.forEach((node, i) => {
      const ph = i * 1.31;
      nodePos.current[i].set(
        node.base[0] + Math.sin(t * 0.52 + ph)       * 0.12,
        node.base[1] + Math.cos(t * 0.40 + ph)       * 0.15,
        node.base[2] + Math.sin(t * 0.31 + ph + 1.6) * 0.06,
      );
      if (groupRefs.current[i]) groupRefs.current[i].position.copy(nodePos.current[i]);

      const pulse = 1 + Math.sin(t * 1.1 + ph) * 0.035;
      if (innerRefs.current[i]) innerRefs.current[i].scale.setScalar(pulse);

      const glowPulse = 1 + Math.sin(t * 1.1 + ph) * 0.07;
      if (glowRefs.current[i]) glowRefs.current[i].scale.setScalar(glowPulse);
    });

    EDGES.forEach(([from, to], i) => {
      const line = lineRefs.current[i];
      if (!line?.geometry?.attributes?.position) return;
      const pos = line.geometry.attributes.position;
      const fp  = nodePos.current[from];
      const tp  = nodePos.current[to];
      pos.setXYZ(0, fp.x, fp.y, fp.z);
      pos.setXYZ(1, tp.x, tp.y, tp.z);
      pos.needsUpdate = true;
    });

    PARTICLES.forEach((p, i) => {
      const mesh = particleRefs.current[i];
      if (!mesh) return;
      const progress = ((t * p.speed + p.delay) % 1.0);
      const fade = progress < 0.85
        ? Math.min(1, progress * 8)
        : (1 - progress) / 0.15;
      tmp.current.lerpVectors(nodePos.current[p.from], nodePos.current[p.to], progress);
      mesh.position.copy(tmp.current);
      mesh.material.opacity = Math.max(0, fade) * 0.95;
    });
  });

  return (
    <>
      {/* ── Edges ── */}
      {EDGES.map(([from, to], i) => (
        <line key={`edge-${i}`} ref={el => { lineRefs.current[i] = el; }}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...NODES[from].base, ...NODES[to].base])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={NODES[from].color} transparent opacity={0.22} />
        </line>
      ))}

      {/* ── Flowing particles ── */}
      {PARTICLES.map((p, i) => (
        <mesh key={`p-${i}`} ref={el => { particleRefs.current[i] = el; }}>
          <sphereGeometry args={[0.034, 8, 8]} />
          <meshBasicMaterial color={NODES[p.from].color} transparent opacity={0} />
        </mesh>
      ))}

      {/* ── Nodes ── */}
      {NODES.map((node, i) => (
        <group
          key={node.label}
          ref={el => { groupRefs.current[i] = el; }}
          position={node.base}
        >
          {/* Outer glow halo */}
          <mesh ref={el => { glowRefs.current[i] = el; }}>
            <sphereGeometry args={[node.r * 1.55, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.09}
              depthWrite={false}
            />
          </mesh>

          {/* Core sphere — smooth 32×32 */}
          <mesh ref={el => { innerRefs.current[i] = el; }}>
            <sphereGeometry args={[node.r, 32, 32]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.50}
              roughness={0.10}
              metalness={0.20}
              transparent
              opacity={0.93}
            />
          </mesh>

          {/* Torus ring marks the hub */}
          {i === 0 && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[node.r + 0.11, 0.013, 12, 64]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.50} />
            </mesh>
          )}

          <Text
            position={[0, -(node.r + 0.21), 0]}
            fontSize={0.088}
            color="#9a8a7a"
            anchorX="center"
            anchorY="top"
            letterSpacing={0.02}
          >
            {node.label}
          </Text>

          <pointLight color={node.color} intensity={0.9} distance={3.0} decay={2} />
        </group>
      ))}
    </>
  );
}

export default function HeroOrbs() {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 7.5], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
    >
      <ambientLight intensity={0.50} color="#ffe8cc" />
      <pointLight position={[2.5,  3,   3]} color="#ff6b35" intensity={2.8} distance={16} decay={2} />
      <pointLight position={[-2,  -2,   2]} color="#4466cc" intensity={0.7} distance={10} decay={2} />
      <pointLight position={[0,    0,   4]} color="#ffffff" intensity={0.4} distance={12} decay={2} />

      <Suspense fallback={null}>
        <GraphScene />
      </Suspense>
    </Canvas>
  );
}
