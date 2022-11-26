import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js'
import * as THREE from 'three'
// console.log(THREE.CineonToneMapping)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Canvas
  flat
  dpr={1}
  gl={{
    antialias: false,
    toneMapping: THREE.ACESFilmicToneMapping,
    outputEncoding: THREE.LinearEncoding
  }}
    orthographic
    camera={{
      fov: 45,
      near: 0.1,
      zoom: 100,
      far: 200,
      position: [3,2,6]
    }}
  >
    <Experience />
  </Canvas>
);
