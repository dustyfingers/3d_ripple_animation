import React from 'react';
import { Canvas } from 'react-three-fiber';

import Points from './Points';

const AnimationCanvas = () => {
    return (
        <Canvas
            colorManagement={false}
            camera={{ position: [100, 10, 0], fov: 75 }}>
                <Points />
        </Canvas>
    );
}

export default AnimationCanvas