'use client'
import { IconX } from '@tabler/icons-react'
import { useEffect } from 'react'
interface ModalProps { title: string; onClose: () => void; onSave: () => void; children: React.ReactNode }
export default function Modal({ title, onClose, onSave, children }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose() }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: '#fff', borderRadius: 12, border: '0.5px solid #E2E5EB', width: 420, maxWidth: '95vw' }}>
        <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #E2E5EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500 }}>{title}</h3>
          <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: 4, borderRadius: 6 }}><IconX size={16} /></button>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
        <div style={{ padding: '14px 20px', borderTop: '0.5px solid #E2E5EB', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{ padding: '7px 14px', fontSize: 13, fontFamily: 'var(--font-sans)', background: 'transparent', border: '0.5px solid #D1D5DB', borderRadius: 8, cursor: 'pointer', color: '#111318' }}>Cancelar</button>
          <button onClick={onSave} style={{ padding: '7px 14px', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 500, background: '#2563EB', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#fff' }}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
