import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const WISHES = [
  { icon: '🌟', text: 'May every dream you hold close finally find its wings this year.' },
  { icon: '💫', text: 'May joy show up in places you least expect — and stay a while.' },
  { icon: '🌺', text: 'May you be surrounded by people who cherish you the way you deserve.' },
  { icon: '✨', text: 'May you love yourself as fiercely as those who love you do.' },
  { icon: '🎯', text: 'May every goal you chase bow down and say "welcome, I\'ve been waiting."' },
]

function FireworkParticle({ x, y, color, angle, distance }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, width: 4, height: 4, borderRadius: '50%', background: color, zIndex: 5 }}
      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.5, 0],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    />
  )
}

function Firework({ x, y }) {
  const COLORS = ['#ff3e7f','#9b5de5','#f9c784','#00b4d8','#fff','#34d399']
  const pieces = Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * Math.PI * 2,
    color: COLORS[i % COLORS.length],
    distance: 60 + Math.random() * 40,
  }))
  return (
    <>
      {pieces.map((p, i) => <FireworkParticle key={i} x={x} y={y} {...p} />)}
    </>
  )
}

export default function SurpriseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [fireworks, setFireworks] = useState([])
  const fwId = useRef(0)

  useEffect(() => {
    if (!isInView) return
    let count = 0
    const fire = () => {
      if (count++ > 8) return
      const id = fwId.current++
      const x = 20 + Math.random() * 60
      const y = 20 + Math.random() * 60
      setFireworks(f => [...f, { id, x: `${x}%`, y: `${y}%` }])
      setTimeout(() => setFireworks(f => f.filter(fw => fw.id !== id)), 1500)
      setTimeout(fire, 600 + Math.random() * 600)
    }
    setTimeout(fire, 500)
  }, [isInView])

  return (
    <section ref={ref} className="py-28 px-4 relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Fireworks */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {fireworks.map(fw => <Firework key={fw.id} x={fw.x} y={fw.y} />)}
      </div>

      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(255,62,127,0.12) 0%, rgba(155,93,229,0.08) 40%, transparent 70%)',
      }} />

      <div className="max-w-3xl mx-auto relative text-center">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass rounded-full inline-block px-6 py-2 mb-12"
          style={{ color: '#f9c784', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.25em', fontSize: '0.85rem' }}
        >
          ✨ SURPRISE ✨
        </motion.div>

        {/* Big glowing message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-14"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ boxShadow: ['0 0 40px rgba(255,62,127,0.3)', '0 0 80px rgba(155,93,229,0.6)', '0 0 40px rgba(0,180,216,0.3)', '0 0 40px rgba(255,62,127,0.3)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="glass rounded-3xl px-8 py-12" style={{ border: '1px solid rgba(255,62,127,0.25)', position: 'relative' }}>
            {/* Stars deco */}
            {['★','✦','✧'].map((s, i) => (
              <motion.span key={i}
                className="absolute"
                style={{ color: '#f9c784', fontSize: '1.2rem', top: `${15 + i * 20}%`, left: i % 2 === 0 ? '5%' : '92%', opacity: 0.6 }}
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
              >{s}</motion.span>
            ))}

            <motion.h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.3,
                color: '#fff',
                textShadow: '0 0 30px rgba(255,62,127,0.8), 0 0 60px rgba(155,93,229,0.5)',
              }}
            >
              You are the best
              <br />
              <span className="shimmer-text">bestie ever</span>
              <motion.span
                style={{ display: 'inline-block', marginLeft: 8 }}
                animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, -10] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              > ❤️</motion.span>
            </motion.h2>

            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.15rem', fontStyle: 'italic',
              color: 'rgba(240,230,255,0.7)',
              marginTop: '1.5rem',
              lineHeight: 1.7,
            }}>
              In every universe, across every timeline,<br />I would choose you as my friend. Always.
            </p>
          </div>
        </motion.div>

        {/* Birthday wishes cards */}
        <div className="grid gap-4">
          {WISHES.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl px-6 py-4 flex items-center gap-4 text-left"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,62,127,0.3)', transition: { duration: 0.2 } }}
            >
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{wish.icon}</span>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontStyle: 'italic', color: 'rgba(240,230,255,0.8)', lineHeight: 1.55 }}>
                {wish.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2rem', color: '#f9c784', textShadow: '0 0 20px rgba(249,199,132,0.6)' }}>
            Happy Birthday, Mihed! 🎂✨
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.25)', marginTop: 12, letterSpacing: '0.15em' }}>
            MADE WITH LOVE · JUST FOR YOU
          </p>
        </motion.div>

        {/* Back to top */}
        <motion.div className="mt-12" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass rounded-full px-8 py-3 text-sm"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
            }}
          >
            ↑ back to the beginning
          </button>
        </motion.div>
      </div>
    </section>
  )
}
