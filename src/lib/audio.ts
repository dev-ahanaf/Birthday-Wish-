export interface TrackInfo {
  id: string;
  name: string;
  category: string;
  url: string;
}

export const MUSIC_TRACKS: TrackInfo[] = [
  {
    id: "synth-celebration",
    name: "Happy Birthday Melodic Chimes (Built-in Audio Synthesizer)",
    category: "Joyful",
    url: "synth",
  },
  {
    id: "acoustic-warmth",
    name: "Soft Acoustic Birthday Serenade",
    category: "Romantic",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a832a8.mp3",
  },
  {
    id: "piano-lullaby",
    name: "Gentle Piano Dream & Sparkles",
    category: "Elegant",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
  {
    id: "upbeat-party",
    name: "Vibrant Celebration & Party Beats",
    category: "Party",
    url: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993922e96e.mp3",
  },
  {
    id: "none",
    name: "Silent (No Background Music)",
    category: "Mute",
    url: "",
  },
];

// Web Audio API Synthesizer fallback for Happy Birthday tune
class BirthdayAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      // Happy Birthday notes (frequency & duration in sec)
      const notes = [
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 1.2 },
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.2 },
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 523.25, d: 0.8 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 0.8 }, { f: 293.66, d: 1.2 },
        { f: 466.16, d: 0.4 }, { f: 466.16, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.4 },
      ];

      let currentTime = this.ctx.currentTime + 0.1;
      
      const playLoop = () => {
        if (!this.isPlaying || !this.ctx) return;
        
        notes.forEach((note) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(note.f, currentTime);

          gain.gain.setValueAtTime(0.15, currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + note.d);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(currentTime);
          osc.stop(currentTime + note.d);

          currentTime += note.d + 0.05;
        });

        // Loop after complete melody
        const totalDuration = notes.reduce((acc, n) => acc + n.d + 0.05, 0);
        this.timer = window.setTimeout(playLoop, totalDuration * 1000);
      };

      playLoop();
    } catch {
      // Fallback silent failure
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const synthPlayer = new BirthdayAudioSynth();
