import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ModelViewer3D({ modelColor = '#FF6B35', modelUrl = '/95f173c3-3c92-4a10-a8cc-2e73c6062475.glb', imageTextureUrl = null }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const imageTextureRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 3);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.autoRotate = false;
      controlsRef.current = controls;

      // Load GLB model
      const loader = new GLTFLoader();
      
      // Load the provided .glb model URL
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          
          // Apply initial color to model meshes, preserving textures if present
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mat = child.material;
              // If the mesh already has a texture map, preserve it and only set color
              if (mat && mat.map) {
                mat.color = new THREE.Color(modelColor);
                mat.metalness = mat.metalness ?? 0.3;
                mat.roughness = mat.roughness ?? 0.6;
                mat.needsUpdate = true;
              } else {
                // No texture: assign a simple standard material with the color
                child.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(modelColor),
                  metalness: 0.3,
                  roughness: 0.6,
                });
              }
            }
          });
          
          scene.add(model);
          modelRef.current = model;

          // If an uploaded image texture URL was provided, try to apply it
          if (imageTextureUrl) {
            const texLoader = new THREE.TextureLoader();
            texLoader.load(
              imageTextureUrl,
              (texture) => {
                // store for cleanup
                if (imageTextureRef.current) imageTextureRef.current.dispose();
                imageTextureRef.current = texture;

                // Attempt to apply texture to a logical target mesh (logo/label/decal)
                const targetNames = ['logo', 'label', 'decal', 'print', 'front', 'body'];
                let applied = false;
                model.traverse((child) => {
                  if (child instanceof THREE.Mesh) {
                    const name = (child.name || '').toLowerCase();
                    if (targetNames.some((n) => name.includes(n))) {
                      if (child.material) {
                        child.material.map = texture;
                        child.material.color = new THREE.Color(modelColor);
                        child.material.needsUpdate = true;
                        applied = true;
                      }
                    }
                  }
                });

                // If no logical target found, apply texture to the first mesh
                if (!applied) {
                  model.traverse((child) => {
                    if (!applied && child instanceof THREE.Mesh) {
                      if (child.material) {
                        child.material.map = texture;
                        child.material.color = new THREE.Color(modelColor);
                        child.material.needsUpdate = true;
                        applied = true;
                      }
                    }
                  });
                }
              },
              undefined,
              (err) => {
                console.error('Failed to load image texture for model:', err);
              }
            );
          }
          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          setIsLoading(false);
          setModelError(null);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setIsLoading(false);
          setModelError('Failed to load 3D model. Please check the model path.');
        }
      );

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        if (controlsRef.current) {
          controlsRef.current.update();
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('Error setting up Three.js:', error);
      setModelError('Error initializing 3D viewer');
      setIsLoading(false);
    }
  }, [modelUrl]);

  // Update color when modelColor changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material;
          if (mat && mat.map) {
            // preserve texture map, just update color tint
            mat.color = new THREE.Color(modelColor);
            mat.needsUpdate = true;
          } else if (mat) {
            // material exists but no map: update color
            mat.color = new THREE.Color(modelColor);
            mat.metalness = mat.metalness ?? 0.3;
            mat.roughness = mat.roughness ?? 0.6;
            mat.needsUpdate = true;
          } else {
            // fallback: create new material
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(modelColor),
              metalness: 0.3,
              roughness: 0.6,
            });
          }
        }
      });
    }
  }, [modelColor]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 3D Viewer */}
      <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-semibold">Loading 3D Model...</p>
            </div>
          </div>
        )}

        {modelError && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">⚠️ Error</p>
              <p className="text-red-500 text-sm">{modelError}</p>
            </div>
          </div>
        )}

        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* No controls - just the 3D viewer */}
    </div>
  );
}

export default ModelViewer3D;
