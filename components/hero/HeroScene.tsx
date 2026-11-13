"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// A loose clump of glossy pieces held together by a pull toward the centre.
// The pointer is an invisible ball that shoves them around.

type Shape = "ring" | "pill" | "cube";
const PALETTE = [
  { color: "#ff4f1f", roughness: 0.18 },
  { color: "#f3f1ec", roughness: 0.12 },
  { color: "#151515", roughness: 0.08 },
];
const SHAPES: Shape[] = ["ring", "pill", "cube"];
const COUNT = 44;

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function Piece({ i }: { i: number }) {
  const body = useRef<RapierRigidBody>(null);
  const pull = useMemo(() => new THREE.Vector3(), []);
  const shape = SHAPES[i % SHAPES.length];
  const look = PALETTE[Math.floor(rand(i + 1) * PALETTE.length)];
  const start = useMemo<[number, number, number]>(
    () => [(rand(i * 3) - 0.5) * 12, (rand(i * 3 + 1) - 0.5) * 8, (rand(i * 3 + 2) - 0.5) * 6 - 2],
    [i],
  );
  const scale = 0.9 + rand(i * 7) * 0.6;

  useFrame((_, dt) => {
    const b = body.current;
    if (!b) return;
    const k = Math.min(dt, 0.05) * 60;
    const t = b.translation();
    pull.set(-t.x, -t.y * 1.6, -t.z).multiplyScalar(0.4 * k * scale);
    b.applyImpulse(pull, true);
  });

  const material = (
    <meshPhysicalMaterial color={look.color} roughness={look.roughness} metalness={0.05} clearcoat={1} clearcoatRoughness={0.15} />
  );

  return (
    <RigidBody
      ref={body}
      position={start}
      rotation={[rand(i) * 6, rand(i + 9) * 6, 0]}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      colliders="hull"
      scale={scale}
    >
      {shape === "ring" && (
        <mesh castShadow>
          <torusGeometry args={[0.62, 0.28, 32, 64]} />
          {material}
        </mesh>
      )}
      {shape === "pill" && (
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.36, 0.9, 12, 32]} />
          {material}
        </mesh>
      )}
      {shape === "cube" && (
        <RoundedBox args={[0.95, 0.95, 0.95]} radius={0.22} smoothness={6} castShadow>
          {material}
        </RoundedBox>
      )}
    </RigidBody>
  );
}

function Pointer() {
  const body = useRef<RapierRigidBody>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport }) => {
    target.lerp({ x: (pointer.x * viewport.width) / 2, y: (pointer.y * viewport.height) / 2, z: 0 } as THREE.Vector3, 0.25);
    body.current?.setNextKinematicTranslation(target);
  });
  return (
    <RigidBody ref={body} type="kinematicPosition" colliders={false} position={[0, 0, 0]}>
      <BallCollider args={[1.1]} />
    </RigidBody>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 11.5], fov: 32, near: 1, far: 60 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <color attach="background" args={["#0e0e0f"]} />
      <ambientLight intensity={0.6} />
      <spotLight position={[20, 20, 25]} penumbra={1} angle={0.25} intensity={60} decay={1} color="#ffffff" />
      <directionalLight position={[-8, -6, 4]} intensity={1.2} color="#ff8a5c" />
      <Physics gravity={[0, 0, 0]} timeStep="vary">
        <Pointer />
        {Array.from({ length: COUNT }, (_, i) => (
          <Piece key={i} i={i} />
        ))}
      </Physics>
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" intensity={2} color="#ff4f1f" rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={3} />
          <Lightformer form="rect" intensity={3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 2, 1]} />
        </group>
      </Environment>
    </Canvas>
  );
}
