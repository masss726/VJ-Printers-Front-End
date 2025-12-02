import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Simple component that loads a GLB model and applies a color tint
function Model({ url, color, rotationDeg }) {
  const { scene } = useGLTF(url, true);
  const ref = useRef();

  // apply color to all mesh materials
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        try {
          if (child.material.color) child.material.color.set(color);
          if (child.material.emissive) child.material.emissive.set('#000000');
          child.material.needsUpdate = true;
        } catch (e) {
          // ignore
        }
      }
    });
  }, [scene, color]);

  // set initial rotation
  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.y = (rotationDeg * Math.PI) / 180;
  }, [rotationDeg]);

  // small idle rotation animation
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0005;
  });

  return <primitive ref={ref} object={scene} position={[0, -0.6, 0]} />;
}

export default function MugViewer({ modelPath = '/models/mug.glb', color = '#ff6b6b', rotation = 0 }) {
  return (
    <div className="viewer-3d" style={{ width: '100%', height: '400px', borderRadius: 12, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0.6, 2.2], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Model url={modelPath} color={color} rotationDeg={rotation} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
