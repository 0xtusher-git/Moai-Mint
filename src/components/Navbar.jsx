import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(8,8,8,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #222',
      padding: '0 24px',
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Left: Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.8rem' }}>🗿</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ 
            fontFamily: "'Bebas Neue', sans-serif", 
            fontSize: '1.6rem', 
            letterSpacing: '0.05em', 
            color: '#FFD700',
            lineHeight: 1
          }}>
            MOAI MINT
          </span>
          <div style={{
            width: 20,
            height: 20,
            background: '#FFD700',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            fontWeight: '900',
            color: '#000',
            fontFamily: "'DM Mono', monospace",
            marginLeft: 4
          }}>MM</div>
        </div>
      </Link>

      {/* Right: Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link 
          to="/leaderboard" 
          style={{ 
            fontFamily: "'DM Mono', monospace", 
            fontSize: '0.8rem', 
            color: location.pathname === '/leaderboard' ? '#FFD700' : '#888', 
            textDecoration: 'none', 
            letterSpacing: '0.05em' 
          }}
        >
          LEADERBOARD
        </Link>
        <Link to="/create" className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.95rem' }}>
          CREATE MEME
        </Link>
      </div>
    </nav>
  )
}
