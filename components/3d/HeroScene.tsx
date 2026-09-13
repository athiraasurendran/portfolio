'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { NeuralLattice } from './NeuralLattice';

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setWebglOk(detectWebGL());
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setLowPower(window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4);
    setReady(true);
  }, []);

  if (!ready) return <div className="h-full w-full" aria-hidden />;

  if (!webglOk || reduceMotion) {
    return <StaticFallback />;
  }

  return (
    <Canvas
      dpr={lowPower ? [1, 1.25] : [1, 2]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'low-power' }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <NeuralLattice reduceMotion={reduceMotion} lowPower={lowPower} />
      </Suspense>
    </Canvas>
  );
}

function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <svg viewBox="0 0 400 300" className="h-full w-full max-w-md opacity-70">
        {Array.from({ length: 4 }).map((_, layer) =>
          Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={`${layer}-${i}`}
              cx={60 + layer * 100}
              cy={40 + i * 55}
              r={4}
              fill="#e4c896"
              opacity={0.8}
            />
          ))
        )}
        {Array.from({ length: 3 }).map((_, layer) =>
          Array.from({ length: 5 }).map((_, a) =>
            Array.from({ length: 5 }).map((_, b) => (
              <line
                key={`${layer}-${a}-${b}`}
                x1={60 + layer * 100}
                y1={40 + a * 55}
                x2={60 + (layer + 1) * 100}
                y2={40 + b * 55}
                stroke="#8c7550"
                strokeWidth={0.5}
                opacity={0.3}
              />
            ))
          )
        )}
      </svg>
    </div>
  );
}
