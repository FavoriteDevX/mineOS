import React, { useState, useEffect } from 'react';
import { jukebox, SoundEngine } from '../../utils/audio';
import { BlockJukebox, BlockNoteBlock, ItemMusicDisc } from '../MinecraftBlockIcons';

export const JukeboxApp: React.FC = () => {
  const [state, setState] = useState(jukebox.getState());
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(jukebox.getState());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handlePlayDisc = (trackId: string) => {
    SoundEngine.playPop(0.3);
    jukebox.playDisc(trackId, volume);
    setState(jukebox.getState());
  };

  const handleStop = () => {
    SoundEngine.playClick(0.3);
    jukebox.stop();
    setState(jukebox.getState());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    jukebox.setVolume(val);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#2d1e12] p-4 text-white mc-font overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#543822]">
        <div className="flex items-center gap-2.5">
          <BlockJukebox size={30} />
          <div>
            <h2 className="text-lg font-bold text-[#ffff55] mc-text-shadow leading-tight">
              Oak Jukebox Player
            </h2>
            <p className="text-xs text-[#a08060]">
              Insert a Minecraft music disc to play ambient soundtrack
            </p>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 text-xs">
          <BlockNoteBlock size={18} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-[#55ff55] cursor-pointer"
          />
        </div>
      </div>

      {/* Main Player Display */}
      <div className="my-4 p-4 bg-[#1b120a] border-2 border-[#543822] flex flex-col sm:flex-row items-center gap-6 rounded shadow-inner">
        {/* Animated Vinyl Disc */}
        <div
          className={`w-28 h-28 rounded-full border-4 border-[#111111] bg-[#1a1a1a] flex items-center justify-center relative shadow-2xl transition-transform ${
            state.isPlaying ? 'animate-spin' : ''
          }`}
          style={{
            animationDuration: '4s',
            boxShadow: state.isPlaying ? '0 0 20px rgba(85, 255, 85, 0.3)' : undefined,
          }}
        >
          {/* Groove rings */}
          <div className="w-20 h-20 rounded-full border border-[#333333] flex items-center justify-center">
            {/* Center label */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[10px] text-black"
              style={{ backgroundColor: state.trackInfo?.color || '#55ff55' }}
            >
              {state.trackInfo ? 'DISC' : 'EMPTY'}
            </div>
          </div>
          {/* Center spindle hole */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#111111]" />
        </div>

        {/* Now Playing Info */}
        <div className="flex-1 text-center sm:text-left">
          <span className="text-xs uppercase tracking-wider text-[#a08060] font-bold">
            {state.isPlaying ? 'Now Playing' : 'Jukebox Idle'}
          </span>
          <h3 className="text-xl font-bold text-[#ffffff] mc-text-shadow">
            {state.trackInfo ? `${state.trackInfo.name}` : 'No disc inserted'}
          </h3>
          <p className="text-sm text-[#55ff55] font-bold">
            {state.trackInfo ? `Composer: ${state.trackInfo.author}` : 'Select a disc below to play'}
          </p>

          {/* Action buttons */}
          <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
            {state.isPlaying ? (
              <button
                type="button"
                onClick={handleStop}
                className="px-4 py-1.5 mc-button mc-button-danger text-xs font-bold"
              >
                ⏹ Stop Disc
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handlePlayDisc('sweden')}
                className="px-4 py-1.5 mc-button mc-button-green text-xs font-bold"
              >
                ▶ Play Sweden (C418)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Available Music Discs Grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <span className="text-xs font-bold text-[#a08060] uppercase tracking-wider mb-2">
          Music Discs Collection
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto pr-1">
          {state.availableTracks.map((disc) => {
            const isCurrent = state.currentTrack === disc.id && state.isPlaying;
            return (
              <button
                key={disc.id}
                type="button"
                onClick={() => handlePlayDisc(disc.id)}
                className={`flex items-center gap-3 p-2 text-left rounded border transition-colors ${
                  isCurrent
                    ? 'bg-[#386cb0] border-white text-white mc-text-shadow'
                    : 'bg-[#1b120a] hover:bg-[#3d2817] border-[#543822] text-[#e0e0e0]'
                }`}
              >
                {/* Authentic Minecraft Music Disc Icon */}
                <ItemMusicDisc size={30} centerColor={disc.color} />

                <div className="flex-1 truncate">
                  <div className="font-bold text-sm leading-tight truncate text-[#ffffff]">
                    {disc.name}
                  </div>
                  <div className="text-xs text-[#a08060]">{disc.author}</div>
                </div>

                <span className="text-xs font-bold text-[#ffff55]">
                  {isCurrent ? 'Playing ♫' : 'Insert ▶'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
