// ══════════════════════════════════════════════════════
// CANVAS.JS — Core drawing utilities
// ══════════════════════════════════════════════════════

/**
 * Draw image with object-fit: cover to fill canvas square
 */
export function drawImageCover(ctx, img, w, h) {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = w / h

  let sx, sy, sw, sh

  if (imgRatio > canvasRatio) {
    // Image is wider — crop sides
    sh = img.naturalHeight
    sw = sh * canvasRatio
    sx = (img.naturalWidth - sw) / 2
    sy = 0
  } else {
    // Image is taller — crop top/bottom
    sw = img.naturalWidth
    sh = sw / canvasRatio
    sx = 0
    sy = (img.naturalHeight - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h)
}

/**
 * Draw top caption bar with white Bebas Neue text
 */
export function drawTopCaption(ctx, text, w, h) {
  if (!text) return
  const barHeight = h * 0.13

  // Gradient: black at top → transparent at bottom
  const grad = ctx.createLinearGradient(0, 0, 0, barHeight)
  grad.addColorStop(0, 'rgba(0,0,0,0.90)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, barHeight)

  // White text
  const fontSize = Math.round(w / 18)
  ctx.font = `bold ${fontSize}px "Bebas Neue", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 8

  const wrappedLines = wrapText(ctx, text, w * 0.88)
  const lineHeight = fontSize * 1.2
  const totalTextHeight = wrappedLines.length * lineHeight
  const startY = (barHeight / 2) - (totalTextHeight / 2) + lineHeight / 2

  wrappedLines.forEach((line, i) => {
    ctx.fillStyle = '#ffffff'
    ctx.fillText(line, w / 2, startY + i * lineHeight)
  })

  ctx.shadowBlur = 0
}

/**
 * Draw bottom caption bar with gold Bebas Neue text
 */
export function drawBottomCaption(ctx, text, w, h) {
  if (!text) return
  const barHeight = h * 0.20

  // Gradient: transparent at top → black at bottom
  const grad = ctx.createLinearGradient(0, h - barHeight, 0, h)
  grad.addColorStop(0, 'rgba(0,0,0,0)')
  grad.addColorStop(1, 'rgba(0,0,0,0.95)')
  ctx.fillStyle = grad
  ctx.fillRect(0, h - barHeight, w, barHeight)

  // Gold text
  const fontSize = Math.round(w / 16)
  ctx.font = `bold ${fontSize}px "Bebas Neue", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.95)'
  ctx.shadowBlur = 10

  const wrappedLines = wrapText(ctx, text, w * 0.88)
  const lineHeight = fontSize * 1.2
  const totalTextHeight = wrappedLines.length * lineHeight
  const startY = (h - barHeight / 2) - (totalTextHeight / 2) + lineHeight / 2

  wrappedLines.forEach((line, i) => {
    ctx.fillStyle = '#FFD700'
    ctx.fillText(line, w / 2, startY + i * lineHeight)
  })

  ctx.shadowBlur = 0
}

/**
 * Draw Concrete XYZ logo badge in bottom-right corner
 */
export function drawLogoBadge(ctx, w, h) {
  const badgeW = w * 0.3
  const badgeH = h * 0.072
  const padding = w * 0.025
  const x = w - badgeW - padding
  const y = h - badgeH - padding
  const radius = badgeH / 2

  // Gold pill background
  ctx.fillStyle = '#FFD700'
  roundRect(ctx, x, y, badgeW, badgeH, radius)
  ctx.fill()

  // Black square with golden "C" on the left
  const squareSize = badgeH * 0.72
  const squareX = x + badgeH * 0.14
  const squareY = y + (badgeH - squareSize) / 2

  ctx.fillStyle = '#000000'
  roundRect(ctx, squareX, squareY, squareSize, squareSize, 3)
  ctx.fill()

  // Golden "C" inside black square
  const cFontSize = squareSize * 0.72
  ctx.font = `bold ${cFontSize}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#FFD700'
  ctx.fillText('C', squareX + squareSize / 2, squareY + squareSize / 2)

  // "CONCRETE XYZ" text to the right of square
  const textX = squareX + squareSize + badgeH * 0.12
  const textFontSize = badgeH * 0.38
  ctx.font = `${textFontSize}px "Bebas Neue", sans-serif`
  ctx.textAlign = 'left'
  ctx.fillStyle = '#000000'
  ctx.fillText('CONCRETE XYZ', textX, y + badgeH / 2)
}

/**
 * Draw emoji stickers on canvas
 */
export function drawStickers(ctx, stickers, w, h) {
  stickers.forEach(({ emoji, x, y, rotation, size }) => {
    ctx.save()
    ctx.translate(x * w, y * h)
    ctx.rotate(rotation)

    const fontSize = size || Math.round(w * 0.1)
    ctx.font = `${fontSize}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Drop shadow
    ctx.shadowColor = 'rgba(0,0,0,0.8)'
    ctx.shadowBlur = 12
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    ctx.fillText(emoji, 0, 0)
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    ctx.restore()
  })
}

// ── HELPERS ──────────────────────────────────────────
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = words[0] || ''

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i]
    const { width } = ctx.measureText(testLine)
    if (width <= maxWidth) {
      currentLine = testLine
    } else {
      lines.push(currentLine)
      currentLine = words[i]
    }
  }
  lines.push(currentLine)
  return lines
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
