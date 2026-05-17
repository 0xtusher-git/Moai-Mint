import { X, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #222',
      background: '#0a0a0a',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
          marginBottom: 40,
        }}>
          {/* Left: Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '2rem' }}>🗿</span>
            <span style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontSize: '1.8rem', 
              letterSpacing: '0.06em', 
              color: '#FFD700' 
            }}>
              MOAI MINT
            </span>
          </div>

          {/* Center: Community Note */}
          <div style={{ 
            fontFamily: "'DM Mono', monospace", 
            fontSize: '0.85rem', 
            color: '#666',
            textAlign: 'center'
          }}>
            Built for the <a href="https://concrete.xyz" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700', textDecoration: 'none' }}>Concrete</a> community
          </div>

          {/* Right: Links */}
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="https://concrete.xyz" target="_blank" rel="noopener noreferrer"
              style={{ color: '#888', fontSize: '0.8rem', textDecoration: 'none', fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
              <ExternalLink size={14} /> concrete.xyz
            </a>
            <a href="https://twitter.com/ConcreteXYZ" target="_blank" rel="noopener noreferrer"
              style={{ color: '#888', fontSize: '0.8rem', textDecoration: 'none', fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
              <X size={14} /> @ConcreteXYZ
            </a>
          </div>
        </div>

        {/* Bottom Bar: Privacy Disclaimer */}
        <div style={{
          borderTop: '1px solid #1a1a1a',
          paddingTop: 24,
          textAlign: 'center',
        }}>
          <div style={{ 
            color: '#555', 
            fontSize: '0.75rem', 
            fontFamily: "'DM Mono', monospace",
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center'
          }}>
            <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🔒</span> Your images never leave your device. No uploads. No storage. No tracking.
            </div>
            <div style={{ opacity: 0.5 }}>
              © 2025 Moaimint.xyz · Free. Instant. Unbothered.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
