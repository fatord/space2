import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

interface PlanetProps {
  name: string;
  position: [number, number, number];
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  timeSpeed: number;
  onClick: (name: string) => void;
  showOrbits: boolean;
}

export default function Planet({ 
  name, 
  position, 
  size, 
  color, 
  orbitRadius, 
  orbitSpeed, 
  timeSpeed,
  onClick,
  showOrbits 
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const orbitRef = useRef<THREE.Line>(null);
  
  // Create procedural texture for now (replace with actual textures later)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    // Create a gradient based on planet color
    const gradient = context.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, color);
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 256);
    
    // Add some surface details
    context.fillStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const radius = Math.random() * 10;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color]);

  // Update material with texture
  useEffect(() => {
    if (materialRef.current && texture) {
      materialRef.current.map = texture;
      materialRef.current.needsUpdate = true;
    }
  }, [texture]);

  // Create orbit path
  const orbitGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [orbitRadius]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * timeSpeed;
      
      // Orbital motion
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      
      // Planet rotation
      meshRef.current.rotation.y += 0.01 * timeSpeed;
    }
  });

  return (
    <group>
      {/* Orbit path */}
      {showOrbits && (
        <line ref={orbitRef} geometry={orbitGeometry}>
          <lineBasicMaterial color="#444" transparent opacity={0.3} />
        </line>
      )}
      
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => onClick(name)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          ref={materialRef}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}