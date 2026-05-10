import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100 }
        return p + Math.random() * 8 + 2
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onDone])

  const pct = Math.min(progress, 100)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #12003a 0%, #04000f 100%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Glowing orb */}
      <motion.div
        className="w-32 h-32 rounded-full mb-10 relative"
        style={{ background: 'radial-gradient(circle, #9b5de5, #ff3e7f, #00b4d8)' }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
        transition={{ scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
      >
        <div className="absolute inset-2 rounded-full flex items-center justify-center"
             style={{ background: '#04000f' }}>
          <span style={{ fontSize: '2.5rem' }}>🎂</span>
        </div>
        {/* Orbit ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#ff3e7f', borderRightColor: '#9b5de5' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.h2
        className="font-playfair text-3xl mb-2 shimmer-text"
        style={{ fontFamily: '"Playfair Display", serif' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        A Gift For Mihed
      </motion.h2>
      <motion.p
        className="text-sm mb-10 opacity-50"
        style={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.3em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
      >
        SOMETHING MAGICAL IS COMING…
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #ff3e7f, #9b5de5, #00b4d8)', width: `${pct}%`, transition: 'width 0.08s ease' }}
        />
      </div>
      <motion.p className="text-xs mt-3 opacity-30" style={{ letterSpacing: '0.2em' }}>
        {Math.round(pct)}%
      </motion.p>
    </motion.div>
  )
}
