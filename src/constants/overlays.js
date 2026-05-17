import {
  drawClassicMoai,
  drawGoldRush,
  drawVolcanic,
  drawOuterSpace,
  drawMatrix,
  drawMidnightVault,
} from '../lib/overlays'

export const OVERLAYS = [
  {
    id: 'classic-moai',
    name: 'Classic Moai',
    description: 'Cinematic vignette + gold tint',
    swatch: 'linear-gradient(135deg, #2a1a00, #8B6914)',
    renderFn: drawClassicMoai,
  },
  {
    id: 'gold-rush',
    name: 'Gold Rush',
    description: 'Trophy winner energy',
    swatch: 'linear-gradient(135deg, #FF7800, #FFD700, #FFF8C0)',
    renderFn: drawGoldRush,
  },
  {
    id: 'volcanic',
    name: 'Volcanic',
    description: 'Danger / power energy',
    swatch: 'linear-gradient(0deg, #FF3200, #FF6400, #2a0000)',
    renderFn: drawVolcanic,
  },
  {
    id: 'outer-space',
    name: 'Outer Space',
    description: 'Stars + cosmic glow',
    swatch: 'linear-gradient(135deg, #000014, #100030, #001050)',
    renderFn: drawOuterSpace,
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'CONCRETE in the machine',
    swatch: 'linear-gradient(135deg, #001400, #004600, #00ff46)',
    renderFn: drawMatrix,
  },
  {
    id: 'midnight-vault',
    name: 'Midnight Vault',
    description: 'Earning while you sleep',
    swatch: 'linear-gradient(180deg, #0a0028, #050040, rgba(255,180,50,0.3))',
    renderFn: drawMidnightVault,
  },
]
