import { Trophy } from 'lucide-react';
import LeaderboardCard from './LeaderboardCard';

export default function Podium({ topMemes, onVote, isVoting, hasVoted }) {
  if (!topMemes || topMemes.length === 0) return null;

  // Reorder to: 2nd, 1st, 3rd for the visual podium
  const podiumOrder = [];
  if (topMemes[1]) podiumOrder.push({ ...topMemes[1], position: 2 });
  if (topMemes[0]) podiumOrder.push({ ...topMemes[0], position: 1 });
  if (topMemes[2]) podiumOrder.push({ ...topMemes[2], position: 3 });

  return (
    <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
      {podiumOrder.map((meme) => {
        const isFirst = meme.position === 1;
        const isSecond = meme.position === 2;
        const isThird = meme.position === 3;

        return (
          <div 
            key={meme.id} 
            className={`w-full max-w-[320px] flex flex-col items-center animate-fade-in-up`}
            style={{ 
              animationDelay: `${meme.position * 100}ms`,
              order: meme.position === 1 ? 2 : meme.position === 2 ? 1 : 3 
            }}
          >
            {/* Crown/Badge */}
            <div className={`mb-4 flex flex-col items-center gap-1`}>
              <div className={`relative ${isFirst ? 'scale-125' : 'scale-100'}`}>
                <Trophy 
                  size={isFirst ? 32 : 24} 
                  className={isFirst ? 'text-gold' : isSecond ? 'text-gray-300' : 'text-amber-700'} 
                />
                {isFirst && <div className="absolute -inset-2 bg-gold/20 blur-xl rounded-full -z-10 animate-pulse-gold" />}
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-border px-3 py-1 rounded-full flex items-center gap-2">
                <span className={`font-bebas text-sm ${isFirst ? 'text-gold' : 'text-white'}`}>
                  {isFirst ? '1000' : isSecond ? '500' : '250'} BAGS
                </span>
              </div>
            </div>

            {/* Card wrapper to handle height differences */}
            <div className={`w-full transition-transform duration-500 hover:-translate-y-2 ${isFirst ? 'scale-105 md:scale-110 z-10' : 'scale-100 z-0 opacity-90'}`}>
              <LeaderboardCard 
                meme={meme} 
                rank={meme.position} 
                onVote={onVote}
                isVoting={isVoting(meme.id)}
                hasVoted={hasVoted(meme.id)}
              />
            </div>
            
            {/* Podium Base */}
            <div className={`hidden md:block w-full mt-4 bg-surface-2 border-x border-t border-border rounded-t-lg transition-all duration-700`}
              style={{ 
                height: isFirst ? '60px' : isSecond ? '40px' : '25px',
                opacity: 0.5 
              }}
            >
               <div className="w-full h-full flex items-center justify-center font-bebas text-3xl text-border-bright">
                  {meme.position}
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
