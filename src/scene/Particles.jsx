import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 55;

export default function Particles() {
  const mesh = useRef();
  const frame = useRef(0);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds    = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speeds[i]             = 0.003 + Math.random() * 0.006;
    }
    return { positions, speeds };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(() => {
    /* update every other frame to halve CPU cost */
    if ((frame.current++ % 2) !== 0) return;
    const arr = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i];
      if (arr[i * 3 + 1] > 9) {
        arr[i * 3 + 1] = 0;
        arr[i * 3]     = (Math.random() - 0.5) * 18;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geo}>
      <pointsMaterial
        color="#ff8844"
        size={0.035}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
