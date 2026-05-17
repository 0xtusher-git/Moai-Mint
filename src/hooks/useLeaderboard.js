import { useState, useEffect, useCallback } from 'react'
import { supabase, fetchStats } from '../lib/supabase'
import { useMemes } from './useMemes'
import { useVoting } from './useVoting'

export function useLeaderboard() {
  const [filter, setFilter] = useState('THIS_WEEK')
  const [myUsername, setMyUsername] = useState(() => localStorage.getItem('concrete_username') || '')
  const [stats, setStats] = useState({ total_memes: 0, total_votes: 0, total_bags: 0 })
  const { memes, setMemes, loading, error, load } = useMemes()
  const voting = useVoting()

  // Load memes on filter change
  useEffect(() => {
    load(filter, filter === 'MY_MEMES' ? myUsername : null)
  }, [filter, myUsername, load])

  // Load stats
  useEffect(() => {
    fetchStats().then(setStats).catch(() => {})
  }, [])

  // Realtime subscription
  useEffect(() => {
    if (!supabase) return
    const channel = supabase
      .channel('memes-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'memes',
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          if (filter === 'NEWEST') {
            setMemes(prev => [payload.new, ...prev])
          }
        } else if (payload.eventType === 'UPDATE') {
          setMemes(prev => prev.map(m => m.id === payload.new.id ? payload.new : m))
        } else if (payload.eventType === 'DELETE') {
          setMemes(prev => prev.filter(m => m.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [filter, setMemes])

  const handleVote = useCallback((memeId) => {
    voting.vote(memeId, () => {
      // Optimistic update
      setMemes(prev => prev.map(m =>
        m.id === memeId ? { ...m, vote_count: (m.vote_count || 0) + 1 } : m
      ))
      // Increment local stats
      setStats(prev => ({ ...prev, total_votes: (prev.total_votes || 0) + 1 }))
    })
  }, [voting, setMemes])

  return {
    memes,
    loading,
    error,
    filter,
    setFilter,
    stats,
    myUsername,
    setMyUsername,
    handleVote,
    isVoting: voting.isVoting,
    hasVoted: voting.hasVoted,
  }
}
