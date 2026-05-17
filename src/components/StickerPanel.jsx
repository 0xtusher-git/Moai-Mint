import { STICKERS } from '../constants/stickers'
import { Trash2 } from 'lucide-react'

export default function StickerPanel({ stickers, onAddSticker, onClearStickers, showLogo, onToggleLogo }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Sticker grid */}
      <div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', marginBottom: 12 }}>
          CLICK TO PLACE ON CANVAS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {STICKERS.map(s => (
            <button
              key={s.emoji}
              onClick={() => onAddSticker(s.emoji)}
              style={{
                background: '#0f0f0f',
                border: '1px solid #222',
                borderRadius: 10,
                padding: '10px 6px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FFD700'
                e.currentTarget.style.background = 'rgba(255,215,0,0.06)'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#222'
                e.currentTarget.style.background = '#0f0f0f'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{s.emoji}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#555', lineHeight: 1 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sticker count */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#0f0f0f',
        border: '1px solid #1e1e1e',
        borderRadius: 8,
        padding: '10px 14px',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: '#888' }}>
          {stickers.length === 0 ? 'No stickers placed' : `${stickers.length} sticker${stickers.length === 1 ? '' : 's'} placed`}
        </span>
        {stickers.length > 0 && (
          <button
            onClick={onClearStickers}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: '1px solid #2a2a2a',
              borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
              color: '#666', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4444'; e.currentTarget.style.color = '#ff4444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666' }}
          >
            <Trash2 size={12} /> CLEAR ALL
          </button>
        )}
      </div>

      {/* Logo toggle */}
      <div style={{ height: 1, background: '#1e1e1e' }} />
      <label style={{
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer',
        padding: '12px 14px',
        background: '#0f0f0f',
        border: `1px solid ${showLogo ? '#FFD700' : '#222'}`,
        borderRadius: 10,
        transition: 'all 0.2s',
      }}>
        <input
          type="checkbox"
          checked={showLogo}
          onChange={e => onToggleLogo(e.target.checked)}
          style={{ accentColor: '#FFD700', width: 16, height: 16, cursor: 'pointer' }}
        />
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', color: showLogo ? '#FFD700' : '#888' }}>
            Show Concrete XYZ badge
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#444', marginTop: 2 }}>
            Gold pill logo in bottom-right corner
          </div>
        </div>
      </label>
    </div>
  )
}
