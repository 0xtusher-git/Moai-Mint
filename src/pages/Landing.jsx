import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Zap, Image as ImageIcon } from 'lucide-react';
import StatsBar from '../components/StatsBar';

export default function Landing() {
  useEffect(() => {
    document.title = "Moai Mint — Turn anything into a Moai meme";
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative pt-24 pb-36 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="font-bebas text-7xl md:text-9xl text-white leading-none mb-4 animate-fade-in-up [text-shadow:0_0_40px_rgba(255,215,0,0.25)]">
            MOAI <span className="shimmer-text">MINT</span>
          </h1>
          
          <div className="flex flex-col gap-2 mb-12 animate-fade-in-up [animation-delay:100ms]">
            <p className="font-bebas text-2xl md:text-3xl text-gold tracking-widest uppercase">
              Turn anything into a Moai meme.
            </p>
            <p className="font-mono text-lg text-muted opacity-80">
              Free. Instant. Unbothered.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:200ms]">
            <Link to="/create" className="btn-gold w-full sm:w-auto text-xl px-16 py-5 group shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)]">
              START MINTING <Rocket size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 -left-24 text-[12rem] opacity-5 animate-float pointer-events-none select-none">🗿</div>
        <div className="absolute bottom-1/4 -right-24 text-[12rem] opacity-5 animate-float pointer-events-none select-none [animation-delay:1.5s]">🗿</div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 -mt-16 mb-28 relative z-20">
        <div className="max-w-4xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 py-28 bg-concrete-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-bebas text-5xl text-white text-center mb-20 tracking-wider">
            HOW TO <span className="text-gold">MINT</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "🗿",
                title: "1. UPLOAD",
                desc: "Drop any image from anywhere. Your data stays on your device.",
                delay: "0ms"
              },
              {
                icon: "✨",
                title: "2. TRANSFORM",
                desc: "Add Moai + Concrete vibes instantly with cinematic overlays.",
                delay: "100ms"
              },
              {
                icon: "📥",
                title: "3. MINT",
                desc: "Download your meme free and share it with the community.",
                delay: "200ms"
              }
            ].map((step, i) => (
              <div 
                key={i} 
                className="glass-card p-10 flex flex-col items-center text-center group hover:gold-border transition-all animate-fade-in-up"
                style={{ animationDelay: step.delay }}
              >
                <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                  {step.icon}
                </div>
                <h3 className="font-bebas text-3xl text-gold mb-4 tracking-widest">{step.title}</h3>
                <p className="font-mono text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
          background: 'repeating-linear-gradient(0deg, #FFD700, #FFD700 1px, transparent 1px, transparent 4px)' 
        }} />
      </section>

      {/* Security CTA */}
      <section className="px-6 py-32 bg-surface relative">
        <div className="max-w-4xl mx-auto glass-card p-14 text-center border-gold/20">
          <div className="inline-flex p-4 rounded-full bg-gold/5 mb-8">
            <ShieldCheck size={48} className="text-gold" />
          </div>
          <h2 className="font-bebas text-5xl text-white mb-6 tracking-wide uppercase">
            Privacy <span className="text-gold">First</span>
          </h2>
          <p className="font-mono text-muted mb-10 max-w-xl mx-auto leading-relaxed text-lg">
            Moai Mint processes everything in your browser. <br />
            No signups. No trackers. Just yield.
          </p>
          <div className="flex justify-center">
            <Link to="/create" className="btn-gold px-16 py-4 text-xl">
              GO TO MINT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
