import * as THREE from 'three'
import React, { useLayoutEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'

const Line = ({ start, end }) => {
    const ref = useRef()
    useLayoutEffect(() => {
      ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
    }, [start, end])
    return (
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial color="hotpink" />
      </line>
    )
  }
export default Line