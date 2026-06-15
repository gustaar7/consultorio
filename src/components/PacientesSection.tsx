'use client'
import { useState } from 'react'
import { IconEdit, IconTrash, IconUsers } from '@tabler/icons-react'
import { Paciente } from '@/types'
import Avatar from './ui/Avatar'
import Modal from './ui/Modal'
import { Field } from './ui/Field'

interface PacientesSectionProps { pacientes: Paciente[]; search: string; onAdd: (p: Omit<Paciente, 'id'>) => void; onEdit: (p: Paciente) => void; onDelete: (id: number) => void; modalOpen: boolean; onModalClose: () => void }
interface FormState { nome: string; email: string; cpf: string; senha: string }
const emptyForm: FormState = { nome: '', email: '', cpf: '', senha: '' }

export default function PacientesSection({ pacientes, search, onAdd, onEdit, onDelete, modalOpen, onModalClose }: PacientesSectionProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const f = (field: keyof FormState) => (v: string) => setForm((prev) => ({ ...prev, [field]: v }))
  const filtered = pacientes.filter((p) => { const q = search.toLowerCase(); return p.nome.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.cpf.includes(q) })
  const openEdit = (p: Paciente) => { setEditingId(p.id); setForm({ nome: p.nome, email: p.email, cpf: p.cpf, senha: '' }) }
  const handleClose = () => { setForm(emptyForm); setEditingId(null); onModalClose() }
  const handleSave = () => {
    if (!form.nome || !form.email || !form.cpf) return
    if (editingId !== null) onEdit({ id: editingId, ...form }); else onAdd(form)
    handleClose()
  }
  const isOpen = modalOpen || editingId !== null
  return (
    <>
      <div style={{ border: '0.5px solid #E2E5EB', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '0.5px solid #E2E5EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Pacientes cadastrados</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280' }}>{pacientes.length} cadastrados</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>{['', 'Nome', 'E-mail', 'CPF', ''].map((h, i) => <th key={i} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '0.5px solid #E2E5EB' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={5}><div style={{ textAlign: 'center', padding: '48px 20px', color: '#9CA3AF' }}><IconUsers size={32} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.4 }} /><span style={{ fontSize: 13 }}>Nenhum paciente encontrado</span></div></td></tr>
              : filtered.map((p) => <PacienteRow key={p.id} paciente={p} onEdit={() => openEdit(p)} onDelete={() => onDelete(p.id)} />)}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <Modal title={editingId !== null ? 'Editar paciente' : 'Novo paciente'} onClose={handleClose} onSave={handleSave}>
          <Field id="f-nome" label="Nome completo" placeholder="Maria Souza" value={form.nome} onChange={f('nome')} />
          <Field id="f-cpf" label="CPF" placeholder="12345678901" value={form.cpf} onChange={f('cpf')} maxLength={11} />
          <Field id="f-email" label="E-mail" type="email" placeholder="paciente@email.com" value={form.email} onChange={f('email')} />
          <Field id="f-senha" label="Senha" type="password" placeholder="••••••••" value={form.senha} onChange={f('senha')} />
        </Modal>
      )}
    </>
  )
}
function PacienteRow({ paciente, onEdit, onDelete }: { paciente: Paciente; onEdit: () => void; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <tr onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? '#F7F8FA' : '#fff', transition: 'background 0.1s' }}>
      <td style={{ padding: '13px 20px' }}><Avatar name={paciente.nome} bg="#E1F5EE" color="#0F6E56" /></td>
      <td style={{ padding: '13px 20px', fontWeight: 500 }}>{paciente.nome}</td>
      <td style={{ padding: '13px 20px', color: '#6B7280' }}>{paciente.email}</td>
      <td style={{ padding: '13px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280' }}>{paciente.cpf}</td>
      <td style={{ padding: '13px 20px' }}>
        <div style={{ display: 'flex', gap: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
          <button onClick={onEdit} aria-label="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px 6px', borderRadius: 6 }}><IconEdit size={14} /></button>
          <button onClick={onDelete} aria-label="Excluir" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', display: 'flex', padding: '4px 6px', borderRadius: 6 }}><IconTrash size={14} /></button>
        </div>
      </td>
    </tr>
  )
}
