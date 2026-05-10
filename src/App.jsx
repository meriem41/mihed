import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarCanvas from './components/StarCanvas'
import LoadingScreen from './components/LoadingScreen'
import IntroScreen from './components/IntroScreen'
import LetterSection from './components/LetterSection'
import SurpriseSection from './components/SurpriseSection'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [letterOpen, setLetterOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #12003a 0%, #04000f 60%)' }}>
      <StarCanvas />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          style={{ position:'absolute', top:'-20%', left:'-20%', width:'80vw', height:'80vh',
            background:'radial-gradient(ellipse, rgba(155,93,229,0.12) 0%, transparent 65%)', borderRadius:'50%' }}
          animate={{ x:[0,60,0], y:[0,40,0] }}
          transition={{ duration:20, repeat:Infinity, ease:'easeInOut' }}
        />
        <motion.div
          style={{ position:'absolute', bottom:'-10%', right:'-15%', width:'70vw', height:'70vh',
            background:'radial-gradient(ellipse, rgba(255,62,127,0.10) 0%, transparent 65%)', borderRadius:'50%' }}
          animate={{ x:[0,-50,0], y:[0,-30,0] }}
          transition={{ duration:25, repeat:Infinity, ease:'easeInOut', delay:5 }}
        />
      </div>

      <AnimatePresence>
        {loading && <LoadingScreen key="loading" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div style={{ position:'relative', zIndex:10 }}>
          <MusicPlayer />
          <IntroScreen onOpen={() => {
            setLetterOpen(true)
            setTimeout(() => document.getElementById('letter-section')?.scrollIntoView({ behavior:'smooth' }), 300)
          }} />
          <div style={{ height:2, margin:'0 10%', background:'linear-gradient(90deg, transparent, #9b5de5, #ff3e7f, #9b5de5, transparent)' }} />
          <div id="letter-section">
            <LetterSection isOpen={letterOpen} onOpen={() => setLetterOpen(true)} />
          </div>
         
          <div style={{ height:2, margin:'0 10%', background:'linear-gradient(90deg, transparent, #9b5de5, #f9c784, #9b5de5, transparent)' }} />
          <SurpriseSection />
          <footer style={{ textAlign:'center', padding:'2rem', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily:'"Cormorant Garamond", serif', color:'rgba(255,255,255,0.2)', fontSize:'0.85rem', letterSpacing:'0.15em' }}>
              Made with ❤️ · For Mihed · {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      )}
    </div>
  )
}
