import React, { useMemo, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';

// we are using this image as our texture
import circle from './three_assets/circle.png';



const Points = () => {

    const bufferRef = useRef();

    const img = useLoader(THREE.TextureLoader, circle);

    // count is the # of points along one axis
    const count = 100;

    // sep is the separation between points
    const sep = 3;

    // phase shift value allows us to manipulate our wave through 'time'
    let phaseShift = 0;

    // frequency and amplitude of our wave
    let freq = 0.002;
    let amplitude = 3;

    // this function generates our wave
    const graph = useCallback( (x, z) => Math.sin(freq * (x ** 2 + z ** 2 + phaseShift)) * amplitude, [phaseShift, freq, amplitude] );

    // usually you would repesent positions with a 2d array like so
    // [[x1, y1, z1], [x2, x2, z2], [x3, y3, z3]]
    // ...but bufferAttribute does not take a 2d array, only 1d
    // so positions need to look like this:
    // [x1, y1, z1, x2, y2, z2, x3,y3, z3, ... ]
    let positions = useMemo(() => {

        let positions = [];

        for (let xi = 0; xi < count; xi++)
        {
            for (let zi = 0; zi < count; zi++)
            {
                const x = sep * (xi - count / 2);
                const z = sep * (zi - count / 2);
                const y = graph(x, z);

                positions.push(x, y, z);
            }
        }

        return new Float32Array(positions);

    }, [count, sep, graph]);

    // animates our wave each frame
    useFrame(() => {
        phaseShift += 15;
        const currentPositions = bufferRef.current.array;

        let i = 0;
        for (let xi = 0; xi < count; xi++)
        {
            for (let zi = 0; zi < count; zi++)
            {
                const x = sep * (xi - count / 2);
                const z = sep * (zi - count / 2);
                currentPositions[i + 1] = graph(x, z);
                i += 3
            }
        }

        bufferRef.current.needsUpdate = true;

    })

    return (
       <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute 
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                    ref={bufferRef} />
            </bufferGeometry>
            <pointsMaterial 
                attach="material"
                map={img}
                color={0x00aaff}
                size={0.5}
                sizeAttenuation
                transparent={false}
                alphaTest={0.5}
                opacity={1.0} />
       </points>
    );
}

export default Points