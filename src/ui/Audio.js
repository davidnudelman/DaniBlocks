class AudioManager {
  constructor() { this.ctx = null; }
  init() { if (this.ctx) return; this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
  playNote(freq, type = 'sine', duration = 0.1, volume = 0.1) {
    if (!this.ctx) this.init(); if (this.ctx.state === 'suspended') this.ctx.resume();
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    osc.connect(gain); gain.connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + duration);
  }
  playPop() { this.playNote(400, 'sine', 0.05, 0.1); }
  playClick() { this.playNote(600, 'triangle', 0.05, 0.05); }
}
export const audioManager = new AudioManager();
