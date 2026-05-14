import { useRef, useState } from 'react';
import { Float, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/* Professional muted palette — no rainbow */
const ORBS = [
  { label: 'LangGraph',  position: [-2.5, 5.2, -4.8], color: '#ff6b35', size: 0.21 },
  { label: 'FAISS · RAG', position: [1.2,  6.0, -5.8], color: '#e8a030', size: 0.17 },
  { label: 'FastAPI',    position: [3.8,  5.5, -5.2], color: '#88bbaa', size: 0.16 },
  { label: 'LangChain',  position: [-4.5, 4.8, -5.5], color: '#8899bb', size: 0.19 },
  { label: 'PySpark',    position: [5.5,  4.6, -4.2], color: '#cc9966', size: 0.15 },
  { label: 'MLflow',     position: [-0.5, 4.4, -6.2], color: '#d4b84a', size: 0.14 },
  { label: 'AWS',        position: [2.5,  4.0, -5.0], color: '#e8c87a', size: 0.16 },
];

function Orb({ label, position, color, size }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.35;
    meshRef.current.rotation.x = clock.elapsedTime * 0.18;
  });

  return (
    <Float speed={1.2 + size * 3} rotationIntensity={0.1} floatIntensity={0.5}>
      <group
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {/* Core orb */}
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.55 : 0.28}
            roughness={0.25}
            metalness={0.4}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -(size + 0.18), 0]}
          fontSize={0.11}
          color={hovered ? color : '#8a7a6a'}
          anchorX="center"
          anchorY="top"
        >
          {label}
        </Text>

        {/* Very subtle point glow */}
        <pointLight
          color={color}
          intensity={hovered ? 1.2 : 0.4}
          distance={2}
          decay={2}
        />
      </group>
    </Float>
  );
}

export default function SkillOrbs() {
  return (
    <group>
      {ORBS.map(orb => (
        <Orb key={orb.label} {...orb} />
      ))}
    </group>
  );
}
