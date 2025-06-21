import React, { useRef, useMemo } from "react";
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
  showLabels: boolean;
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
  showOrbits,
  showLabels
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Line>(null);
  const labelRef = useRef<THREE.Sprite>(null);
  
  // Enhanced procedural texture generation
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Create planet-specific textures
    const createPlanetTexture = (planetName: string) => {
      switch (planetName.toLowerCase()) {
        case 'mercury':
          // Gray, cratered surface
          const mercuryGradient = context.createRadialGradient(512, 256, 0, 512, 256, 512);
          mercuryGradient.addColorStop(0, '#8C7853');
          mercuryGradient.addColorStop(0.5, '#A0906B');
          mercuryGradient.addColorStop(1, '#6B5D42');
          context.fillStyle = mercuryGradient;
          context.fillRect(0, 0, 1024, 512);
          
          // Add craters
          for (let i = 0; i < 100; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 15 + 2;
            context.fillStyle = 'rgba(0,0,0,0.3)';
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
          }
          break;
          
        case 'venus':
          // Thick atmosphere, yellowish
          const venusGradient = context.createLinearGradient(0, 0, 1024, 512);
          venusGradient.addColorStop(0, '#FFC649');
          venusGradient.addColorStop(0.3, '#FFD700');
          venusGradient.addColorStop(0.7, '#FFA500');
          venusGradient.addColorStop(1, '#FF8C00');
          context.fillStyle = venusGradient;
          context.fillRect(0, 0, 1024, 512);
          
          // Add cloud patterns
          for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const width = Math.random() * 100 + 50;
            const height = Math.random() * 20 + 10;
            context.fillStyle = 'rgba(255,255,255,0.1)';
            context.fillRect(x, y, width, height);
          }
          break;
          
        case 'earth':
          // Blue oceans and green/brown continents
          context.fillStyle = '#4A90E2';
          context.fillRect(0, 0, 1024, 512);
          
          // Add continents
          context.fillStyle = '#228B22';
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const width = Math.random() * 200 + 100;
            const height = Math.random() * 150 + 75;
            context.fillRect(x, y, width, height);
          }
          
          // Add clouds
          context.fillStyle = 'rgba(255,255,255,0.3)';
          for (let i = 0; i < 30; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 30 + 10;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
          }
          break;
          
        case 'mars':
          // Red, dusty surface
          const marsGradient = context.createRadialGradient(512, 256, 0, 512, 256, 512);
          marsGradient.addColorStop(0, '#CD5C5C');
          marsGradient.addColorStop(0.5, '#A0522D');
          marsGradient.addColorStop(1, '#8B4513');
          context.fillStyle = marsGradient;
          context.fillRect(0, 0, 1024, 512);
          
          // Add polar ice caps
          context.fillStyle = 'rgba(255,255,255,0.8)';
          context.fillRect(0, 0, 1024, 50);
          context.fillRect(0, 462, 1024, 50);
          break;
          
        case 'jupiter':
          // Gas giant with bands
          const bands = ['#D2691E', '#CD853F', '#DEB887', '#F4A460', '#D2691E'];
          const bandHeight = 512 / bands.length;
          bands.forEach((color, index) => {
            context.fillStyle = color;
            context.fillRect(0, index * bandHeight, 1024, bandHeight);
          });
          
          // Add Great Red Spot
          context.fillStyle = '#B22222';
          context.beginPath();
          context.ellipse(700, 300, 80, 40, 0, 0, Math.PI * 2);
          context.fill();
          break;
          
        case 'saturn':
          // Similar to Jupiter but lighter
          const saturnBands = ['#FAD5A5', '#DEB887', '#D2B48C', '#BC9A6A'];
          const saturnBandHeight = 512 / saturnBands.length;
          saturnBands.forEach((color, index) => {
            context.fillStyle = color;
            context.fillRect(0, index * saturnBandHeight, 1024, saturnBandHeight);
          });
          break;
          
        case 'uranus':
          // Ice giant, blue-green
          const uranusGradient = context.createRadialGradient(512, 256, 0, 512, 256, 512);
          uranusGradient.addColorStop(0, '#4FD0E7');
          uranusGradient.addColorStop(0.5, '#40B5CC');
          uranusGradient.addColorStop(1, '#2E8B9B');
          context.fillStyle = uranusGradient;
          context.fillRect(0, 0, 1024, 512);
          break;
          
        case 'neptune':
          // Deep blue ice giant
          const neptuneGradient = context.createRadialGradient(512, 256, 0, 512, 256, 512);
          neptuneGradient.addColorStop(0, '#4B70DD');
          neptuneGradient.addColorStop(0.5, '#4169E1');
          neptuneGradient.addColorStop(1, '#191970');
          context.fillStyle = neptuneGradient;
          context.fillRect(0, 0, 1024, 512);
          
          // Add storm features
          context.fillStyle = 'rgba(255,255,255,0.2)';
          for (let i = 0; i < 10; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 20 + 5;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
          }
          break;
          
        default:
          // Default gradient
          const defaultGradient = context.createLinearGradient(0, 0, 1024, 512);
          defaultGradient.addColorStop(0, color);
          defaultGradient.addColorStop(0.5, '#ffffff');
          defaultGradient.addColorStop(1, color);
          context.fillStyle = defaultGradient;
          context.fillRect(0, 0, 1024, 512);
      }
    };
    
    createPlanetTexture(name);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [name, color]);

  // Create orbit path with higher resolution
  const orbitGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [orbitRadius]);

  // Create label sprite
  const labelTexture = useMemo(() => {
    if (!showLabels) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const context = canvas.getContext('2d')!;
    
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, 256, 64);
    
    context.fillStyle = 'white';
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.fillText(name, 128, 40);
    
    return new THREE.CanvasTexture(canvas);
  }, [name, showLabels]);

  useFrame((state) => {
    if (meshRef.current && timeSpeed > 0) {
      const time = state.clock.getElapsedTime() * timeSpeed;
      
      // Orbital motion
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      
      // Planet rotation (faster than orbital motion)
      meshRef.current.rotation.y += 0.02 * timeSpeed;
    }
    
    // Update label position
    if (labelRef.current && meshRef.current && showLabels) {
      labelRef.current.position.copy(meshRef.current.position);
      labelRef.current.position.y += size + 0.5;
    }
  });

  return (
    <group>
      {/* Orbit path */}
      {showOrbits && (
        <line ref={orbitRef} geometry={orbitGeometry}>
          <lineBasicMaterial 
            color="#444" 
            transparent 
            opacity={0.4}
            linewidth={2}
          />
        </line>
      )}
      
      {/* Planet */}
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick(name);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[size, 64, 32]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.8}
          metalness={0.1}
          emissive={name === 'Sun' ? new THREE.Color(0x332200) : new THREE.Color(0x000000)}
          emissiveIntensity={name === 'Sun' ? 0.2 : 0}
        />
      </mesh>
      
      {/* Planet label */}
      {showLabels && labelTexture && (
        <sprite ref={labelRef} scale={[2, 0.5, 1]}>
          <spriteMaterial map={labelTexture} transparent />
        </sprite>
      )}
    </group>
  );
}