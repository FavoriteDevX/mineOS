/**
 * Pure Web Audio API procedural sound synthesizer for minecraftOS.
 * Zero external audio dependencies; works reliably in any browser.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const SoundEngine = {
  // Minecraft stone/wood button click
  playClick(vol = 0.3) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(vol * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore user gesture restrictions
    }
  },

  // Chest Open sound (creak & latch)
  playChestOpen(vol = 0.35) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      // Creak oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, t);
      osc.frequency.linearRampToValueAtTime(320, t + 0.18);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(vol * 0.25, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      // Low pass to soften
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.22);
    } catch {
      // Ignore
    }
  },

  // Chest Close sound
  playChestClose(vol = 0.35) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(290, t);
      osc.frequency.linearRampToValueAtTime(140, t + 0.16);

      gain.gain.setValueAtTime(vol * 0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(550, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      // Ignore
    }
  },

  // Item pickup / pop sound
  playPop(vol = 0.3) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(920, t + 0.06);

      gain.gain.setValueAtTime(vol * 0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // Ignore
    }
  },

  // Level up iconic Minecraft chime (C5, E5, G5, C6)
  playLevelUp(vol = 0.3) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const noteTime = t + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(vol * 0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.26);
      });
    } catch {
      // Ignore
    }
  },

  // Eating food crunch
  playEat(vol = 0.3) {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const crunchTime = t + i * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(180 + Math.random() * 80, crunchTime);

        gain.gain.setValueAtTime(vol * 0.2, crunchTime);
        gain.gain.exponentialRampToValueAtTime(0.001, crunchTime + 0.05);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, crunchTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(crunchTime);
        osc.stop(crunchTime + 0.06);
      }
    } catch {
      // Ignore
    }
  },
};

// C418-Inspired Ambient Jukebox Synthesizer
class MinecraftJukebox {
  private currentTrack: string | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private step = 0;
  private masterGain: GainNode | null = null;

  private tracks: Record<
    string,
    { name: string; author: string; color: string; notes: { chord: number[]; duration: number }[] }
  > = {
    sweden: {
      name: 'Sweden',
      author: 'C418',
      color: '#55ff55',
      notes: [
        { chord: [349.23, 440.0, 523.25], duration: 1.6 }, // F maj
        { chord: [392.0, 493.88, 587.33], duration: 1.6 }, // G maj
        { chord: [220.0, 329.63, 440.0, 523.25], duration: 2.2 }, // Am
        { chord: [329.63, 392.0, 493.88], duration: 1.8 }, // Em
        { chord: [261.63, 329.63, 392.0, 523.25], duration: 2.4 }, // C maj
      ],
    },
    subwoofer: {
      name: 'Subwoofer Lullaby',
      author: 'C418',
      color: '#ff5555',
      notes: [
        { chord: [261.63, 329.63, 392.0], duration: 1.4 },
        { chord: [293.66, 369.99, 440.0], duration: 1.4 },
        { chord: [329.63, 392.0, 523.25], duration: 1.8 },
        { chord: [220.0, 261.63, 329.63], duration: 2.0 },
      ],
    },
    wethands: {
      name: 'Wet Hands',
      author: 'C418',
      color: '#55ffff',
      notes: [
        { chord: [329.63, 392.0, 659.25], duration: 1.2 },
        { chord: [293.66, 440.0, 587.33], duration: 1.2 },
        { chord: [261.63, 392.0, 523.25], duration: 1.6 },
        { chord: [196.0, 293.66, 392.0], duration: 2.0 },
      ],
    },
    pigstep: {
      name: 'Pigstep',
      author: 'Lena Raine',
      color: '#ffaa00',
      notes: [
        { chord: [146.83, 220.0, 293.66], duration: 0.8 },
        { chord: [174.61, 261.63, 349.23], duration: 0.8 },
        { chord: [196.0, 293.66, 392.0], duration: 0.8 },
        { chord: [130.81, 196.0, 261.63], duration: 1.2 },
      ],
    },
    cat: {
      name: 'Cat',
      author: 'C418',
      color: '#55ff55',
      notes: [
        { chord: [261.63, 392.0, 523.25], duration: 0.9 },
        { chord: [293.66, 349.23, 440.0], duration: 0.9 },
        { chord: [329.63, 392.0, 523.25], duration: 1.0 },
        { chord: [246.94, 293.66, 392.0], duration: 1.2 },
      ],
    },
  };

  playDisc(trackId: string, volume = 0.25) {
    this.stop();
    const track = this.tracks[trackId];
    if (!track) return;

    this.currentTrack = trackId;
    this.isPlaying = true;
    this.step = 0;

    const ctx = getAudioContext();
    if (!ctx) return;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    const playNextChord = () => {
      if (!this.isPlaying || !this.currentTrack) return;
      const curTrack = this.tracks[this.currentTrack];
      if (!curTrack) return;

      const chordData = curTrack.notes[this.step % curTrack.notes.length];
      const t = ctx.currentTime;

      chordData.chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm ambient sine and triangle tones
        osc.type = this.currentTrack === 'pigstep' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, t);

        noteGain.gain.setValueAtTime(0.001, t);
        noteGain.gain.linearRampToValueAtTime(0.18, t + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + chordData.duration);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, t);

        osc.connect(filter);
        filter.connect(noteGain);
        if (this.masterGain) {
          noteGain.connect(this.masterGain);
        }

        osc.start(t);
        osc.stop(t + chordData.duration + 0.05);
      });

      this.step++;
      this.timer = window.setTimeout(playNextChord, chordData.duration * 1000);
    };

    playNextChord();
  }

  stop() {
    this.isPlaying = false;
    this.currentTrack = null;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && audioCtx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)) * 0.5, audioCtx.currentTime);
    }
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      trackInfo: this.currentTrack ? this.tracks[this.currentTrack] : null,
      availableTracks: Object.entries(this.tracks).map(([id, info]) => ({
        id,
        name: info.name,
        author: info.author,
        color: info.color,
      })),
    };
  }
}

export const jukebox = new MinecraftJukebox();
