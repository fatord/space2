
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  name: string;
  onClick: (name: string) => void;
}

function Planet({ position, size, color, orbitRadius, orbitSpeed, name, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      meshRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onClick(name)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#444" transparent opacity={0.3} />
    </line>
  );
}

interface SolarSystemProps {
  onPlanetSelect: (planet: string) => void;
}

export default function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const planets = [
    { name: "Mercury", size: 0.2, color: "#8C7853", orbitRadius: 3, orbitSpeed: 0.8 },
    { name: "Venus", size: 0.3, color: "#FFC649", orbitRadius: 4, orbitSpeed: 0.6 },
    { name: "Earth", size: 0.35, color: "#6B93D6", orbitRadius: 5, orbitSpeed: 0.5 },
    { name: "Mars", size: 0.25, color: "#CD5C5C", orbitRadius: 6.5, orbitSpeed: 0.4 },
    { name: "Jupiter", size: 0.8, color: "#D8CA9D", orbitRadius: 9, orbitSpeed: 0.2 },
    { name: "Saturn", size: 0.7, color: "#FAD5A5", orbitRadius: 12, orbitSpeed: 0.15 },
    { name: "Uranus", size: 0.5, color: "#4FD0E7", orbitRadius: 15, orbitSpeed: 0.1 },
    { name: "Neptune", size: 0.5, color: "#4B70DD", orbitRadius: 18, orbitSpeed: 0.08 }
  ];

  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>

      {/* Orbit rings */}
      {planets.map((planet) => (
        <OrbitRing key={`orbit-${planet.name}`} radius={planet.orbitRadius} />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          position={[planet.orbitRadius, 0, 0]}
          size={planet.size}
          color={planet.color}
          orbitRadius={planet.orbitRadius}
          orbitSpeed={planet.orbitSpeed}
          name={planet.name}
          onClick={onPlanetSelect}
        />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}
