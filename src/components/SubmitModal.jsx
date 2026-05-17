import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitMeme } from '../lib/supabase'

export default function SubmitModal({ canvasRef, overlayId, topCaption, bottomCaption, onClose }) {
  const navigate = useNavigate()
  const thumbRef = useRef(null)
  const [username, setUsername] = useState(() => localStorage.getItem('concrete_username') || '')
  const [title, setTitle] = useState('')
  const [wallet, setWallet] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Draw thumbnail on mount
  useEffect(() => {
    const src = canvasRef?.current
    const thumb = thumbRef.current
    if (!src || !thumb) return
    const ctx = thumb.getContext('2d')
    ctx.drawImage(src, 0, 0, 150, 150)
  }, [canvasRef])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) { toast.error('Username is required!'); return }

    const canvas = canvasRef?.current
    if (!canvas) { toast.error('No canvas to submit.'); return }

    setSubmitting(true)
    try {
      // Convert canvas to blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0))
      if (!blob) throw new Error('Could not create image blob')

      await submitMeme({
        username: username.trim(),
        title: title.trim() || null,
        wallet_address: wallet.trim() || null,
        overlay_id: overlayId,
        top_caption: topCaption,
        bottom_caption: bottomCaption,
        imageBlob: blob,
      })

      // Save username
      localStorage.setItem('concrete_username', username.trim())
      toast.success('🚀 Meme submitted to the Hall of Fame!')
      setSuccess(true)
    } catch (err) {
      console.error(err)
      toast.error(err.message?.includes('bucket') || err.message?.includes('storage')
        ? 'Storage not configured. Set up Supabase bucket "meme-images".'
        : 'Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', letterSpacing: '0.06em', color: '#FFD700' }}>
            🚀 SUBMIT TO LEADERBOARD
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Thumbnail */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <canvas
                ref={thumbRef}
                width={150}
                height={150}
                style={{ borderRadius: 10, border: '1px solid #222' }}
              />
            </div>

            {/* Fields */}
            <div>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: 6 }}>
                USERNAME <span style={{ color: '#ff4444' }}>*</span>
              </label>
              <input
                type="text"
                className="input-concrete"
                placeholder="your_moai_name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={20}
                required
              />
            </div>

            <div>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: 6 }}>
                MEME TITLE <span style={{ color: '#444' }}>(optional)</span>
              </label>
              <input
                type="text"
                className="input-concrete"
                placeholder="Give it a name..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={50}
              />
            </div>

            <div>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: 6 }}>
                WALLET ADDRESS <span style={{ color: '#444' }}>(optional — for Bags rewards)</span>
              </label>
              <input
                type="text"
                className="input-concrete"
                placeholder="0x... or concrete1..."
                value={wallet}
                onChange={e => setWallet(e.target.value)}
              />
            </div>

            <div style={{ height: 1, background: '#1e1e1e' }} />

            <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? (
                <><span className="animate-spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #00000044', borderTopColor: '#000', borderRadius: '50%' }} /> SUBMITTING...</>
              ) : '🗿 SUBMIT TO HALL OF FAME'}
            </button>
          </form>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🗿</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: '#FFD700', letterSpacing: '0.06em', marginBottom: 8 }}>
              MEME SUBMITTED!
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', color: '#888', marginBottom: 28 }}>
              You're in the running for Concrete Bags. 💰
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/leaderboard')} className="btn-gold">
                VIEW LEADERBOARD
              </button>
              <button onClick={onClose} className="btn-outline">
                MAKE ANOTHER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
