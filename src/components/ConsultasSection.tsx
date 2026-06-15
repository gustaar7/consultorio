'use client'
import { useState } from 'react'
import { IconCalendarOff, IconEdit, IconTrash } from '@tabler/icons-react'
import { Consulta, Medico, Paciente } from '@/types'
import { formatDateTime, getConsultaStatus } from '@/lib/data'
import Modal from './ui/Modal'
import { Field, SelectField } from './ui/Field'

interface ConsultasSectionProps { consultas: Consulta[]; medicos: Medico[]; pacientes: Paciente[]; search: string; onAdd: (c: Omit<Consulta, 'id'>) => void; onEdit: (c: Consulta) => void; onDelete: (id: number) => void; modalOpen: boolean; onModalClose: () => void }
const statusDot: Record<string, string> = { past: '#D1D5DB', today: '#3B6D11', future: '#2563EB' }
const statusLabel: Record<string, string> = { past: 'Passada', today: 'Hoje', future: 'Agendada' }
interface FormState { pacienteId: string; medicoId: string; horaData: string; sala: string }
const emptyForm: FormState = { pacienteId: '', medicoId: '', horaData: '', sala: '' }

export default function ConsultasSection({ consultas, medicos, pacientes, search, onAdd, onEdit, onDelete, modalOpen, onModalClose }: ConsultasSectionProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const filtered = consultas.filter((c) => { const q = search.toLowerCase(); return c.paciente.nome.toLowerCase().includes(q) || c.medico.nome.toLowerCase().includes(q) || c.sala.toLowerCase().includes(q) })
  const openEdit = (c: Consulta) => { setEditingId(c.id); setForm({ pacienteId: String(c.paciente.id), medicoId: String(c.medico.id), horaData: c.horaData, sala: c.sala }) }
  const handleClose = () => { setForm(emptyForm); setEditingId(null); onModalClose() }
  const handleSave = () => {
    const paciente = pacientes.find((p) => p.id === Number(form.pacienteId))
    const medico = medicos.find((m) => m.id === Number(form.medicoId))
    if (!paciente || !medico || !form.horaData || !form.sala) return
    const payload = { paciente, medico, horaData: form.horaData, sala: form.sala }
    if (editingId !== null) onEdit({ id: editingId, ...payload }); else onAdd(payload)
    handleClose()
  }
  const today = consultas.filter((c) => getConsultaStatus(c.horaData) === 'today').length
  const future = consultas.filter((c) => getConsultaStatus(c.horaData) === 'future').length
  const isOpen = modalOpen || editingId !== null
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[{ label: 'Total de consultas', value: consultas.length }, { label: 'Hoje', value: today }, { label: 'Agendadas', value: future }].map((s) => (
          <div key={s.label} style={{ background: '#F7F8FA', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ border: '0.5px solid #E2E5EB', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '0.5px solid #E2E5EB' }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Agenda</span>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9CA3AF' }}>
            <IconCalendarOff size={32} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.4 }} />
            <span style={{ fontSize: 13 }}>Nenhuma consulta encontrada</span>
          </div>
        ) : filtered.map((c) => {
          const status = getConsultaStatus(c.horaData)
          return <TimelineRow key={c.id} consulta={c} dotColor={statusDot[status]} statusLabel={statusLabel[status]} onEdit={() => openEdit(c)} onDelete={() => onDelete(c.id)} />
        })}
      </div>
      {isOpen && (
        <Modal title={editingId !== null ? 'Editar consulta' : 'Nova consulta'} onClose={handleClose} onSave={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <SelectField id="f-paciente" label="Paciente" value={form.pacienteId} onChange={(v) => setForm((f) => ({ ...f, pacienteId: v }))} options={pacientes.map((p) => ({ value: String(p.id), label: p.nome }))} />
            <SelectField id="f-medico" label="Médico" value={form.medicoId} onChange={(v) => setForm((f) => ({ ...f, medicoId: v }))} options={medicos.map((m) => ({ value: String(m.id), label: m.nome }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id="f-hora" label="Data e hora" type="datetime-local" value={form.horaData} onChange={(v) => setForm((f) => ({ ...f, horaData: v }))} />
            <Field id="f-sala" label="Sala" placeholder="Sala 1" value={form.sala} onChange={(v) => setForm((f) => ({ ...f, sala: v }))} />
          </div>
        </Modal>
      )}
    </>
  )
}

function TimelineRow({ consulta, dotColor, statusLabel, onEdit, onDelete }: { consulta: Consulta; dotColor: string; statusLabel: string; onEdit: () => void; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: '0.5px solid #E2E5EB', background: hovered ? '#F7F8FA' : '#fff', transition: 'background 0.1s' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{consulta.paciente.nome}</div>
        <div style={{ fontSize: 12, color: '#6B7280' }}>{consulta.medico.nome} &nbsp;·&nbsp; {consulta.sala}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap' }}>{formatDateTime(consulta.horaData)}</span>
        <div style={{ display: 'flex', gap: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
          <ActionButton onClick={onEdit} label="Editar"><IconEdit size={14} /></ActionButton>
          <ActionButton onClick={onDelete} label="Excluir" danger><IconTrash size={14} /></ActionButton>
        </div>
      </div>
    </div>
  )
}
function ActionButton({ onClick, label, danger, children }: { onClick: () => void; label: string; danger?: boolean; children: React.ReactNode }) {
  return <button onClick={onClick} aria-label={label} style={{ background: 'none', border: 'none', cursor: 'pointer', color: danger ? '#DC2626' : '#6B7280', display: 'flex', padding: '4px 6px', borderRadius: 6 }}>{children}</button>
}
