import { motion, AnimatePresence } from 'framer-motion'
import BirthdayLetter from './BirthdayLetter'
import Balloons from './Balloons'
import Confetti from './Confetti'
import { useState } from 'react'

export default function LetterSection({ isOpen, onOpen }) {
  const [celebrationActive, setCelebrationActive] = useState(false)

  const handleOpen = () => {
    onOpen()
    setCelebrationActive(true)
    setTimeout(() => setCelebrationActive(false), 7000)
  }

  return (
    <section className="py-16 px-4 relative" style={{ zIndex: 10 }}>
      <Balloons visible={celebrationActive} />
      <Confetti active={celebrationActive} />

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-8 text-center py-20"
            >
              {/* Envelope illustration */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ cursor: 'pointer' }}
                onClick={handleOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
              >
                <div
                  style={{
                    width: 160, height: 110, position: 'relative',
                    background: 'linear-gradient(135deg, rgba(155,93,229,0.3), rgba(255,62,127,0.2))',
                    borderRadius: 16,
                    border: '1px solid rgba(255,62,127,0.3)',
                    boxShadow: '0 0 40px rgba(155,93,229,0.3), 0 0 80px rgba(255,62,127,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {/* Envelope flap */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(135deg, rgba(155,93,229,0.2), rgba(255,62,127,0.15))',
                    borderRadius: '16px 16px 0 0',
                    borderBottom: '1px solid rgba(255,62,127,0.2)',
                    clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
                  }} />
                  <span style={{ fontSize: '3rem', position: 'relative', zIndex: 2 }}>💌</span>
                  {/* Seal */}
                  <div style={{
                    position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff3e7f, #9b5de5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', zIndex: 5,
                    boxShadow: '0 0 15px rgba(255,62,127,0.6)',
                  }}>
                    ❤️
                  </div>
                </div>
              </motion.div>

              <div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}
                    className="gradient-text">
                  A letter, just for you
                </h3>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(240,230,255,0.6)' }}>
                  Written from the heart — click to open
                </p>
              </div>

              <motion.button
                onClick={handleOpen}
                className="btn-glow px-10 py-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #ff3e7f, #9b5de5)',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.1rem', fontWeight: 700,
                  color: '#fff', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                💖 Open The Letter
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section header */}
              <div className="text-center mb-10">
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700 }}
                    className="gradient-text mb-2">
                  A Letter For You
                </h2>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: 'rgba(240,230,255,0.5)', fontSize: '1rem' }}>
                  From your bestie, with love ✨
                </p>
              </div>
              <BirthdayLetter visible={isOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
