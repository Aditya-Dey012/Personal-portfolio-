import { useMemo } from 'react';
import * as THREE from 'three';

function Wall({ position, rotation, size, color = '#100804' }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
    </mesh>
  );
}

function CityWindow() {
  const dotPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 80; i++) {
      pos.push([
        (Math.random() - 0.5) * 2.6,
        (Math.random() - 0.5) * 2.0,
        0.01,
      ]);
    }
    return pos;
  }, []);

  return (
    <group position={[-8.8, 5.2, -0.5]}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[3.2, 2.8, 0.08]} />
        <meshStandardMaterial color="#1a1107" roughness={0.8} metalness={0.3} />
      </mesh>
      {/* Glass pane */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.8, 2.4]} />
        <meshStandardMaterial
          color="#010816"
          emissive="#010d22"
          emissiveIntensity={0.6}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* City lights dots */}
      {dotPositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[Math.random() * 0.025 + 0.008, 4, 4]} />
          <meshStandardMaterial
            color={['#ffe8a0', '#ffaa40', '#a0c8ff', '#ff8080', '#80ffaa'][i % 5]}
            emissive={['#ffe060', '#ff8000', '#6090ff', '#ff4040', '#40ff80'][i % 5]}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rug() {
  return (
    <mesh position={[0.5, 0.005, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.5, 4.5]} />
      <meshStandardMaterial color="#1e1210" roughness={1} />
    </mesh>
  );
}

function CeilingLight() {
  return (
    <group position={[2, 8.85, -1]}>
      <mesh>
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial
          color="#fff9e0"
          emissive="#ffe8a0"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function Plant({ position }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.35, 8]} />
        <meshStandardMaterial color="#3d1f10" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 8]} />
        <meshStandardMaterial color="#1a0d06" roughness={1} />
      </mesh>
      {/* Leaves */}
      {[0, 70, 140, 210, 280].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 0.2 + i * 0.04;
        return (
          <mesh
            key={i}
            position={[Math.sin(rad) * r * 0.7, 0.55 + i * 0.12, Math.cos(rad) * r * 0.7]}
            rotation={[0.3, rad, 0.4]}
          >
            <sphereGeometry args={[0.12 + i * 0.02, 6, 6]} />
            <meshStandardMaterial color="#1a4a1a" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Room() {
  return (
    <group>
      {/* Floor — warm dark wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#1a1008" roughness={0.88} metalness={0.04} />
      </mesh>

      {/* Floor planks — subtle grain */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[i * 1.7 - 9, 0.001, 0]}>
          <planeGeometry args={[0.025, 16]} />
          <meshStandardMaterial color="#100c06" />
        </mesh>
      ))}

      {/* Ceiling */}
      <Wall position={[0, 9.5, 0]}  rotation={[Math.PI / 2, 0, 0]}  size={[20, 16]} color="#0a0804" />

      {/* Back wall — slightly warmer */}
      <Wall position={[0, 4.75, -8]}  rotation={[0, 0, 0]}           size={[20, 9.5]} color="#18120a" />

      {/* Left wall */}
      <Wall position={[-10, 4.75, 0]} rotation={[0,  Math.PI / 2, 0]} size={[16, 9.5]} color="#16100a" />

      {/* Right wall */}
      <Wall position={[10, 4.75, 0]}  rotation={[0, -Math.PI / 2, 0]} size={[16, 9.5]} color="#16100a" />

      {/* City window (left wall) */}
      <CityWindow />

      {/* Window light from outside */}
      <rectAreaLight
        position={[-9.2, 5.2, -0.5]}
        rotation={[0, Math.PI / 2, 0]}
        width={2.8}
        height={2.4}
        color="#2244aa"
        intensity={3}
      />

      {/* Rug */}
      <Rug />

      {/* Ceiling recessed light */}
      <CeilingLight />

      {/* Corner plants */}
      <Plant position={[-8.5, 0, -6.5]} />
      <Plant position={[8, 0, -6.5]} />
    </group>
  );
}
