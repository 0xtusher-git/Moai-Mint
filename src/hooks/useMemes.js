import { useState, useCallback } from 'react'
import { fetchMemes, submitMeme } from '../lib/supabase'

export function useMemes() {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (filter = 'THIS_WEEK', username = null) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchMemes({ filter, userId: username })
      setMemes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const submit = useCallback(async (payload) => {
    return await submitMeme(payload)
  }, [])

  return { memes, setMemes, loading, error, load, submit }
}
