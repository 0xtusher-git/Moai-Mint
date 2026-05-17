import { useState, useEffect } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import Podium from '../components/Podium';
import LeaderboardCard from '../components/LeaderboardCard';
import { Search, Filter, Trophy, Clock, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  useEffect(() => {
    document.title = "Leaderboard — Moai Mint";
  }, []);
  const { 
    memes, 
    loading, 
    filter, 
    setFilter, 
    handleVote, 
    isVoting, 
    hasVoted 
  } = useLeaderboard();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemes = memes.filter(m => 
    m.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const top3 = memes.slice(0, 3);
  const rest = filteredMemes.slice(filter === 'THIS_WEEK' || filter === 'ALL_TIME' ? 3 : 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="font-bebas text-6xl text-white mb-2 tracking-widest animate-fade-in-up flex items-center gap-4">
             HALL OF <span className="text-gold">FAME</span>
          </h1>
          <p className="font-mono text-muted text-sm animate-fade-in-up [animation-delay:50ms]">
            The top voted Moais earn legendary Concrete Bags rewards.
          </p>
        </div>

        {/* Bags Rewards Banner */}
        <div className="bg-surface-2 border border-border p-4 rounded-xl flex items-center gap-6 animate-fade-in-up [animation-delay:100ms]">
          <div className="flex flex-col items-center">
            <span className="text-gold text-lg font-bebas">🥇 1000</span>
            <span className="text-[0.6rem] text-muted font-mono uppercase">Bags</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-gray-300 text-lg font-bebas">🥈 500</span>
            <span className="text-[0.6rem] text-muted font-mono uppercase">Bags</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="text-amber-700 text-lg font-bebas">🥉 250</span>
            <span className="text-[0.6rem] text-muted font-mono uppercase">Bags</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 animate-fade-in-up [animation-delay:150ms]">
        <div className="tab-bar w-full md:w-auto overflow-x-auto">
          {[
            { id: 'THIS_WEEK', label: 'THIS WEEK', icon: <Trophy size={14} /> },
            { id: 'ALL_TIME', label: 'ALL TIME', icon: <Star size={14} /> },
            { id: 'NEWEST', label: 'NEWEST', icon: <Clock size={14} /> },
            { id: 'MY_MEMES', label: 'MY MEMES', icon: <User size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`tab-item flex items-center gap-2 ${filter === tab.id ? 'active' : ''}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search Moais..." 
            className="input-concrete pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && memes.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square skeleton rounded-xl" />
          ))}
        </div>
      ) : memes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in-up">
          <div className="text-8xl mb-6 grayscale opacity-20">🗿</div>
          <h2 className="font-bebas text-3xl text-white mb-4">NO MEMES YET</h2>
          <p className="font-mono text-muted mb-8">Be the first to claim your spot in the Hall of Fame.</p>
          <Link to="/create" className="btn-gold px-12">CREATE YOUR FIRST MEME</Link>
        </div>
      ) : (
        <>
          {/* Podium only for rankings */}
          {(filter === 'THIS_WEEK' || filter === 'ALL_TIME') && !searchQuery && (
            <Podium 
              topMemes={top3} 
              onVote={handleVote}
              isVoting={isVoting}
              hasVoted={hasVoted}
            />
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {rest.map((meme, i) => (
              <LeaderboardCard 
                key={meme.id} 
                meme={meme} 
                rank={(filter === 'THIS_WEEK' || filter === 'ALL_TIME' ? 4 : 1) + i}
                onVote={handleVote}
                isVoting={isVoting(meme.id)}
                hasVoted={hasVoted(meme.id)}
              />
            ))}
          </div>
          
          {rest.length === 0 && searchQuery && (
             <div className="text-center py-12 font-mono text-muted">
                No Moais found matching "{searchQuery}"
             </div>
          )}
        </>
      )}
    </div>
  );
}
