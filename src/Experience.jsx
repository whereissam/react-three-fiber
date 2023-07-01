import { Stars, CameraShake, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
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

    return <>
        <OrbitControls makeDefault/>

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
        <mesh ref={ sphere } position-x={ - 2 } >
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
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

        <TransformControls object={cube} mode="translate">
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </TransformControls>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
    <planeGeometry />
    <MeshReflectorMaterial 
    resolution={ 512 }
    blur={ [ 1000, 1000 ] }
    mixBlur={ 1 }
    mirror={ 0.5 }
    color="greenyellow"
    />
</mesh>

    </>
}