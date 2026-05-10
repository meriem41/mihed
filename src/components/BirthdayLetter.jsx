import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function useTypewriter(text, speed = 28, active = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      if (i >= text.length) { clearInterval(id); setDone(true); return }
      setDisplayed(text.slice(0, ++i))
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, active])

  return { displayed, done }
}

const LETTER_PARAGRAPHS = [
  `Dear Mihed,`,
  `There are people who come into your life like a soft light — quiet, steady, and impossibly warm. You are that light. On this day that the universe decided to gift the world with you, I just want you to know how endlessly grateful I am.`,
  `You have a way of making ordinary moments feel like something out of a dream. Your laughter is contagious, your kindness is rare, and your heart is one of the most beautiful things I've ever known. The world simply shines brighter because you exist in it.`,
  `So today, I want to celebrate YOU. Not just the birthday, but every version of you — the strong one, the silly one, the dreaming one. You deserve every flower, every star, every piece of magic the world has to offer.`,
  `May this year bring you everything you've been quietly hoping for. May you be surprised by joy, held by love, and reminded every single day that you matter more than words can ever say.`,
  `With all the love my heart can hold,`,
  `Your bestie Meriem, always. 💖`,
]

export default function BirthdayLetter({ visible }) {
  const [paraIndex, setParaIndex] = useState(0)
  const [allDone, setAllDone] = useState(false)
  const containerRef = useRef(null)

  const { displayed, done } = useTypewriter(
    visible ? LETTER_PARAGRAPHS[paraIndex] : '',
    22,
    visible
  )

  useEffect(() => {
    if (!visible) { setParaIndex(0); setAllDone(false) }
  }, [visible])

  useEffect(() => {
    if (done && paraIndex < LETTER_PARAGRAPHS.length - 1) {
      const t = setTimeout(() => setParaIndex(p => p + 1), 350)
      return () => clearTimeout(t)
    }
    if (done && paraIndex === LETTER_PARAGRAPHS.length - 1) {
      setAllDone(true)
    }
  }, [done, paraIndex])

  // Auto scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayed, paraIndex])

  const completedParas = LETTER_PARAGRAPHS.slice(0, paraIndex)
  const isCurrentFirst = paraIndex === 0
  const isCurrentLast = paraIndex === LETTER_PARAGRAPHS.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, y: -60 }}
      animate={{ opacity: 1, scaleY: 1, y: 0 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto relative"
      style={{ transformOrigin: 'top center' }}
    >
      {/* Paper/envelope fold lines */}
      <div className="glass rounded-3xl overflow-hidden"
           style={{ border: '1px solid rgba(255,62,127,0.2)', boxShadow: '0 0 60px rgba(155,93,229,0.2), 0 0 120px rgba(255,62,127,0.1)' }}>

        {/* Header decoration */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>💌</span>
            <span style={{ fontFamily: '"Dancing Script", cursive', color: '#f9c784', fontSize: '1.1rem' }}>
              A letter for you
            </span>
          </div>
          <div className="flex gap-2">
            {['💖','💜','💙'].map((e, i) => (
              <motion.span key={i} style={{ fontSize: '1rem' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}>
                {e}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Letter body */}
        <div
          ref={containerRef}
          className="px-8 py-7 overflow-y-auto"
          style={{ maxHeight: '65vh', scrollBehavior: 'smooth' }}
        >
          {/* Completed paragraphs */}
          {completedParas.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: i === 0 || i === completedParas.length - 1
                  ? '"Dancing Script", cursive'
                  : '"Cormorant Garamond", serif',
                fontSize: i === 0 ? '1.5rem' : '1.18rem',
                color: i === 0 ? '#f9c784' : 'rgba(240,230,255,0.88)',
                marginBottom: '1.4rem',
                lineHeight: 1.75,
                fontStyle: i === 0 ? 'normal' : 'italic',
              }}
            >
              {para}
            </motion.p>
          ))}

          {/* Currently typing paragraph */}
          {!allDone && (
            <p
              style={{
                fontFamily: paraIndex === 0 || isCurrentLast
                  ? '"Dancing Script", cursive'
                  : '"Cormorant Garamond", serif',
                fontSize: paraIndex === 0 ? '1.5rem' : '1.18rem',
                color: paraIndex === 0 ? '#f9c784' : 'rgba(240,230,255,0.88)',
                marginBottom: '1.4rem',
                lineHeight: 1.75,
                fontStyle: paraIndex === 0 ? 'normal' : 'italic',
              }}
            >
              {displayed}
              <span className="cursor" />
            </p>
          )}

          {/* Final done state */}
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-col items-center gap-4 py-4"
            >
              <div className="flex gap-3" style={{ fontSize: '2rem' }}>
                {['💖','🌸','✨','🎊','💝'].map((e, i) => (
                  <motion.span key={i}
                    animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                    {e}
                  </motion.span>
                ))}
              </div>
              <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.1rem', color: 'rgba(249,199,132,0.7)', letterSpacing: '0.05em' }}>
                Sealed with love 💌
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 flex items-center justify-center"
             style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex gap-1">
            {LETTER_PARAGRAPHS.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300"
                   style={{
                     width: i <= paraIndex ? 20 : 6, height: 6,
                     background: i < paraIndex ? '#9b5de5' : i === paraIndex ? '#ff3e7f' : 'rgba(255,255,255,0.2)',
                   }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
