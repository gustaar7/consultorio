'use client'
import { IconActivity, IconCalendar, IconStethoscope, IconUsers } from '@tabler/icons-react'
import { Section } from '@/types'
interface SidebarProps { current: Section; onChange: (s: Section) => void }
const navItems: { id: Section; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'consultas', label: 'Consultas', Icon: IconCalendar },
  { id: 'medicos', label: 'Médicos', Icon: IconStethoscope },
  { id: 'pacientes', label: 'Pacientes', Icon: IconUsers },
]
export default function Sidebar({ current, onChange }: SidebarProps) {
  return (
    <aside style={{ width: 200, minWidth: 200, background: '#F7F8FA', borderRight: '0.5px solid #E2E5EB', display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 20px', fontSize: 14, fontWeight: 500, color: '#111318' }}>
        <IconActivity size={20} color="#2563EB" />Consultório
      </div>
      {navItems.map(({ id, label, Icon }) => {
        const active = current === id
        return (
          <button key={id} onClick={() => onChange(id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: active ? 500 : 400, color: active ? '#2563EB' : '#6B7280', background: active ? '#EFF4FF' : 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'background 0.12s, color 0.12s' }}
            onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = '#EEEFF2'; (e.currentTarget as HTMLButtonElement).style.color = '#111318' } }}
            onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#6B7280' } }}
          >
            <Icon size={16} />{label}
          </button>
        )
      })}
    </aside>
  )
}
