import { useState, useCallback, useRef, useEffect } from 'react';
import { Dices, Download, Send, RefreshCw, Layers, MessageSquare, Sticker, Share } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import MemeCanvas from '../components/MemeCanvas';
import OverlaySelector from '../components/OverlaySelector';
import CaptionControls from '../components/CaptionControls';
import StickerPanel from '../components/StickerPanel';
import ExportPanel from '../components/ExportPanel';
import SubmitModal from '../components/SubmitModal';
import { OVERLAYS } from '../constants/overlays';
import { TOP_CAPTIONS, BOTTOM_CAPTIONS } from '../constants/captions';
import { STICKERS } from '../constants/stickers';

export default function Create() {
  useEffect(() => {
    document.title = "Create — Moai Mint";
  }, []);
  const [image, setImage] = useState(null);
  const [overlayId, setOverlayId] = useState(OVERLAYS[0].id);
  const [intensity, setIntensity] = useState(70);
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');
  const [stickers, setStickers] = useState([]);
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState('style');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  const canvasRef = useRef(null);

  const handleImageLoaded = (img) => {
    setImage(img);
    setActiveTab('style');
  };

  const handleAddSticker = (emoji) => {
    const newSticker = {
      id: Date.now(),
      emoji,
      x: 0.3 + Math.random() * 0.4,
      y: 0.3 + Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 0.5,
      size: 40 + Math.random() * 20
    };
    setStickers([...stickers, newSticker]);
  };

  const handleRandomize = () => {
    const randomOverlay = OVERLAYS[Math.floor(Math.random() * OVERLAYS.length)].id;
    const randomTop = TOP_CAPTIONS[Math.floor(Math.random() * TOP_CAPTIONS.length)];
    const randomBottom = BOTTOM_CAPTIONS[Math.floor(Math.random() * BOTTOM_CAPTIONS.length)];
    
    setOverlayId(randomOverlay);
    setIntensity(50 + Math.floor(Math.random() * 50));
    setTopCaption(randomTop);
    setBottomCaption(randomBottom);
  };

  const reset = () => {
    setImage(null);
    setStickers([]);
    setTopCaption('');
    setBottomCaption('');
    setOverlayId(OVERLAYS[0].id);
    setIntensity(70);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-bebas text-5xl text-white mb-2 tracking-widest animate-fade-in-up">
          MOAI <span className="text-gold">MINT</span>
        </h1>
        <p className="font-mono text-muted text-sm animate-fade-in-up [animation-delay:50ms]">
          Turn anything into a Moai meme. Free. Instant. Unbothered.
        </p>
      </div>

      {!image ? (
        <div className="flex justify-center py-12 animate-fade-in-up [animation-delay:100ms]">
          <UploadZone onImageLoaded={handleImageLoaded} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-[500px_1fr] gap-12 items-start animate-fade-in-up">
          {/* Left Column: Preview */}
          <div className="flex flex-col gap-6 sticky top-24">
            <MemeCanvas 
              image={image}
              overlayId={overlayId}
              intensity={intensity}
              topCaption={topCaption}
              bottomCaption={bottomCaption}
              stickers={stickers}
              showLogo={showLogo}
              canvasRef={canvasRef}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleRandomize} className="btn-outline text-sm">
                <Dices size={18} /> RANDOMIZE
              </button>
              <button onClick={reset} className="btn-ghost text-sm">
                <RefreshCw size={14} /> NEW IMAGE
              </button>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="glass-card overflow-hidden">
            <div className="tab-bar px-4 pt-4">
              {[
                { id: 'style', icon: <Layers size={14} />, label: 'STYLE' },
                { id: 'captions', icon: <MessageSquare size={14} />, label: 'CAPTIONS' },
                { id: 'stickers', icon: <Sticker size={14} />, label: 'STICKERS' },
                { id: 'export', icon: <Share size={14} />, label: 'EXPORT' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-item flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 min-h-[400px]">
              {activeTab === 'style' && (
                <OverlaySelector 
                  selectedId={overlayId}
                  onSelect={setOverlayId}
                  intensity={intensity}
                  onIntensityChange={setIntensity}
                />
              )}
              
              {activeTab === 'captions' && (
                <CaptionControls 
                  topCaption={topCaption}
                  bottomCaption={bottomCaption}
                  onTopChange={setTopCaption}
                  onBottomChange={setBottomCaption}
                />
              )}

              {activeTab === 'stickers' && (
                <StickerPanel 
                  stickers={stickers}
                  onAddSticker={handleAddSticker}
                  onClearStickers={() => setStickers([])}
                  showLogo={showLogo}
                  onToggleLogo={setShowLogo}
                />
              )}

              {activeTab === 'export' && (
                <ExportPanel 
                  canvasRef={canvasRef}
                  topCaption={topCaption}
                  bottomCaption={bottomCaption}
                  onSubmit={() => setIsSubmitModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <SubmitModal 
          canvasRef={canvasRef}
          overlayId={overlayId}
          topCaption={topCaption}
          bottomCaption={bottomCaption}
          onClose={() => setIsSubmitModalOpen(false)}
        />
      )}
    </div>
  );
}
