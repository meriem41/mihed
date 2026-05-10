import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const FLOATING_EMOJIS = ['✨','💫','🌸','💖','🎀','⭐','💝','🌺','💕','🎊']

function FloatingEmoji({ emoji, style }) {
  return (
    <motion.span
      className="absolute text-2xl select-none pointer-events-none"
      style={style}
      animate={{ y: [0, -25, 0], rotate: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
    >
      {emoji}
    </motion.span>
  )
}

export default function IntroScreen({ onOpen }) {
  const [hovered, setHovered] = useState(false)
  const [emojis] = useState(() =>
    FLOATING_EMOJIS.map((e, i) => ({
      emoji: e, id: i,
      style: {
        left: `${5 + Math.random() * 88}%`,
        top: `${5 + Math.random() * 85}%`,
        fontSize: `${1.2 + Math.random() * 1.5}rem`,
      }
    }))
  )

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 10 }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(155,93,229,0.18) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '30%',
          width: '50vw', height: '40vh',
          background: 'radial-gradient(ellipse, rgba(255,62,127,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {emojis.map(e => <FloatingEmoji key={e.id} emoji={e.emoji} style={e.style} />)}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center text-center px-6" style={{ zIndex: 5 }}>

        {/* Date chip */}
        <motion.div variants={itemVariants}
          className="glass rounded-full px-5 py-2 mb-8 text-sm tracking-widest uppercase"
          style={{ color: '#f9c784', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.25em' }}
        >
          ✨ A Special Day ✨
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 1.05, fontWeight: 900 }}
        >
          <span className="shimmer-text">Happy</span>
          <br />
          <span className="shimmer-text">Birthday</span>
        </motion.h1>

        {/* Name */}
        <motion.div variants={itemVariants} className="mt-4 mb-2">
          <span
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#fff',
              textShadow: '0 0 30px rgba(255,62,127,0.7), 0 0 60px rgba(155,93,229,0.4)',
              fontWeight: 700,
              letterSpacing: '0.03em',
            }}
          >
            Mihed 💖
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: 'rgba(240,230,255,0.7)',
            fontStyle: 'italic',
            maxWidth: 480,
            lineHeight: 1.6,
          }}
          className="mt-4 mb-12"
        >
          A celebration as beautiful and rare as you are — your presence makes every day brighter.
        </motion.p>

        {/* Open Letter button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onOpen}
            className="relative px-10 py-4 rounded-full overflow-hidden btn-glow"
            style={{
              background: 'linear-gradient(135deg, #ff3e7f, #9b5de5)',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.08em',
              border: 'none',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
              animate={hovered ? { x: ['−100%', '200%'] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <span className="relative z-10">💌 Open Your Letter</span>
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center gap-2 opacity-40"
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontFamily: '"Cormorant Garamond", serif' }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-px h-8 rounded-full"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }}
            animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
