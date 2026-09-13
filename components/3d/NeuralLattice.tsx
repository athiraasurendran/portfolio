'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type LatticeProps = {
  reduceMotion: boolean;
  lowPower: boolean;
};

// Layer sizes evoke an actual small neural network: input -> hidden -> hidden -> output.
const LAYER_SIZES_FULL = [5, 8, 8, 3];
const LAYER_SIZES_LOW = [4, 5, 5, 2];
const LAYER_SPACING = 2.6;

function buildNodes(layerSizes: number[], seed: number) {
  const layers: THREE.Vector3[][] = [];
  let s = seed;
  const rand = () => {
    // deterministic pseudo-random so the layout doesn't reshuffle on re-render
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  layerSizes.forEach((count, layerIndex) => {
    const nodes: THREE.Vector3[] = [];
    const x = (layerIndex - (layerSizes.length - 1) / 2) * LAYER_SPACING;
    for (let i = 0; i < count; i++) {
      const spread = 1.9;
      const y = (i - (count - 1) / 2) * (spread / Math.max(count - 1, 1)) * 2 + (rand() - 0.5) * 0.25;
      const z = (rand() - 0.5) * 1.1;
      nodes.push(new THREE.Vector3(x, y, z));
    }
    layers.push(nodes);
  });

  return layers;
}

function buildEdges(layers: THREE.Vector3[][]) {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const a = layers[l]!;
    const b = layers[l + 1]!;
    a.forEach((na) => {
      b.forEach((nb) => {
        edges.push([na, nb]);
      });
    });
  }
  return edges;
}

export function NeuralLattice({ reduceMotion, lowPower }: LatticeProps) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  const layerSizes = lowPower ? LAYER_SIZES_LOW : LAYER_SIZES_FULL;
  const layers = useMemo(() => buildNodes(layerSizes, 42), [layerSizes]);
  const edges = useMemo(() => buildEdges(layers), [layers]);
  const allNodes = useMemo(() => layers.flat(), [layers]);

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6 + 0] = a.x;
      positions[i * 6 + 1] = a.y;
      positions[i * 6 + 2] = a.z;
      positions[i * 6 + 3] = b.x;
      positions[i * 6 + 4] = b.y;
      positions[i * 6 + 5] = b.z;
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [edges]);

  const nodeGeometry = useMemo(() => {
    const positions = new Float32Array(allNodes.length * 3);
    allNodes.forEach((n, i) => {
      positions[i * 3 + 0] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [allNodes]);

  // A handful of "signal" pulses traveling along random edges — the flowing-data motif.
  const pulseCount = lowPower ? 0 : reduceMotion ? 0 : 5;
  const pulses = useRef(
    Array.from({ length: pulseCount }, () => ({
      edgeIndex: Math.floor(Math.random() * Math.max(edges.length, 1)),
      t: Math.random(),
      speed: 0.15 + Math.random() * 0.15,
    }))
  );
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (!reduceMotion) {
      group.current.rotation.y += delta * 0.06;
      // Mouse-reactive tilt, smoothly lerped so it never feels jerky.
      target.current.x = (state.pointer.y * Math.PI) / 32;
      target.current.y += (state.pointer.x * 0.35 - target.current.y) * delta * 0.6;
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.05;
    }

    if (!reduceMotion && pulseCount > 0) {
      pulses.current.forEach((pulse, i) => {
        pulse.t += delta * pulse.speed;
        if (pulse.t > 1) {
          pulse.t = 0;
          pulse.edgeIndex = Math.floor(Math.random() * edges.length);
        }
        const edge = edges[pulse.edgeIndex];
        const mesh = pulseRefs.current[i];
        if (edge && mesh) {
          mesh.position.lerpVectors(edge[0], edge[1], pulse.t);
        }
      });
    }
  });

  const scale = Math.min(viewport.width / 9, 1.15);

  return (
    <group ref={group} scale={scale}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#8c7550" transparent opacity={0.35} />
      </lineSegments>

      <points geometry={nodeGeometry}>
        <pointsMaterial color="#e4c896" size={0.09} sizeAttenuation transparent opacity={0.9} />
      </points>

      {pulses.current.map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#c9a876" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
