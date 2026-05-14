import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Room      from './Room.jsx';
import Desk      from './Desk.jsx';
import Bookshelf from './Bookshelf.jsx';
import SkillOrbs from './SkillOrbs.jsx';
import Particles from './Particles.jsx';
import Effects   from './Effects.jsx';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 3.2, 8.5], fov: 55, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      style={{ background: '#0a0704', position: 'absolute', inset: 0 }}
      dpr={1}
    >
      <fog attach="fog" args={['#0a0704', 20, 45]} />

      {/* Strong ambient so walls are visible */}
      <ambientLight intensity={0.7} color="#ffe8cc" />

      {/* Main ceiling fill */}
      <pointLight position={[0, 9, 0]}   color="#fff5e0" intensity={5}   distance={25} decay={2} />
      <pointLight position={[0, 6, 6]}   color="#ffd8a0" intensity={2.5} distance={18} decay={2} />

      {/* Back wall accent — illuminates the name text */}
      <pointLight position={[0, 5, -6]}  color="#ff6b35" intensity={3}   distance={10} decay={2} />

      {/* Left fill for bookshelf */}
      <pointLight position={[-8, 5, -2]} color="#ff9944" intensity={3}   distance={9}  decay={2} />

      {/* Right side warm fill */}
      <pointLight position={[8, 4, 0]}   color="#ffd0a0" intensity={1.8} distance={12} decay={2} />

      {/* Cool window light */}
      <directionalLight position={[-6, 6, 3]} color="#4466cc" intensity={0.4} />

      <Suspense fallback={null}>
        <Room />
        <Desk />
        <Bookshelf />
        <SkillOrbs />
        <Particles />
        <Effects />
      </Suspense>

      <OrbitControls
        target={[0, 3, 0]}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.15}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        rotateSpeed={0.45}
        makeDefault
      />
    </Canvas>
  );
}
