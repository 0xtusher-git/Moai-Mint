// ══════════════════════════════════════════════════════
// OVERLAYS.JS — 6 Canvas overlay render functions
// Each function: (ctx, width, height, intensity 0-1)
// ══════════════════════════════════════════════════════

export function drawClassicMoai(ctx, w, h, intensity) {
  // Radial vignette (dark edges, clear center)
  const gradient = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85)
  gradient.addColorStop(0, `rgba(0,0,0,0)`)
  gradient.addColorStop(1, `rgba(0,0,0,${0.65 * intensity})`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // Subtle gold tint
  ctx.fillStyle = `rgba(255,200,0,${0.12 * intensity})`
  ctx.fillRect(0, 0, w, h)
}

export function drawGoldRush(ctx, w, h, intensity) {
  // Diagonal gradient: orange bottom-left → gold center → cream top-right
  const gradient = ctx.createLinearGradient(0, h, w, 0)
  gradient.addColorStop(0, `rgba(255,120,0,${0.5 * intensity})`)
  gradient.addColorStop(0.5, `rgba(255,200,0,${0.35 * intensity})`)
  gradient.addColorStop(1, `rgba(255,248,200,${0.25 * intensity})`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // Horizontal scanlines every 4px
  ctx.fillStyle = `rgba(0,0,0,${0.06 * intensity})`
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 1)
  }
}

export function drawVolcanic(ctx, w, h, intensity) {
  // Bottom-up: deep red → orange → dark transparent top
  const gradient = ctx.createLinearGradient(0, h, 0, 0)
  gradient.addColorStop(0, `rgba(255,50,0,${0.65 * intensity})`)
  gradient.addColorStop(0.4, `rgba(255,100,0,${0.4 * intensity})`)
  gradient.addColorStop(0.75, `rgba(180,20,0,${0.2 * intensity})`)
  gradient.addColorStop(1, `rgba(0,0,0,${0.4 * intensity})`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)
}

export function drawOuterSpace(ctx, w, h, intensity) {
  // Dark navy overlay
  ctx.fillStyle = `rgba(0,0,20,${0.45 * intensity})`
  ctx.fillRect(0, 0, w, h)

  // 120 random stars
  const seed = 42 // deterministic positions
  const stars = getStars(120, w, h, seed)
  stars.forEach(({ x, y, r, op }) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${op * intensity})`
    ctx.fill()
  })

  // Purple+blue gradient wash
  const purpleGrad = ctx.createLinearGradient(0, 0, w, h)
  purpleGrad.addColorStop(0, `rgba(80,0,160,${0.2 * intensity})`)
  purpleGrad.addColorStop(0.5, `rgba(0,40,160,${0.12 * intensity})`)
  purpleGrad.addColorStop(1, `rgba(0,0,80,${0.1 * intensity})`)
  ctx.fillStyle = purpleGrad
  ctx.fillRect(0, 0, w, h)
}

export function drawMatrix(ctx, w, h, intensity) {
  // Dark green overlay
  ctx.fillStyle = `rgba(0,20,0,${0.55 * intensity})`
  ctx.fillRect(0, 0, w, h)

  const chars = '01CONCRETE$YIELD🗿'.split('')
  const colWidth = 14
  const rowHeight = h / 8
  const cols = Math.floor(w / colWidth)

  ctx.font = `${colWidth - 2}px 'DM Mono', monospace`
  ctx.textAlign = 'center'

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < 8; row++) {
      const charIndex = (col * 7 + row * 3) % chars.length
      const char = chars[charIndex]
      const x = col * colWidth + colWidth / 2
      const y = row * rowHeight + rowHeight * 0.7
      const opacity = (0.1 + (row / 8) * 0.15) * intensity
      ctx.fillStyle = `rgba(0,255,70,${opacity})`
      ctx.fillText(char, x, y)
    }
  }
}

export function drawMidnightVault(ctx, w, h, intensity) {
  // Deep blue-purple top-to-bottom gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
  bgGrad.addColorStop(0, `rgba(10,0,40,${0.6 * intensity})`)
  bgGrad.addColorStop(0.6, `rgba(5,0,60,${0.45 * intensity})`)
  bgGrad.addColorStop(1, `rgba(0,0,20,${0.3 * intensity})`)
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // City light glow at bottom (warm gold radial from center-bottom)
  const glowGrad = ctx.createRadialGradient(w / 2, h, 0, w / 2, h, w * 0.8)
  glowGrad.addColorStop(0, `rgba(255,180,50,${0.4 * intensity})`)
  glowGrad.addColorStop(0.4, `rgba(255,130,0,${0.18 * intensity})`)
  glowGrad.addColorStop(1, `rgba(255,100,0,0)`)
  ctx.fillStyle = glowGrad
  ctx.fillRect(0, 0, w, h)
}

// ── HELPERS ──────────────────────────────────────────
function getStars(count, w, h, seed) {
  const stars = []
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rand() * w,
      y: rand() * h,
      r: 0.3 + rand() * 1.5,
      op: 0.3 + rand() * 0.7,
    })
  }
  return stars
}
