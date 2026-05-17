import FingerprintJS from '@fingerprintjs/fingerprintjs'

let cachedVisitorId = null

export async function getFingerprint() {
  // Return cached value if available
  if (cachedVisitorId) return cachedVisitorId

  // Check localStorage backup
  const stored = localStorage.getItem('concrete_fp')
  if (stored) {
    cachedVisitorId = stored
    return stored
  }

  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    cachedVisitorId = result.visitorId
    localStorage.setItem('concrete_fp', result.visitorId)
    return result.visitorId
  } catch (err) {
    // Fallback: generate a random ID and store it
    const fallback = 'fp_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('concrete_fp', fallback)
    cachedVisitorId = fallback
    return fallback
  }
}

export function getVotedMemes() {
  try {
    return JSON.parse(localStorage.getItem('concrete_voted') || '[]')
  } catch {
    return []
  }
}

export function markMemeVoted(memeId) {
  const voted = getVotedMemes()
  if (!voted.includes(memeId)) {
    voted.push(memeId)
    localStorage.setItem('concrete_voted', JSON.stringify(voted))
  }
}

export function hasVotedOnMeme(memeId) {
  return getVotedMemes().includes(memeId)
}
