import { useEffect, useRef } from 'react'

const SHAPES = ['rect', 'circle', 'heart']
const COLORS = ['#ff3e7f','#9b5de5','#00b4d8','#f9c784','#ff6b6b','#34d399','#fff','#fda4af']

function drawHeart(ctx, x, y, size) {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.3)
  ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.3, size * 0.5, size * 0.2)
  ctx.bezierCurveTo(size, -size * 0.3, size * 0.5, size, 0, size * 0.8)
  ctx.bezierCurveTo(-size * 0.5, size, -size, -size * 0.3, -size * 0.5, size * 0.2)
  ctx.bezierCurveTo(-size, -size * 0.3, -size * 0.5, -size, 0, -size * 0.3)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function Confetti({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const piecesRef = useRef([])

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current)
      const c = canvasRef.current
      if (c) { const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height) }
      piecesRef.current = []
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Spawn confetti pieces
    piecesRef.current = Array.from({ length: 180 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.15,
      size: 6 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      alpha: 1,
      delay: Math.random() * 2000,
      born: Date.now(),
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()
      let alive = 0
      piecesRef.current.forEach(p => {
        if (now - p.born < p.delay) return
        p.x += p.vx + Math.sin(now * 0.001 + p.rot) * 0.5
        p.y += p.vy
        p.vy += 0.05
        p.rot += p.rotV
        if (p.y > canvas.height + 20) { p.y = -20; p.alpha = 0.9 }
        if (p.alpha > 0) alive++

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else if (p.shape === 'circle') {
          ctx.beginPath(); ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.translate(0, 0)
          drawHeart(ctx, 0, 0, p.size / 2.5)
        }
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 29, pointerEvents: 'none' }}
    />
  )
}
