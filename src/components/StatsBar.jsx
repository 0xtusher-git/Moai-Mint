import { useEffect, useState } from 'react'
import { fetchStats, supabase } from '../lib/supabase'

function StatItem({ label, value, icon }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!value) return
    let start = 0
    const end = parseInt(value) || 0
    if (end === 0) return
    const step = Math.max(1, Math.floor(end / 40))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setDisplayed(end); clearInterval(timer) }
      else setDisplayed(start)
    }, 30)
    return () => clearInterval(timer)
  }, [value])

  return (
    <div style={{ textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{icon}</div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '2rem',
        color: '#FFD700',
        letterSpacing: '0.04em',
        lineHeight: 1,
      }}>
        {displayed.toLocaleString()}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#555', marginTop: 4, letterSpacing: '0.08em' }}>
        {label}
      </div>
    </div>
  )
}

export default function StatsBar() {
  const [stats, setStats] = useState({ total_memes: 0, total_votes: 0, total_bags: 0 })

  useEffect(() => {
    fetchStats().then(setStats).catch(() => {})

    if (!supabase) return

    // Realtime stats
    const ch = supabase.channel('stats-live')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stats' },
        (p) => { if (p.new) setStats(p.new) })
      .subscribe()

    return () => supabase.removeChannel(ch)
  }, [])

  return (
    <div style={{
      background: '#0d0d0d',
      border: '1px solid #1e1e1e',
      borderRadius: 12,
      padding: '24px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 0,
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <StatItem icon="🗿" value={stats.total_memes} label="MEMES CREATED" />
      <div style={{ width: 1, height: 48, background: '#1e1e1e', margin: '0 8px' }} />
      <StatItem icon="👍" value={stats.total_votes} label="VOTES CAST" />
      <div style={{ width: 1, height: 48, background: '#1e1e1e', margin: '0 8px' }} />
      <StatItem icon="💰" value={stats.total_bags} label="BAGS AWARDED" />
    </div>
  )
}
