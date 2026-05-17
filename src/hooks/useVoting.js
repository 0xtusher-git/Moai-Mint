import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { voteOnMeme } from '../lib/supabase'
import { getFingerprint, markMemeVoted, hasVotedOnMeme } from '../lib/fingerprint'

export function useVoting() {
  const [votingIds, setVotingIds] = useState(new Set())
  const [votedIds, setVotedIds] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('concrete_voted') || '[]'))
    } catch {
      return new Set()
    }
  })

  const vote = useCallback(async (memeId, onSuccess) => {
    if (votedIds.has(memeId) || votingIds.has(memeId)) return

    setVotingIds(prev => new Set([...prev, memeId]))

    try {
      const fingerprint = await getFingerprint()
      const result = await voteOnMeme(memeId, fingerprint)

      if (result?.success === false && result?.error === 'already_voted') {
        toast('You already voted on this one 🗿', { icon: '🗿' })
        markMemeVoted(memeId)
        setVotedIds(prev => new Set([...prev, memeId]))
        return
      }

      // Success
      markMemeVoted(memeId)
      setVotedIds(prev => new Set([...prev, memeId]))
      toast.success('Vote cast! May the best Moai win. 👍')
      onSuccess?.()
    } catch (err) {
      if (err.message?.includes('unique') || err.message?.includes('already')) {
        toast('You already voted on this one 🗿', { icon: '🗿' })
        markMemeVoted(memeId)
        setVotedIds(prev => new Set([...prev, memeId]))
      } else {
        toast.error('Something went wrong. Try again.')
      }
    } finally {
      setVotingIds(prev => {
        const next = new Set(prev)
        next.delete(memeId)
        return next
      })
    }
  }, [votedIds, votingIds])

  const isVoting = useCallback((memeId) => votingIds.has(memeId), [votingIds])
  const hasVoted = useCallback((memeId) => votedIds.has(memeId) || hasVotedOnMeme(memeId), [votedIds])

  return { vote, isVoting, hasVoted }
}
