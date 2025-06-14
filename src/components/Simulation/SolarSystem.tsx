import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";

interface SolarSystemProps {
  onPlanetSelect: (planet: string) => void;
  timeSpeed: number;
  showOrbits: boolean;
  starDensity: number;
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#FDB813" 
        emissive="#FDB813"
        emissiveIntensity={0.3}
      />
      <pointLight position={[0, 0, 0]} intensity={2} distance={100} />
    </mesh>
  );
}

export default function SolarSystem({ 
  onPlanetSelect, 
  timeSpeed, 
  showOrbits, 
  starDensity 
}: SolarSystemProps) {
  const planets = [
    { 
      name: "Mercury", 
      size: 0.15, 
      color: "#8C7853", 
      orbitRadius: 3, 
      orbitSpeed: 0.8 
    },
    { 
      name: "Venus", 
      size: 0.25, 
      color: "#FFC649", 
      orbitRadius: 4, 
      orbitSpeed: 0.6 
    },
    { 
      name: "Earth", 
      size: 0.3, 
      color: "#6B93D6", 
      orbitRadius: 5, 
      orbitSpeed: 0.5 
    },
    { 
      name: "Mars", 
      size: 0.2, 
      color: "#CD5C5C", 
      orbitRadius: 6.5, 
      orbitSpeed: 0.4 
    },
    { 
      name: "Jupiter", 
      size: 0.7, 
      color: "#D8CA9D", 
      orbitRadius: 9, 
      orbitSpeed: 0.2 
    },
    { 
      name: "Saturn", 
      size: 0.6, 
      color: "#FAD5A5", 
      orbitRadius: 12, 
      orbitSpeed: 0.15 
    },
    { 
      name: "Uranus", 
      size: 0.4, 
      color: "#4FD0E7", 
      orbitRadius: 15, 
      orbitSpeed: 0.1 
    },
    { 
      name: "Neptune", 
      size: 0.4, 
      color: "#4B70DD", 
      orbitRadius: 18, 
      orbitSpeed: 0.08 
    }
  ];

  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
      <ambientLight intensity={0.2} />
      
      {/* Enhanced starfield */}
      <Stars 
        radius={300} 
        depth={60} 
        count={starDensity * 1000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Sun */}
      <Sun />

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          name={planet.name}
          position={[planet.orbitRadius, 0, 0]}
          size={planet.size}
          color={planet.color}
          orbitRadius={planet.orbitRadius}
          orbitSpeed={planet.orbitSpeed}
          timeSpeed={timeSpeed}
          onClick={onPlanetSelect}
          showOrbits={showOrbits}
        />
      ))}

      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
    </Canvas>
  );
}