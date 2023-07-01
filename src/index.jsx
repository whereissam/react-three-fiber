import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { Leva } from 'leva'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({ scene }) =>
{
    scene.background = new THREE.Color('#ff0000')
}

root.render(
    <StrictMode>
        <Leva collapsed />
        <Canvas
            shadows={ false }
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
            // onCreated={ created }
        >
            <color args={ [ '#ff0000' ] } attach="background" />
            <Experience />
        </Canvas>
    </StrictMode>
)