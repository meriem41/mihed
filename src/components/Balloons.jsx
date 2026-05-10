import { useMemo } from 'react'

const BALLOON_COLORS = [
  { body: '#ff3e7f', shine: '#ff80ab' },
  { body: '#9b5de5', shine: '#c084fc' },
  { body: '#00b4d8', shine: '#67e8f9' },
  { body: '#f9c784', shine: '#fde68a' },
  { body: '#ff6b6b', shine: '#fca5a5' },
  { body: '#34d399', shine: '#6ee7b7' },
]

function BalloonSVG({ color, size = 60 }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Balloon body */}
      <ellipse cx="30" cy="32" rx="26" ry="30" fill={color.body} />
      {/* Shine */}
      <ellipse cx="20" cy="18" rx="8" ry="10" fill={color.shine} opacity="0.45" />
      {/* Knot */}
      <ellipse cx="30" cy="62" rx="3" ry="4" fill={color.body} />
      {/* String */}
      <path d="M30 66 Q25 75 30 85" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Balloons({ visible }) {
  const balloons = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    left: `${5 + Math.random() * 90}%`,
    dur: 7 + Math.random() * 6,
    del: Math.random() * 4,
    sway: 2.5 + Math.random() * 2,
    size: 44 + Math.random() * 28,
  })), [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
      {balloons.map(b => (
        <div
          key={b.id}
          className="absolute balloon"
          style={{
            left: b.left,
            '--dur': `${b.dur}s`,
            '--del': `${b.del}s`,
            bottom: 0,
          }}
        >
          <div className="balloon-sway" style={{ '--sw': `${b.sway}s` }}>
            <BalloonSVG color={b.color} size={b.size} />
          </div>
        </div>
      ))}
    </div>
  )
}
