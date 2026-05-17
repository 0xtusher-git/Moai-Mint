import { useRef, useCallback, useEffect } from 'react'
import { drawImageCover, drawTopCaption, drawBottomCaption, drawLogoBadge, drawStickers } from '../lib/canvas'
import { OVERLAYS } from '../constants/overlays'

export function useCanvas({
  image,
  overlayId,
  intensity,
  topCaption,
  bottomCaption,
  stickers,
  showLogo,
  canvasRef: externalRef,
}) {
  const internalRef = useRef(null)
  const canvasRef = externalRef || internalRef

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    // Clear
    ctx.clearRect(0, 0, w, h)

    if (!image) {
      // Empty state - draw placeholder
      ctx.fillStyle = '#141414'
      ctx.fillRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = 'rgba(255,215,0,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // Giant Moai
      ctx.font = `${w * 0.35}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🗿', w / 2, h / 2)

      // "CONCRETE XYZ" watermark
      ctx.font = `bold ${w * 0.055}px "Bebas Neue", sans-serif`
      ctx.fillStyle = 'rgba(255,215,0,0.15)'
      ctx.fillText('CONCRETE XYZ', w / 2, h * 0.85)
      return
    }

    // LAYER 1 — User image (cover)
    drawImageCover(ctx, image, w, h)

    // LAYER 2 — Overlay effect
    const overlay = OVERLAYS.find(o => o.id === overlayId) || OVERLAYS[0]
    overlay.renderFn(ctx, w, h, intensity / 100)

    // LAYER 3 — Captions
    drawTopCaption(ctx, topCaption, w, h)
    drawBottomCaption(ctx, bottomCaption, w, h)

    // LAYER 4 — Stickers
    drawStickers(ctx, stickers, w, h)

    // LAYER 5 — Logo badge
    if (showLogo) {
      drawLogoBadge(ctx, w, h)
    }
  }, [image, overlayId, intensity, topCaption, bottomCaption, stickers, showLogo])

  useEffect(() => {
    renderCanvas()
  }, [renderCanvas])

  return { canvasRef, renderCanvas }
}
