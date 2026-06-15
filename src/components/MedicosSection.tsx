'use client'
import { useState } from 'react'
import { IconEdit, IconStethoscope, IconTrash } from '@tabler/icons-react'
import { Medico } from '@/types'
import Avatar from './ui/Avatar'
import Badge from './ui/Badge'
import Modal from './ui/Modal'
import { Field } from './ui/Field'

interface MedicosSectionProps { medicos: Medico[]; search: string; onAdd: (m: Omit<Medico, 'id'>) => void; onEdit: (m: Medico) => void; onDelete: (id: number) => void; modalOpen: boolean; onModalClose: () => void }
interface FormState { nome: string; crm: string; email: string; cpf: string; senha: string }
const emptyForm: FormState = { nome: '', crm: '', email: '', cpf: '', senha: '' }

export default function MedicosSection({ medicos, search, onAdd, onEdit, onDelete, modalOpen, onModalClose }: MedicosSectionProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const f = (field: keyof FormState) => (v: string) => setForm((prev) => ({ ...prev, [field]: v }))
  const filtered = medicos.filter((m) => { const q = search.toLowerCase(); return m.nome.toLowerCase().includes(q) || m.crm.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) })
  const openEdit = (m: Medico) => { setEditingId(m.id); setForm({ nome: m.nome, crm: m.crm, email: m.email, cpf: m.cpf, senha: '' }) }
  const handleClose = () => { setForm(emptyForm); setEditingId(null); onModalClose() }
  const handleSave = () => {
    if (!form.nome || !form.crm || !form.email || !form.cpf) return
    if (editingId !== null) onEdit({ id: editingId, ...form }); else onAdd(form)
    handleClose()
  }
  const isOpen = modalOpen || editingId !== null
  return (
    <>
      <div style={{ border: '0.5px solid #E2E5EB', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '0.5px solid #E2E5EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Médicos cadastrados</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280' }}>{medicos.length} cadastrados</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>{['', 'Nome', 'CRM', 'E-mail', 'CPF', ''].map((h, i) => <th key={i} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '0.5px solid #E2E5EB' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6}><div style={{ textAlign: 'center', padding: '48px 20px', color: '#9CA3AF' }}><IconStethoscope size={32} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.4 }} /><span style={{ fontSize: 13 }}>Nenhum médico encontrado</span></div></td></tr>
              : filtered.map((m) => <MedicoRow key={m.id} medico={m} onEdit={() => openEdit(m)} onDelete={() => onDelete(m.id)} />)}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <Modal title={editingId !== null ? 'Editar médico' : 'Novo médico'} onClose={handleClose} onSave={handleSave}>
          <Field id="f-nome" label="Nome completo" placeholder="Dr. João Silva" value={form.nome} onChange={f('nome')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field id="f-cpf" label="CPF" placeholder="12345678901" value={form.cpf} onChange={f('cpf')} maxLength={11} />
            <Field id="f-crm" label="CRM" placeholder="CRM/MG 12345" value={form.crm} onChange={f('crm')} />
          </div>
          <Field id="f-email" label="E-mail" type="email" placeholder="medico@clinica.com" value={form.email} onChange={f('email')} />
          <Field id="f-senha" label="Senha" type="password" placeholder="••••••••" value={form.senha} onChange={f('senha')} />
        </Modal>
      )}
    </>
  )
}
function MedicoRow({ medico, onEdit, onDelete }: { medico: Medico; onEdit: () => void; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <tr onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? '#F7F8FA' : '#fff', transition: 'background 0.1s' }}>
      <td style={{ padding: '13px 20px' }}><Avatar name={medico.nome} /></td>
      <td style={{ padding: '13px 20px', fontWeight: 500 }}>{medico.nome}</td>
      <td style={{ padding: '13px 20px' }}><Badge variant="blue">{medico.crm}</Badge></td>
      <td style={{ padding: '13px 20px', color: '#6B7280' }}>{medico.email}</td>
      <td style={{ padding: '13px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280' }}>{medico.cpf}</td>
      <td style={{ padding: '13px 20px' }}>
        <div style={{ display: 'flex', gap: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
          <button onClick={onEdit} aria-label="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', padding: '4px 6px', borderRadius: 6 }}><IconEdit size={14} /></button>
          <button onClick={onDelete} aria-label="Excluir" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', display: 'flex', padding: '4px 6px', borderRadius: 6 }}><IconTrash size={14} /></button>
        </div>
      </td>
    </tr>
  )
}
