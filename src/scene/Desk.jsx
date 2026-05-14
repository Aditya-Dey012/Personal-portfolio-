import { useRef, useState } from 'react';
import { Html, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CODE_LINES = [
  { num: 1,  parts: [{ cls:'code-cm', text:'# aditya_dey.py' }] },
  { num: 2,  parts: [] },
  { num: 3,  parts: [{ cls:'code-kw', text:'from' }, { cls:'code-default', text:' adityaos ' }, { cls:'code-kw', text:'import' }, { cls:'code-fn', text:' AdityadDey' }] },
  { num: 4,  parts: [] },
  { num: 5,  parts: [{ cls:'code-var', text:'engineer' }, { cls:'code-op', text:' = ' }, { cls:'code-fn', text:'AdityadDey' }, { cls:'code-default', text:'(' }] },
  { num: 6,  parts: [{ cls:'code-default', text:'  name     ' }, { cls:'code-op', text:'=' }, { cls:'code-str', text:' "Aditya Dey",' }] },
  { num: 7,  parts: [{ cls:'code-default', text:'  role     ' }, { cls:'code-op', text:'=' }, { cls:'code-str', text:' "Gen AI Engineer",' }] },
  { num: 8,  parts: [{ cls:'code-default', text:'  company  ' }, { cls:'code-op', text:'=' }, { cls:'code-str', text:' "Nexturn",' }] },
  { num: 9,  parts: [{ cls:'code-default', text:'  location ' }, { cls:'code-op', text:'=' }, { cls:'code-str', text:' "Bengaluru, IN",' }] },
  { num: 10, parts: [{ cls:'code-default', text:')' }] },
  { num: 11, parts: [] },
  { num: 12, parts: [{ cls:'code-var', text:'engineer' }, { cls:'code-default', text:'.skills' }, { cls:'code-op', text:' = [' }] },
  { num: 13, parts: [{ cls:'code-str', text:'  "LangGraph",' }] },
  { num: 14, parts: [{ cls:'code-str', text:'  "FAISS + RAG",' }] },
  { num: 15, parts: [{ cls:'code-str', text:'  "FastAPI",' }] },
  { num: 16, parts: [{ cls:'code-str', text:'  "React / Next.js"' }] },
  { num: 17, parts: [{ cls:'code-default', text:']' }] },
  { num: 18, parts: [] },
  { num: 19, parts: [{ cls:'code-fn', text:'print' }, { cls:'code-default', text:'(engineer.hire())' }] },
  { num: 20, parts: [{ cls:'code-cm', text:'# → aditya2002dey@gmail.com' }] },
];

function MonitorScreen() {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => scrollTo('about')}
    >
      {/* Monitor frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.7, 1.7, 0.12]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Screen bezel inner */}
      <mesh position={[0, 0, 0.062]}>
        <boxGeometry args={[2.5, 1.55, 0.01]} />
        <meshStandardMaterial color="#050d15" roughness={0.1} />
      </mesh>

      {/* Screen emissive glow */}
      <mesh position={[0, 0, 0.065]}>
        <boxGeometry args={[2.45, 1.5, 0.005]} />
        <meshStandardMaterial
          color="#001122"
          emissive="#002244"
          emissiveIntensity={hovered ? 0.9 : 0.6}
        />
      </mesh>

      {/* HTML code overlay */}
      <Html
        position={[0, 0, 0.08]}
        transform
        occlude
        style={{ pointerEvents: 'none' }}
        distanceFactor={1}
        zIndexRange={[100, 0]}
      >
        <div className="monitor-html">
          <div className="monitor-topbar">
            <div className="monitor-dot r" />
            <div className="monitor-dot y" />
            <div className="monitor-dot g" />
            <span className="monitor-filename">aditya_dey.py</span>
          </div>
          {CODE_LINES.map(line => (
            <div key={line.num} className="code-line">
              <span className="code-num">{line.num}</span>
              <span>
                {line.parts.map((p, i) => (
                  <span key={i} className={p.cls}>{p.text}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </Html>

      {/* Click hint — pure Three.js, no DOM */}
      {hovered && (
        <Text
          position={[0, -1.1, 0.1]}
          fontSize={0.1}
          color="#ff6b35"
          anchorX="center"
          anchorY="middle"
        >
          ↓  click to scroll to About
        </Text>
      )}

      {/* Monitor stand */}
      <mesh position={[0, -1.05, 0]}>
        <boxGeometry args={[0.15, 0.7, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, -1.42, 0.1]}>
        <boxGeometry args={[0.7, 0.06, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Screen light cast */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#1155aa"
        intensity={hovered ? 2.5 : 1.5}
        distance={4}
        decay={2}
      />
    </group>
  );
}

function DeskLamp() {
  return (
    <group position={[1.1, 0, -0.7]}>
      {/* Base */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.08, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Arm lower */}
      <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.018, 0.018, 0.8, 8]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Arm upper (angled) */}
      <mesh position={[-0.1, 0.95, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.018, 0.018, 0.5, 8]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Lamp shade */}
      <mesh position={[-0.22, 1.12, 0]} rotation={[0, 0, 0.8]}>
        <coneGeometry args={[0.22, 0.3, 12, 1, true]} />
        <meshStandardMaterial
          color="#cc8833"
          roughness={0.6}
          metalness={0.2}
          side={2}
          emissive="#ff8800"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Light bulb glow */}
      <mesh position={[-0.22, 1.08, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#fff8e0"
          emissive="#ffdd80"
          emissiveIntensity={3}
        />
      </mesh>
      {/* Actual point light */}
      <pointLight
        position={[-0.22, 1.0, 0]}
        color="#ff9944"
        intensity={6}
        distance={9}
        decay={2}
      />
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, 0.065, 0.52]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[1.6, 0.04, 0.55]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Key rows */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.72 + col * 0.13, 0.028, -0.18 + row * 0.12]}>
            <boxGeometry args={[0.1, 0.02, 0.1]} />
            <meshStandardMaterial color={row === 0 ? '#252520' : '#1e1e1e'} roughness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
}

function CoffeeMug() {
  const mugRef = useRef();
  useFrame(({ clock }) => {
    if (mugRef.current) {
      mugRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={mugRef} position={[-1.1, 0.07, -0.6]}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.09, 0.18, 12]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.086, 0.086, 0.02, 12]} />
        <meshStandardMaterial color="#1a0800" roughness={1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.13, 0, 0]}>
        <torusGeometry args={[0.07, 0.015, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.6} />
      </mesh>
      {/* Steam particles (simple rods) */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[(i - 1) * 0.025, 0.14 + i * 0.04, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.06 + i * 0.02, 4]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.12 - i * 0.03} />
        </mesh>
      ))}
    </group>
  );
}

