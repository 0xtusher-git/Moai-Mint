import { useState, useRef, useEffect } from 'react'
import { Download, Copy, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCanvas } from '../hooks/useCanvas'

export default function ExportPanel({ canvasRef, topCaption, bottomCaption, onSubmit }) {
  const [copying, setCopying] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const thumbRef = useRef(null)

  // Draw thumbnail
  useEffect(() => {
    const src = canvasRef?.current
    const thumb = thumbRef.current
    if (!src || !thumb) return
    const ctx = thumb.getContext('2d')
    ctx.clearRect(0, 0, 200, 200)
    ctx.drawImage(src, 0, 0, 200, 200)
  })

  const shareText = `🗿 Just minted my Concrete meme on Moai Mint!\n\n${topCaption}\n${bottomCaption}\n\nMint yours free 👇\nmoaimint.xyz\n\n#MoaiMint #ConcreteXYZ #RealYield`

  const handleCopy = async () => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(shareText)
      toast.success('📋 Share text copied!')
    } catch {
      toast.error('Could not copy text.')
    } finally {
      setTimeout(() => setCopying(false), 1200)
    }
  }

  const handleDownload = () => {
    const canvas = canvasRef?.current
    if (!canvas) return
    setDownloading(true)
    try {
      const url = canvas.toDataURL('image/png', 1.0)
      const a = document.createElement('a')
      a.href = url
      a.download = `concrete-meme-${Date.now()}.png`
      a.click()
      toast.success('📥 Meme saved to your device!')
    } catch {
      toast.error('Download failed. Try again.')
    } finally {
      setTimeout(() => setDownloading(false), 1000)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {/* Thumbnail preview */}
      <div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', marginBottom: 10, textAlign: 'center' }}>
          PREVIEW
        </div>
        <canvas
          ref={thumbRef}
          width={200}
          height={200}
          style={{ borderRadius: 8, border: '1px solid #222', display: 'block', width: 200, height: 200 }}
        />
      </div>

      {/* Share text */}
      <div style={{ width: '100%' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', marginBottom: 8 }}>
          SHARE TEXT
        </div>
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #1e1e1e',
          borderRadius: 8,
          padding: 14,
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.75rem',
          color: '#aaa',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {shareText}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={handleCopy} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
          <Copy size={14} />
          {copying ? 'COPIED!' : 'COPY SHARE TEXT'}
        </button>
        <button onClick={handleDownload} className="btn-gold" style={{ width: '100%' }}>
          <Download size={16} />
          {downloading ? 'DOWNLOADING...' : 'DOWNLOAD PNG'}
        </button>
        <button onClick={onSubmit} className="btn-outline" style={{ width: '100%' }}>
          <Send size={15} />
          SUBMIT TO LEADERBOARD
        </button>
      </div>
    </div>
  )
}
