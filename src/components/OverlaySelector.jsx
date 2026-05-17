import { OVERLAYS } from '../constants/overlays'

export default function OverlaySelector({ selectedId, onSelect, intensity, onIntensityChange }) {
  return (
    <div>
      {/* 2x3 grid of overlay cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {OVERLAYS.map(overlay => {
          const selected = overlay.id === selectedId
          return (
            <button
              key={overlay.id}
              onClick={() => onSelect(overlay.id)}
              style={{
                background: selected ? 'rgba(255,215,0,0.08)' : '#0f0f0f',
                border: `1px solid ${selected ? '#FFD700' : '#222'}`,
                borderRadius: 10,
                padding: 12,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s ease',
                boxShadow: selected ? '0 0 16px rgba(255,215,0,0.15)' : 'none',
              }}
            >
              {/* Color swatch */}
              <div style={{
                width: '100%', height: 36,
                background: overlay.swatch,
                borderRadius: 6,
                marginBottom: 8,
                border: '1px solid rgba(255,255,255,0.06)',
              }} />
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                color: selected ? '#FFD700' : '#ddd',
                marginBottom: 2,
              }}>{overlay.name}</div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.65rem',
                color: '#555',
                lineHeight: 1.3,
              }}>{overlay.description}</div>
            </button>
          )
        })}
      </div>

      {/* Intensity slider */}
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 10,
        }}>
          <label style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.72rem',
            color: '#888',
            letterSpacing: '0.06em',
          }}>
            OVERLAY INTENSITY
          </label>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.1rem',
            color: '#FFD700',
            letterSpacing: '0.04em',
          }}>{intensity}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={e => onIntensityChange(Number(e.target.value))}
          style={{ accentColor: '#FFD700' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#444' }}>SUBTLE</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#444' }}>INTENSE</span>
        </div>
      </div>
    </div>
  )
}
