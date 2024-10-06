import React, { useRef } from "react";
import * as THREE from 'three';
import { useGLTF } from "@react-three/drei";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export function Slippers(props) {
  const { nodes, materials } = useGLTF("/room-optimize-small.glb");
  const gltf = useLoader(GLTFLoader, '/room-optimize-small.glb')
  console.log(nodes)
  console.log(materials)
  return (
    <primitive
    object={gltf.scene}
    position={[0, 1, 0]}
    children-0-castShadow
  />
    // <group {...props} dispose={null}>
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.soleUpper.geometry}
    //     material={materials.soleUpper}
    //     scale={0.799}
    //   />
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.strap1.geometry}
    //     material={materials.strap}
    //     position={[-0.546, 0.751, 0.017]}
    //     rotation={[1.364, -0.4, -1.635]}
    //     scale={0.629}
    //   />
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.strap2.geometry}
    //     material={materials.strap}
    //     position={[0.922, 0.394, 0.017]}
    //     rotation={[1.364, -0.4, -1.635]}
    //     scale={[0.726, 0.59, 0.387]}
    //   />
    //   <mesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.soleBottom.geometry}
    //     material={materials.soleBottom}
    //     scale={0.799}
    //   />
    // </group>
  );
}

useGLTF.preload("/room-optimize-small.glb");
