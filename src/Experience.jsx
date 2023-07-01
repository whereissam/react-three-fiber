import { Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, Stars, CameraShake, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef, } from 'react'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
    console.log(AccumulativeShadows)
    const directionalLight = useRef()
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    // const { position, color, visible } = useControls('sphere', {
    //     position:
    //     {
    //         value: { x: - 2, y: 0 },
    //         min: - 4,
    //         max: 4,
    //         step: 0.01,
    //         joystick: 'invertY',
    //     },
    //     color: 'orange',
    //     visible: true,
    //     myInterval:
    //     {
    //         min: 0,
    //         max: 10,
    //         value: [4, 5],
    //     },
    //     clickMe: button(() => { console.log('ok') }),
    //     choice: { options: [ 'a', 'b', 'c' ] }
    // })

    const { scale } = useControls('cube', {
        scale:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    const { perfVisible } = useControls({
        perfVisible: true
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 },
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, 2, 3 ] }
    })

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })

    const cube = useRef()
    const sphere = useRef()
    const config = {
        maxYaw: 0.1, // Max amount camera can yaw in either direction
        maxPitch: 0.1, // Max amount camera can pitch in either direction
        maxRoll: 0.1, // Max amount camera can roll in either direction
        yawFrequency: 0.1, // Frequency of the the yaw rotation
        pitchFrequency: 0.1, // Frequency of the pitch rotation
        rollFrequency: 0.1, // Frequency of the roll rotation
        intensity: 1, // initial intensity of the shake
        decay: false, // should the intensity decay over time
        decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
        controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
      }

      useFrame((state, delta) =>
        {
            const time = state.clock.elapsedTime
            cube.current.position.x = 2 + Math.sin(time)
            // cube.current.position.y += delta * 0.2
        })

    return <>
        <OrbitControls makeDefault/>

        {/* <Environment
            background
            // preset="sunset"
        >
            <mesh position-z={ - 5 } scale={ 10 }>
                <planeGeometry />
                <meshBasicMaterial color="red" />
            </mesh>
        </Environment> */}

<Environment
    background
    // preset="sunset"
>
    <mesh position-z={ - 5 } scale={ 10 }>
        <planeGeometry />
        <meshBasicMaterial color="red" />
    </mesh>
</Environment>

        {/* <directionalLight
            ref={ directionalLight }
            position={ sunPosition }
            intensity={ 1.5 }
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ - 5 }
            shadow-camera-left={ - 5 }
        /> */}
      <ContactShadows
            position={ [ 0, - 0.99, 0 ] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
            frames={ 1 }
        />
            <color args={ [ 'ivory' ] } attach="background" />
        {/* <BakeShadows /> */}
        {/* <SoftShadows frustum={ 3.75 } size={ 50 } near={ 9.5 } samples={ 17 } rings={ 11 } /> */}
        { perfVisible && <Perf position="top-left" /> }
        {/* <Perf position="top-left" /> */}
        {/* <Sky sunPosition={ sunPosition } /> */}
        {/* <AccumulativeShadows
            position={ [ 0, - 0.99, 0 ] }
            scale={ 10 }
            color="#316d39"
            opacity={ 0.8 }
            frames={ Infinity }
            temporal
            blend={ 100 }
        >
            <RandomizedLight
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 1 }
                position={ [ 1, 2, 3 ] }
                bias={ 0.001 }
            />
        </AccumulativeShadows> */}
        {/* <Html center>Test</Html> */}
        <Float
            distance={ 10 }
            speed={ 5 }
            floatIntensity={ 2 }
        >
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={ 1 }
                color="salmon"
                position-y={ 2 }
                maxWidth={ 2 }
                textAlign="center"
            >
                I LOVE R3F
            </Text>
        </Float>

        <CameraShake {...config} />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <PivotControls 
            anchor={ [ 0, 0, 0 ] }
            depthTest={ false }
            lineWidth={ 4 }
            axisColors={ [ '#9381ff', '#ff4d6d', '#7ae582' ] }
            scale={ 100 }
            fixed={ true }
        >            
        <mesh castShadow ref={ sphere } position={ [ 0, 0, 0]} >
                <sphereGeometry />
                <meshStandardMaterial color={ 'yellow' } envMapIntensity={ envMapIntensity }/>
                <Html
                    position={ [ 1, 1, 0 ] }
                    wrapperClass="label"
                    center
                    distanceFactor={ 8 }
                    occlude={ [ sphere, cube ] }
                >
                    That's a sphere 👍
                </Html>
            </mesh>
        </PivotControls>

        {/* <TransformControls object={cube} mode="translate"> */}
            <mesh castShadow ref={ cube } position-x={ 2 } scale={ scale }>                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={ envMapIntensity }/>
            </mesh>
        {/* </TransformControls> */}
        
        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <MeshReflectorMaterial 
                resolution={ 512 }
                blur={ [ 1000, 1000 ] }
                mixBlur={ 1 }
                mirror={ 0.5 }
                color="greenyellow"
                envMapIntensity={ envMapIntensity }
            />
        </mesh>

    </>
}