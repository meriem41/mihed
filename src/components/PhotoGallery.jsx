import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Beautiful placeholder memory cards using CSS gradients
const MEMORIES = [
  { id: 1, emoji: '🌸', label: 'First Adventure Together', desc: 'The day everything felt possible and the world was ours to explore.', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, emoji: '☕', label: 'Coffee Shop Talks', desc: 'Late-night conversations that somehow fixed everything and nothing at all.', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, emoji: '🌅', label: 'Sunset Moments', desc: 'Watching the sky turn gold and feeling grateful we were together.', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, emoji: '🎉', label: 'Celebrating You', desc: 'Every time we celebrated your wins felt like the best day ever.', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 5, emoji: '🌙', label: 'Late Night Laughs', desc: 'The kind of laughter that makes your stomach hurt and your heart full.', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 6, emoji: '🌺', label: 'Spring Walks', desc: 'When the world was blooming and so were we.', gradient: 'linear-gradient(135deg, #fd7043 0%, #ffca28 100%)' },
  { id: 7, emoji: '⭐', label: 'Under The Stars', desc: 'Stargazing and making impossible wishes that somehow came true.', gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
  { id: 8, emoji: '🎵', label: 'Dancing Together', desc: 'Our song came on and nothing else mattered for those three minutes.', gradient: 'linear-gradient(135deg, #e96c6c 0%, #b721ff 100%)' },
]

export default function PhotoGallery() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragRef = useRef(0)

  const go = (dir) => {
    setDirection(dir)
    setCurrent(c => (c + dir + MEMORIES.length) % MEMORIES.length)
  }

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.92 }),
  }

  const mem = MEMORIES[current]

  return (
    <section className="py-24 px-4" style={{ zIndex: 10, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700 }}
            className="gradient-text mb-3">
          Our Memories
        </h2>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', color: 'rgba(240,230,255,0.6)', fontStyle: 'italic' }}>
          A collection of moments too precious to forget
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto relative">
        {/* Main card */}
        <div className="relative overflow-hidden rounded-3xl" style={{ height: 420 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-10 text-center"
              style={{
                background: mem.gradient,
                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                cursor: 'grab',
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
            >
              {/* Overlay for depth */}
              <div className="absolute inset-0 rounded-3xl"
                   style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)' }} />

              <motion.div className="relative z-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{mem.emoji}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', fontWeight: 700, color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }} className="mb-3">
                  {mem.label}
                </h3>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
                  {mem.desc}
                </p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-6 opacity-30" style={{ fontSize: '2rem' }}>✨</div>
              <div className="absolute bottom-4 left-6 opacity-30" style={{ fontSize: '1.5rem' }}>💫</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={() => go(-1)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-lg"
            whileHover={{ scale: 1.1, x: -3 }} whileTap={{ scale: 0.9 }}
            style={{ border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
          >←</motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {MEMORIES.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 24 : 8, height: 8, background: i === current ? '#ff3e7f' : 'rgba(255,255,255,0.25)', cursor: 'pointer', border: 'none' }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-lg"
            whileHover={{ scale: 1.1, x: 3 }} whileTap={{ scale: 0.9 }}
            style={{ border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
          >→</motion.button>
        </div>

        <p className="text-center mt-4 opacity-30 text-sm" style={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.1em' }}>
          swipe or drag to explore ✨
        </p>
      </div>
    </section>
  )
}
