import { useEffect } from 'react'
import { useCanvas } from '../hooks/useCanvas'

export default function MemeCanvas({ image, overlayId, intensity, topCaption, bottomCaption, stickers, showLogo, size = 500 }) {
  const { canvasRef } = useCanvas({ image, overlayId, intensity, topCaption, bottomCaption, stickers, showLogo })

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: 12,
      overflow: 'hidden',
      border: image ? '1px solid #222' : '1px solid #1a1a1a',
      flexShrink: 0,
      boxShadow: image ? '0 8px 48px rgba(0,0,0,0.6)' : 'none',
    }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
