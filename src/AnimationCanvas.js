import React, { useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Points from './Points';

// turns OrbitControls into a jsx component --> orbitControls
extend({OrbitControls})


const CameraControls = () => {

    const { camera, gl: { domElement } } = useThree();

    const controlsRef = useRef();

    // animate camera position each frame
    useFrame(() => controlsRef.current.update())

    return( 
        <orbitControls 
            ref={controlsRef}
            args={[camera, domElement]}
            autoRotate
            autoRotateSpeed={-0.2} />
    )

}

const AnimationCanvas = () => {
    return (
        <Canvas
            colorManagement={false}
            camera={{ position: [100, 10, 0], fov: 75 }}>
                <Points />
                <CameraControls />
        </Canvas>
    );
}

export default AnimationCanvas