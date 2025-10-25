'use client'
import React from 'react'
import '@google/model-viewer'
export default function ThreeDViewer({ src='/models/sample_quartz.glb' }: any) {
  return (
    <div className="w-full h-96 bg-gray-900 rounded overflow-hidden">
      <model-viewer src={src} alt="3D model" ar ar-modes="webxr scene-viewer quick-look" camera-controls auto-rotate style={{width:'100%', height:'100%'}}></model-viewer>
    </div>
  )
}
