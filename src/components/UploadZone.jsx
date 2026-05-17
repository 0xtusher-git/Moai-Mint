import { useRef, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { Upload } from 'lucide-react'

export default function UploadZone({ onImageLoaded }) {
  const fileInputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.')
      return
    }
    setLoading(true)
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      setLoading(false)
      toast.success('🗿 Image loaded. Let\'s get Moai.')
      onImageLoaded(img, file)
    }
    img.onerror = () => {
      setLoading(false)
      toast.error('Could not load image. Try another file.')
    }
    img.src = url
  }, [onImageLoaded])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    processFile(file)
  }, [processFile])

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragging(true) }, [])
  const handleDragLeave = useCallback(() => setDragging(false), [])
  const handleChange = useCallback((e) => processFile(e.target.files?.[0]), [processFile])

  return (
    <div
      onClick={() => !loading && fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        width: '100%',
        aspectRatio: '1',
        maxWidth: 500,
        border: `2px dashed ${dragging ? '#FFD700' : '#333'}`,
        borderRadius: 16,
        background: dragging
          ? 'rgba(255,215,0,0.06)'
          : '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: dragging ? '0 0 40px rgba(255,215,0,0.2), inset 0 0 40px rgba(255,215,0,0.04)' : 'none',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid BG */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,215,0,0.04) 39px, rgba(255,215,0,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,215,0,0.04) 39px, rgba(255,215,0,0.04) 40px)',
      }} />

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, border: '3px solid #222', borderTopColor: '#FFD700', borderRadius: '50%' }} className="animate-spin" />
          <span style={{ color: '#888', fontFamily: "'DM Mono', monospace", fontSize: '0.85rem' }}>Loading image...</span>
        </div>
      ) : (
        <>
          <div style={{
            fontSize: '4.5rem',
            lineHeight: 1,
            marginBottom: 20,
            filter: dragging ? 'drop-shadow(0 0 20px rgba(255,215,0,0.6))' : 'none',
            transition: 'filter 0.2s',
          }}
            className={dragging ? 'animate-float' : ''}
          >🗿</div>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem',
            letterSpacing: '0.08em',
            color: dragging ? '#FFD700' : '#fff',
            transition: 'color 0.2s',
            marginBottom: 8,
          }}>
            {dragging ? 'DROP IT HERE' : 'DROP ANY IMAGE HERE'}
          </div>

          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', color: '#555', marginBottom: 20 }}>
            or click to browse
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px',
            border: '1px solid #2a2a2a',
            borderRadius: 100,
            background: '#141414',
          }}>
            <Upload size={14} color="#888" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#666', letterSpacing: '0.05em' }}>
              JPG · PNG · WEBP · GIF
            </span>
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
