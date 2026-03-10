"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </Sphere>

            <Sphere args={[1.2, 32, 32]}>
                <MeshDistortMaterial
                    color="#38bdf8"
                    attach="material"
                    distort={0.5}
                    speed={3}
                    roughness={0.5}
                    metalness={0.5}
                    transparent={true}
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
}

export default function ThreeDModel() {
    return (
        <div className="relative w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#2dd4bf" />
                <directionalLight position={[90, 90, 10]} intensity={1.5} color="#c084fc" />
                <directionalLight position={[-90, -90, -10]} intensity={1} color="#2dd4bf" />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}
