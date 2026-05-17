import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_project_url_here') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!supabase) {
  console.warn('Supabase credentials missing. App will run in offline mode with limited functionality.')
}

// ── MEMES ──────────────────────────────
export async function fetchMemes({ filter = 'THIS_WEEK', userId = null } = {}) {
  if (!supabase) return []
  let query = supabase.from('memes').select('*')

  if (filter === 'THIS_WEEK') {
    const weekNum = getWeekNumber(new Date())
    query = query.eq('week_number', weekNum)
  } else if (filter === 'NEWEST') {
    query = query.order('created_at', { ascending: false })
  } else if (filter === 'MY_MEMES' && userId) {
    query = query.eq('username', userId)
  }

  if (filter !== 'NEWEST') {
    query = query.order('vote_count', { ascending: false })
  }

  const { data, error } = await query.limit(50)
  if (error) throw error
  return data || []
}

export async function submitMeme({ username, title, wallet_address, overlay_id, top_caption, bottom_caption, imageBlob }) {
  if (!supabase) throw new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
  // 1. Upload image
  const uuid = crypto.randomUUID()
  const filePath = `memes/${uuid}.png`

  const { error: uploadError } = await supabase.storage
    .from('meme-images')
    .upload(filePath, imageBlob, { contentType: 'image/png', upsert: false })

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('meme-images')
    .getPublicUrl(filePath)

  // 2. Insert record
  const weekNum = getWeekNumber(new Date())
  const { data, error } = await supabase.from('memes').insert({
    username,
    title: title || null,
    wallet_address: wallet_address || null,
    overlay_id,
    top_caption,
    bottom_caption,
    image_url: publicUrl,
    week_number: weekNum,
  }).select().single()

  if (error) throw error

  // 3. Update stats counter
  await supabase.rpc('increment_stats_memes').catch(() => {})
  // fallback direct update
  await supabase.from('stats')
    .update({ total_memes: supabase.rpc('increment') })
    .eq('id', 1)
    .catch(() => {})

  return data
}

// ── VOTES ──────────────────────────────
export async function voteOnMeme(memeId, fingerprint) {
  if (!supabase) return { success: true } // Mock success in offline mode
  const { data, error } = await supabase.rpc('increment_vote', {
    p_meme_id: memeId,
    p_fingerprint: fingerprint,
  })
  if (error) throw error
  return data
}

// ── STATS ──────────────────────────────
export async function fetchStats() {
  if (!supabase) return { total_memes: 0, total_votes: 0, total_bags: 0 }
  const { data, error } = await supabase.from('stats').select('*').eq('id', 1).single()
  if (error) return { total_memes: 0, total_votes: 0, total_bags: 0 }
  return data
}

// ── HELPERS ────────────────────────────
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}
