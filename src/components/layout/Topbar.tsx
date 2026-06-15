'use client'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { Section } from '@/types'
interface TopbarProps { section: Section; onNew: () => void; search: string; onSearch: (v: string) => void }
const titles: Record<Section, string> = { consultas: 'Consultas', medicos: 'Médicos', pacientes: 'Pacientes' }
export default function Topbar({ section, onNew, search, onSearch }: TopbarProps) {
  return (
    <div style={{ padding: '14px 24px', borderBottom: '0.5px solid #E2E5EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{titles[section]}</span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F7F8FA', border: '0.5px solid #E2E5EB', borderRadius: 8, padding: '7px 12px' }}>
          <IconSearch size={15} color="#6B7280" />
          <input type="text" value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Buscar..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, fontFamily: 'var(--font-sans)', color: '#111318', width: 160 }} />
        </label>
        <button onClick={onNew}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 500, background: '#2563EB', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#2563EB')}
        >
          <IconPlus size={15} />Novo
        </button>
      </div>
    </div>
  )
}
