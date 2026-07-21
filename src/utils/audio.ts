// Web Audio API Synthesized Sound Effects for Vida Saudável app
// Built directly with browser standard AudioContext - extremely fast, CORS-safe, and zero external downloads needed!

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Initialize or get the AudioContext safely after user interaction
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  if (!audioCtx) {
    // Standard AudioContext initialization
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Resume context if suspended (browser security autoplay policies)
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

// Check if sound is active
export function isSoundMuted(): boolean {
  return isMuted;
}

// Toggle sound mute state
export function setSoundMuted(muted: boolean) {
  isMuted = muted;
}

// 1. Gentle pop/tap feedback for simple button clicks
export function playTapSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Short pop/frequency drop
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

// 2. Ascending digital chime for log additions or positive notifications (e.g. adding water/meal)
export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Note 1 (E5)
  playTone(659.25, 0.08, now);
  // Note 2 (A5)
  playTone(880.00, 0.08, now + 0.07);
  // Note 3 (C#6)
  playTone(1108.73, 0.15, now + 0.14);
}

// 3. Futuristic sound effect for scanning / AI interactions (electronic sparkles)
export function playScanSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Quick series of high frequency sweeps
  for (let i = 0; i < 4; i++) {
    const time = now + i * 0.06;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.type = "triangle";
    const startFreq = 800 + i * 250;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(startFreq + 300, time + 0.05);
    
    gainNode.gain.setValueAtTime(0.04, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    
    osc.start(time);
    osc.stop(time + 0.06);
  }
}

// 4. Soft swish/transition pulse when switching tabs
export function playSwipeSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

// 5. Warning or deletion descending sound
export function playWarningSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Note 1 (D3)
  playTone(146.83, 0.12, now, "sawtooth", 0.03);
  // Note 2 (A2)
  playTone(110.00, 0.20, now + 0.10, "sawtooth", 0.03);
}

// Helper to play a single clean synthesizer note
function playTone(freq: number, duration: number, startTime: number, type: OscillatorType = "sine", volume = 0.05) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  
  gainNode.gain.setValueAtTime(volume, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
}
