import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* Generates a soft, emotional ambient pad using Web Audio API */
function createAmbientMusic(ctx) {
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25] // C4 chord family
  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(0, ctx.currentTime)
  gainNode.connect(ctx.destination)

  const oscillators = []

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = i % 2 === 0 ? 'sine' : 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    // Subtle detune for richness
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800 + i * 100, ctx.currentTime)

    oscGain.gain.setValueAtTime(0.04 + (i === 0 ? 0.03 : 0), ctx.currentTime)

    // LFO for gentle tremolo
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(0.3 + i * 0.07, ctx.currentTime)
    lfoGain.gain.setValueAtTime(0.01, ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(oscGain.gain)
    lfo.start()

    osc.connect(filter)
    filter.connect(oscGain)
    oscGain.connect(gainNode)
    osc.start()

    oscillators.push({ osc, lfo })
  })

  return { gainNode, oscillators }
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const ctxRef = useRef(null)
  const musicRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setShowHint(false), 4000)
  }, [])

  const toggle = async () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      musicRef.current = createAmbientMusic(ctxRef.current)
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') await ctx.resume()

    if (!playing) {
      musicRef.current.gainNode.gain.cancelScheduledValues(ctx.currentTime)
      musicRef.current.gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5)
    } else {
      musicRef.current.gainNode.gain.cancelScheduledValues(ctx.currentTime)
      musicRef.current.gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
    }
    setPlaying(p => !p)
    setShowHint(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass rounded-full px-4 py-2 text-xs"
            style={{ fontFamily: '"Cormorant Garamond", serif', color: '#f9c784', letterSpacing: '0.05em' }}
          >
            🎵 Play ambient music
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        className="w-14 h-14 rounded-full glass flex items-center justify-center relative overflow-hidden"
        style={{
          border: playing ? '1px solid #ff3e7f' : '1px solid rgba(255,255,255,0.15)',
          boxShadow: playing ? '0 0 20px rgba(255,62,127,0.5)' : 'none',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={playing ? 'Pause music' : 'Play ambient music'}
      >
        {/* Animated equalizer bars when playing */}
        {playing ? (
          <div className="flex items-end gap-0.5" style={{ height: 20 }}>
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                style={{ width: 3, background: '#ff3e7f', borderRadius: 2 }}
                animate={{ height: [4, 16, 6, 14, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>
        ) : (
          <span style={{ fontSize: '1.3rem' }}>🎵</span>
        )}
      </motion.button>
    </div>
  )
}
