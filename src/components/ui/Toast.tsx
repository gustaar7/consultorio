'use client'
import { useEffect, useState } from 'react'
interface ToastProps { message: string; onDone: () => void }
export default function Toast({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 200) }, 2000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#111318', color: '#fff', fontSize: 13, padding: '10px 16px', borderRadius: 8, zIndex: 999, fontFamily: 'var(--font-sans)', transition: 'opacity 0.2s', opacity: visible ? 1 : 0, pointerEvents: 'none' }}>
      {message}
    </div>
  )
}
