'use client'
import { useState, useCallback } from 'react'
import { Consulta, Medico, Paciente, Section } from '@/types'
import { mockConsultas, mockMedicos, mockPacientes } from '@/lib/data'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import ConsultasSection from './ConsultasSection'
import MedicosSection from './MedicosSection'
import PacientesSection from './PacientesSection'
import Toast from './ui/Toast'

export default function Dashboard() {
  const [section, setSection] = useState<Section>('consultas')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [consultas, setConsultas] = useState<Consulta[]>(mockConsultas)
  const [medicos, setMedicos] = useState<Medico[]>(mockMedicos)
  const [pacientes, setPacientes] = useState<Paciente[]>(mockPacientes)
  const nextId = () => Date.now()
  const showToast = (msg: string) => setToast(msg)
  const handleSectionChange = (s: Section) => { setSection(s); setSearch(''); setModalOpen(false) }
  const addConsulta = useCallback((c: Omit<Consulta, 'id'>) => { setConsultas((prev) => [...prev, { id: nextId(), ...c }]); showToast('Consulta agendada') }, [])
  const editConsulta = useCallback((c: Consulta) => { setConsultas((prev) => prev.map((x) => x.id === c.id ? c : x)); showToast('Consulta atualizada') }, [])
  const deleteConsulta = useCallback((id: number) => { setConsultas((prev) => prev.filter((x) => x.id !== id)); showToast('Consulta removida') }, [])
  const addMedico = useCallback((m: Omit<Medico, 'id'>) => { setMedicos((prev) => [...prev, { id: nextId(), ...m }]); showToast('Médico cadastrado') }, [])
  const editMedico = useCallback((m: Medico) => { setMedicos((prev) => prev.map((x) => x.id === m.id ? m : x)); showToast('Médico atualizado') }, [])
  const deleteMedico = useCallback((id: number) => { setMedicos((prev) => prev.filter((x) => x.id !== id)); showToast('Médico removido') }, [])
  const addPaciente = useCallback((p: Omit<Paciente, 'id'>) => { setPacientes((prev) => [...prev, { id: nextId(), ...p }]); showToast('Paciente cadastrado') }, [])
  const editPaciente = useCallback((p: Paciente) => { setPacientes((prev) => prev.map((x) => x.id === p.id ? p : x)); showToast('Paciente atualizado') }, [])
  const deletePaciente = useCallback((id: number) => { setPacientes((prev) => prev.filter((x) => x.id !== id)); showToast('Paciente removido') }, [])
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
      <Sidebar current={section} onChange={handleSectionChange} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar section={section} onNew={() => setModalOpen(true)} search={search} onSearch={setSearch} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {section === 'consultas' && <ConsultasSection consultas={consultas} medicos={medicos} pacientes={pacientes} search={search} onAdd={addConsulta} onEdit={editConsulta} onDelete={deleteConsulta} modalOpen={modalOpen} onModalClose={() => setModalOpen(false)} />}
          {section === 'medicos' && <MedicosSection medicos={medicos} search={search} onAdd={addMedico} onEdit={editMedico} onDelete={deleteMedico} modalOpen={modalOpen} onModalClose={() => setModalOpen(false)} />}
          {section === 'pacientes' && <PacientesSection pacientes={pacientes} search={search} onAdd={addPaciente} onEdit={editPaciente} onDelete={deletePaciente} modalOpen={modalOpen} onModalClose={() => setModalOpen(false)} />}
        </main>
      </div>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
