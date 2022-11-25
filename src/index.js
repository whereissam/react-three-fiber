import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Canvas>
    <Experience />
  </Canvas>
);
