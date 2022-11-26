import { useThree, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from './CustomObject.js'

extend({ OrbitControls : OrbitControls })

export default function Experience () {

  const { camera, gl } = useThree();
  console.log(camera, gl)

  const cubeRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // console.log(state)
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0,0,0)

    cubeRef.current.rotation.y += 0.01
    // groupRef.current.rotation.y += delta
  })
  return <>
    <orbitControls args={[ camera, gl.domElement ]} />

    <directionalLight position={[1,2,3]} intensity={1.5}/>
    <ambientLight intensity={ 0.5 } />

    <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color='greenyellow' />
    </mesh>
    <group ref={ groupRef }>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>
      <mesh ref={cubeRef} rotation-x={Math.PI * 0.25} position-x={[2]} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color='red' wireframe />
      </mesh>
    </group>
   
   <CustomObject />
  </>
}