import { useState } from 'react';
import { Text } from '@react-three/drei';
import { experience } from '../data/portfolio.js';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const WORK_PROJECTS = experience.flatMap(e =>
  e.projects.map(p => ({ ...p, company: e.company }))
).slice(0, 3);

const ACCENT = ['#ff6b35', '#c8a000', '#38a860'];

function ProjectCard({ project, position, accent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => scrollTo('experience')}
    >
      {/* Card frame */}
      <mesh castShadow>
        <boxGeometry args={[2.6, 1.7, 0.05]} />
        <meshStandardMaterial
          color={hovered ? '#1e1612' : '#161008'}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Accent top strip */}
      <mesh position={[0, 0.83, 0.028]}>
        <boxGeometry args={[2.6, 0.04, 0.01]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={hovered ? 1.2 : 0.6}
        />
      </mesh>

      {/* Inner screen */}
      <mesh position={[0, 0, 0.028]}>
        <boxGeometry args={[2.44, 1.54, 0.005]} />
        <meshStandardMaterial
          color="#060c14"
          emissive="#020608"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Company label */}
      <Text
        position={[-1.0, 0.62, 0.035]}
        fontSize={0.1}
        color={accent}
        anchorX="left"
        anchorY="middle"
        maxWidth={2.2}
      >
        {project.company.toUpperCase()}
      </Text>

      {/* Project name */}
      <Text
        position={[0, 0.28, 0.035]}
        fontSize={0.18}
        color="#e8d8c0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.3}
        textAlign="center"
      >
        {project.name}
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.08, 0.032]}>
        <boxGeometry args={[2.0, 0.008, 0.002]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>

      {/* Stack line */}
      <Text
        position={[0, -0.08, 0.035]}
        fontSize={0.095}
        color="#6a5a4a"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.3}
        textAlign="center"
      >
        {project.stack.slice(0, 5).join('  ·  ')}
      </Text>

      {/* First bullet */}
      <Text
        position={[0, -0.35, 0.035]}
        fontSize={0.085}
        color="#9a8a78"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        textAlign="center"
      >
        {project.bullets[0].slice(0, 80) + (project.bullets[0].length > 80 ? '…' : '')}
      </Text>

      {/* Hover: click hint */}
      {hovered && (
        <Text
          position={[0, -0.68, 0.038]}
          fontSize={0.1}
          color={accent}
          anchorX="center"
          anchorY="middle"
        >
          ↓  scroll to view full details
        </Text>
      )}

      {/* Glow */}
      <pointLight
        position={[0, 0, 0.6]}
        color={accent}
        intensity={hovered ? 1.2 : 0.3}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}

export default function ProjectWall() {
  return (
    <group position={[0, 0, -7.8]}>
      {WORK_PROJECTS.map((proj, i) => (
        <ProjectCard
          key={proj.name}
          project={proj}
          position={[(i - 1) * 3.1, 5.0, 0.05]}
          accent={ACCENT[i]}
        />
      ))}
    </group>
  );
}