export default function Desk() {
  return (
    <group position={[2.2, 1.06, -0.5]}>
      {/* Desktop surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.1, 2.2]} />
        <meshStandardMaterial color="#2a1a08" roughness={0.45} metalness={0.08} />
      </mesh>

      {/* Desk legs */}
      {[[-2.0, -3.5], [-2.0, 0.8], [2.0, -3.5], [2.0, 0.8]].map(([x, z], i) => (
        <mesh key={i} position={[x * 0.48, -0.58, z * 0.3]} castShadow>
          <boxGeometry args={[0.08, 1.12, 0.08]} />
          <meshStandardMaterial color="#1e1208" roughness={0.5} />
        </mesh>
      ))}

      {/* Monitor — positioned above desk */}
      <group position={[0.2, 0.92, -0.6]}>
        <MonitorScreen />
      </group>

      {/* Keyboard */}
      <Keyboard />

      {/* Mouse */}
      <mesh position={[0.95, 0.063, 0.52]}>
        <boxGeometry args={[0.14, 0.04, 0.24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Desk Lamp */}
      <DeskLamp />

      {/* Coffee Mug */}
      <CoffeeMug />

      {/* Sticky note */}
      <mesh position={[-0.9, 0.062, -0.7]} rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[0.35, 0.35]} />
        <meshStandardMaterial color="#f5d800" roughness={0.9} />
      </mesh>
    </group>
  );
}
