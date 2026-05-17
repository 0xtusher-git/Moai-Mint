import { TOP_CAPTIONS, BOTTOM_CAPTIONS, QUICK_COMBOS } from '../constants/captions'

export default function CaptionControls({ topCaption, bottomCaption, onTopChange, onBottomChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Quick Combos */}
      <div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', marginBottom: 10 }}>
          ⚡ QUICK COMBOS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_COMBOS.map((combo, i) => (
            <button
              key={i}
              onClick={() => { onTopChange(combo.top); onBottomChange(combo.bottom) }}
              className="chip"
              style={{
                border: topCaption === combo.top && bottomCaption === combo.bottom
                  ? '1px solid #FFD700'
                  : '1px solid #222',
                color: topCaption === combo.top && bottomCaption === combo.bottom
                  ? '#FFD700'
                  : '#888',
                background: topCaption === combo.top && bottomCaption === combo.bottom
                  ? 'rgba(255,215,0,0.06)'
                  : '#0f0f0f',
              }}
            >
              {combo.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: '#1e1e1e' }} />

      {/* Top Caption */}
      <div>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
          TOP CAPTION <span style={{ color: '#555' }}>(white text)</span>
        </label>
        <select
          className="select-concrete"
          value={TOP_CAPTIONS.includes(topCaption) ? topCaption : ''}
          onChange={e => e.target.value && onTopChange(e.target.value)}
          style={{ marginBottom: 8 }}
        >
          <option value="">— Select preset —</option>
          {TOP_CAPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="text"
          className="input-concrete"
          placeholder="Or type your own..."
          value={topCaption}
          onChange={e => onTopChange(e.target.value)}
          maxLength={80}
        />
        <div style={{ textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#444', marginTop: 4 }}>
          {topCaption.length}/80
        </div>
      </div>

      {/* Bottom Caption */}
      <div>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#888', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
          BOTTOM CAPTION <span style={{ color: '#FFD700', opacity: 0.6 }}>(gold text)</span>
        </label>
        <select
          className="select-concrete"
          value={BOTTOM_CAPTIONS.includes(bottomCaption) ? bottomCaption : ''}
          onChange={e => e.target.value && onBottomChange(e.target.value)}
          style={{ marginBottom: 8 }}
        >
          <option value="">— Select preset —</option>
          {BOTTOM_CAPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="text"
          className="input-concrete"
          placeholder="Or type your own..."
          value={bottomCaption}
          onChange={e => onBottomChange(e.target.value)}
          maxLength={80}
        />
        <div style={{ textAlign: 'right', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#444', marginTop: 4 }}>
          {bottomCaption.length}/80
        </div>
      </div>
    </div>
  )
}
