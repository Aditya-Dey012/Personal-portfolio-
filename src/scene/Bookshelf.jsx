import { useState } from 'react';
import { Text } from '@react-three/drei';
import { skills } from '../data/portfolio.js';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CATEGORIES = Object.keys(skills);

/* Muted, professional book colors — no rainbow */
const BOOK_COLORS = ['#7a3a1a', '#4a3a6a', '#1a4a3a', '#5a3a10', '#3a3a6a'];

function Book({ title, color, position, rotation, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Book body */}
      <mesh castShadow>
        <boxGeometry args={[0.19, 0.58, 0.13]} />
        <meshStandardMaterial
          color={hovered ? color : '#1e1208'}
          roughness={0.75}
          metalness={0.05}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.0}
        />
      </mesh>

      {/* Spine accent stripe */}
      <mesh position={[0, 0, 0.066]}>
        <boxGeometry args={[0.19, 0.58, 0.002]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.15}
        />
      </mesh>

      {/* Spine label using Three.js Text — no Dom bleeding */}
      <Text
        position={[0, 0, 0.07]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={0.065}
        color={hovered ? '#ffffff' : '#aa9988'}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.55}
      >
        {title}
      </Text>
    </group>
  );
}

function ShelfBoard({ position }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[2.0, 0.06, 0.42]} />
      <meshStandardMaterial color="#1a1008" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

export default function Bookshelf() {
  return (
    <group position={[-8.5, 0, -3]}>
      {/* Back panel */}
      <mesh position={[0.05, 3.5, -0.16]}>
        <boxGeometry args={[0.08, 7.0, 1.95]} />
        <meshStandardMaterial color="#120a04" roughness={0.9} />
      </mesh>

      {/* Side caps */}
      {[-1, 1].map((s, i) => (
        <mesh key={i} position={[0.05, s * 3.3 + 0.2, 0]}>
          <boxGeometry args={[0.08, 0.15, 1.95]} />
          <meshStandardMaterial color="#1e1208" roughness={0.8} />
        </mesh>
      ))}

      {/* Shelf levels */}
      <ShelfBoard position={[0.05, 1.1, 0]} />
      <ShelfBoard position={[0.05, 2.5, 0]} />
      <ShelfBoard position={[0.05, 3.9, 0]} />
      <ShelfBoard position={[0.05, 5.3, 0]} />
      <ShelfBoard position={[0.05, 6.65, 0]} />

      {/* Books — 2 per row, 3 rows */}
      {CATEGORIES.map((cat, i) => {
        const row  = Math.floor(i / 2);
        const col  = i % 2;
        const baseY = 1.5 + row * 1.4;
        const baseZ = col * 0.55 - 0.3;

        return (
          <Book
            key={cat}
            title={cat}
            color={BOOK_COLORS[i % BOOK_COLORS.length]}
            position={[0.1, baseY, baseZ]}
            rotation={[0, Math.PI / 2, 0]}
            onClick={() => scrollTo('skills')}
          />
        );
      })}

      {/* Label */}
      <Text
        position={[0.12, 6.3, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.18}
        color="#ff6b35"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        SKILLS
      </Text>
    </group>
  );
}
