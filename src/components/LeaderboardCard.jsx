import { useState } from 'react';
import { ThumbsUp, Share2, CornerUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LeaderboardCard({ meme, rank, onVote, isVoting, hasVoted }) {
  const [shareHover, setShareHover] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/leaderboard?meme=${meme.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  return (
    <div className="meme-card flex flex-col group h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src={meme.image_url} 
          alt={meme.title || "Concrete Meme"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Rank Badge */}
        <div className="absolute top-3 left-3 bg-gold text-black font-bebas px-3 py-1 rounded-md shadow-lg flex items-center gap-1">
          <span className="text-xs opacity-70">#</span>
          <span className="text-lg leading-none">{rank}</span>
        </div>

        {/* Share Button Overlay */}
        <button 
          onClick={handleShare}
          onMouseEnter={() => setShareHover(true)}
          onMouseLeave={() => setShareHover(false)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            shareHover ? 'bg-gold text-black scale-110' : 'bg-black/40 text-white backdrop-blur-sm'
          }`}
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-bebas text-lg tracking-wide truncate max-w-[180px]">
              {meme.title || "Untitled Moai"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gold font-mono text-[0.65rem]">@{meme.username}</span>
              <span className="text-muted font-mono text-[0.6rem] opacity-50">•</span>
              <span className="text-muted font-mono text-[0.6rem] opacity-50">{timeAgo(meme.created_at)}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gold font-bebas text-xl leading-none">
              {meme.vote_count || 0}
            </span>
            <span className="text-muted font-mono text-[0.55rem] opacity-50">VOTES</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onVote(meme.id)}
            disabled={isVoting || hasVoted}
            className={`vote-btn flex-1 justify-center py-2 ${hasVoted ? 'voted' : ''}`}
          >
            {isVoting ? (
              <span className="animate-spin h-4 w-4 border-2 border-gold border-t-transparent rounded-full" />
            ) : hasVoted ? (
              <span className="flex items-center gap-2">VOTED <ThumbsUp size={14} /></span>
            ) : (
              <span className="flex items-center gap-2 uppercase tracking-widest">Vote <ThumbsUp size={14} /></span>
            )}
          </button>
          
          <Link 
            to={`/create?template=${meme.id}`}
            className="btn-ghost flex items-center justify-center aspect-square p-2 group/remix"
            title="Make one like this"
          >
            <CornerUpRight size={16} className="group-hover/remix:text-gold transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
