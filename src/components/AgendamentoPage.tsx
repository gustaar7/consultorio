'use client'

import { useState } from 'react'
import { IconActivity, IconCalendar, IconCheck, IconChevronRight, IconClock, IconStethoscope, IconUser } from '@tabler/icons-react'
import { mockMedicos } from '@/lib/data'
import { Medico } from '@/types'

type Step = 'especialidade' | 'medico' | 'data' | 'dados' | 'confirmacao'

interface Booking {
  medico: Medico | null
  data: string
  hora: string
  nome: string
  cpf: string
  email: string
  telefone: string
  motivo: string
}

const emptyBooking: Booking = {
  medico: null, data: '', hora: '', nome: '', cpf: '', email: '', telefone: '', motivo: '',
}

const horarios = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

const steps: { id: Step; label: string; icon: React.FC<{ size?: number; color?: string }> }[] = [
  { id: 'especialidade', label: 'Especialidade', icon: IconStethoscope },
  { id: 'medico', label: 'Médico', icon: IconUser },
  { id: 'data', label: 'Data & Hora', icon: IconCalendar },
  { id: 'dados', label: 'Seus dados', icon: IconUser },
  { id: 'confirmacao', label: 'Confirmação', icon: IconCheck },
]

const stepOrder: Step[] = ['especialidade', 'medico', 'data', 'dados', 'confirmacao']

export default function AgendamentoPage() {
  const [step, setStep] = useState<Step>('especialidade')
  const [booking, setBooking] = useState<Booking>(emptyBooking)
  const [booked, setBooked] = useState(false)

  const currentIdx = stepOrder.indexOf(step)
  const goNext = () => setStep(stepOrder[currentIdx + 1])
  const goBack = () => setStep(stepOrder[currentIdx - 1])

  const handleConfirm = () => setBooked(true)

  if (booked) return <SuccessScreen booking={booking} onNew={() => { setBooking(emptyBooking); setStep('especialidade'); setBooked(false) }} />

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '0.5px solid #E2E5EB', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: '#111318' }}>
          <IconActivity size={20} color="#2563EB" />
          Consultório
        </div>
        <a href="/admin" style={{ fontSize: 12, color: '#6B7280', textDecoration: 'none', padding: '6px 12px', borderRadius: 7, border: '0.5px solid #E2E5EB', background: '#F7F8FA' }}>
          Área admin →
        </a>
      </header>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 64px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111318', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Agende sua consulta
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280' }}>Rápido, simples e sem complicação. Escolha o médico e o horário ideal para você.</p>
        </div>

        {/* Stepper */}
        <StepperBar steps={steps} currentStep={step} />

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 14, border: '0.5px solid #E2E5EB', overflow: 'hidden', marginTop: 24 }}>
          {step === 'especialidade' && <EspecialidadeStep onNext={goNext} />}
          {step === 'medico' && <MedicoStep booking={booking} setBooking={setBooking} onNext={goNext} onBack={goBack} />}
          {step === 'data' && <DataStep booking={booking} setBooking={setBooking} onNext={goNext} onBack={goBack} />}
          {step === 'dados' && <DadosStep booking={booking} setBooking={setBooking} onNext={goNext} onBack={goBack} />}
          {step === 'confirmacao' && <ConfirmacaoStep booking={booking} onConfirm={handleConfirm} onBack={goBack} />}
        </div>
      </div>
    </div>
  )
}

/* ─── Stepper ─── */
function StepperBar({ steps, currentStep }: { steps: typeof steps; currentStep: Step }) {
  const currentIdx = stepOrder.indexOf(currentStep)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
      {steps.map((s, i) => {
        const done = i < currentIdx
        const active = i === currentIdx
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                background: done ? '#2563EB' : active ? '#EFF4FF' : '#F3F4F6',
                color: done ? '#fff' : active ? '#2563EB' : '#9CA3AF',
                border: active ? '2px solid #2563EB' : 'none',
                transition: 'all 0.2s',
              }}>
                {done ? <IconCheck size={14} /> : <s.icon size={14} />}
              </div>
              <span style={{ fontSize: 10, color: active ? '#2563EB' : done ? '#6B7280' : '#9CA3AF', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 40, height: 1, background: i < currentIdx ? '#2563EB' : '#E2E5EB', margin: '0 4px', marginBottom: 18, transition: 'background 0.2s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Step 1: Especialidade ─── */
const especialidades = [
  { id: 'clinico', label: 'Clínico Geral', desc: 'Avaliação completa de saúde', icon: '🩺' },
  { id: 'cardio', label: 'Cardiologia', desc: 'Saúde do coração', icon: '❤️' },
  { id: 'dermato', label: 'Dermatologia', desc: 'Cuidados com a pele', icon: '✨' },
  { id: 'ortho', label: 'Ortopedia', desc: 'Ossos e articulações', icon: '🦴' },
  { id: 'neuro', label: 'Neurologia', desc: 'Sistema nervoso', icon: '🧠' },
  { id: 'oftalmo', label: 'Oftalmologia', desc: 'Saúde dos olhos', icon: '👁️' },
]
function EspecialidadeStep({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState('')
  return (
    <StepShell title="Qual especialidade você precisa?" subtitle="Selecione a área de saúde para sua consulta">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {especialidades.map((e) => (
          <button key={e.id} onClick={() => setSelected(e.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${selected === e.id ? '#2563EB' : '#E2E5EB'}`, background: selected === e.id ? '#EFF4FF' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
            <span style={{ fontSize: 22 }}>{e.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: selected === e.id ? '#2563EB' : '#111318' }}>{e.label}</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{e.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <StepFooter onNext={onNext} nextDisabled={!selected} nextLabel="Escolher médico" />
    </StepShell>
  )
}

/* ─── Step 2: Médico ─── */
function MedicoStep({ booking, setBooking, onNext, onBack }: StepProps) {
  return (
    <StepShell title="Escolha o médico" subtitle="Selecione o profissional de sua preferência">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {mockMedicos.map((m) => (
          <button key={m.id} onClick={() => setBooking((b) => ({ ...b, medico: m }))}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${booking.medico?.id === m.id ? '#2563EB' : '#E2E5EB'}`, background: booking.medico?.id === m.id ? '#EFF4FF' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
            <MedicoAvatar name={m.nome} active={booking.medico?.id === m.id} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: booking.medico?.id === m.id ? '#2563EB' : '#111318' }}>{m.nome}</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{m.crm} · {m.email}</div>
            </div>
            {booking.medico?.id === m.id && <IconCheck size={16} color="#2563EB" />}
          </button>
        ))}
      </div>
      <StepFooter onNext={onNext} onBack={onBack} nextDisabled={!booking.medico} nextLabel="Escolher horário" />
    </StepShell>
  )
}

/* ─── Step 3: Data & Hora ─── */
function DataStep({ booking, setBooking, onNext, onBack }: StepProps) {
  // Generate next 14 days
  const days: { label: string; value: string; dayName: string }[] = []
  for (let i = 1; i <= 14; i++) {
    const d = new Date(); d.setDate(d.getDate() + i)
    const value = d.toISOString().split('T')[0]
    const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' })
    const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    days.push({ label, value, dayName })
  }
  return (
    <StepShell title="Quando prefere?" subtitle="Escolha a data e o horário disponível">
      {/* Date scroll */}
      <div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, fontWeight: 500 }}>DATA</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {days.map((d) => (
            <button key={d.value} onClick={() => setBooking((b) => ({ ...b, data: d.value, hora: '' }))}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${booking.data === d.value ? '#2563EB' : '#E2E5EB'}`, background: booking.data === d.value ? '#EFF4FF' : '#fff', cursor: 'pointer', minWidth: 56, flexShrink: 0, transition: 'all 0.15s' }}>
              <span style={{ fontSize: 10, color: booking.data === d.value ? '#2563EB' : '#9CA3AF', textTransform: 'capitalize' }}>{d.dayName}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: booking.data === d.value ? '#2563EB' : '#111318', marginTop: 2 }}>{d.label.split('/')[0]}</span>
              <span style={{ fontSize: 10, color: '#9CA3AF' }}>{d.label.split('/')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Times */}
      {booking.data && (
        <div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, fontWeight: 500 }}>HORÁRIO</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {horarios.map((h) => (
              <button key={h} onClick={() => setBooking((b) => ({ ...b, hora: h }))}
                style={{ padding: '9px 0', borderRadius: 8, border: `1.5px solid ${booking.hora === h ? '#2563EB' : '#E2E5EB'}`, background: booking.hora === h ? '#EFF4FF' : '#fff', fontSize: 12, fontWeight: 500, color: booking.hora === h ? '#2563EB' : '#374151', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <IconClock size={11} color={booking.hora === h ? '#2563EB' : '#9CA3AF'} />
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      <StepFooter onNext={onNext} onBack={onBack} nextDisabled={!booking.data || !booking.hora} nextLabel="Preencher dados" />
    </StepShell>
  )
}

/* ─── Step 4: Dados pessoais ─── */
function DadosStep({ booking, setBooking, onNext, onBack }: StepProps) {
  const set = (field: keyof Booking) => (v: string) => setBooking((b) => ({ ...b, [field]: v }))
  const valid = booking.nome.trim() && booking.cpf.trim().length === 11 && booking.email.includes('@')
  return (
    <StepShell title="Seus dados" subtitle="Preencha as informações para o agendamento">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Nome completo" placeholder="Maria Souza" value={booking.nome} onChange={set('nome')} />
        </div>
        <FormField label="CPF" placeholder="12345678901" value={booking.cpf} onChange={set('cpf')} maxLength={11} />
        <FormField label="Telefone" placeholder="(31) 99999-9999" value={booking.telefone} onChange={set('telefone')} />
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="E-mail" placeholder="seu@email.com" type="email" value={booking.email} onChange={set('email')} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormTextarea label="Motivo da consulta (opcional)" placeholder="Descreva brevemente o motivo da consulta..." value={booking.motivo} onChange={set('motivo')} />
        </div>
      </div>
      <StepFooter onNext={onNext} onBack={onBack} nextDisabled={!valid} nextLabel="Revisar agendamento" />
    </StepShell>
  )
}

/* ─── Step 5: Confirmação ─── */
function ConfirmacaoStep({ booking, onConfirm, onBack }: { booking: Booking; onConfirm: () => void; onBack: () => void }) {
  const dataFmt = booking.data ? new Date(booking.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : ''
  return (
    <StepShell title="Tudo certo?" subtitle="Revise os dados antes de confirmar">
      <div style={{ background: '#F7F8FA', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <SummaryRow icon="👨‍⚕️" label="Médico" value={booking.medico?.nome ?? ''} />
        <SummaryRow icon="📅" label="Data" value={dataFmt} />
        <SummaryRow icon="🕐" label="Horário" value={booking.hora} />
        <div style={{ height: 1, background: '#E2E5EB' }} />
        <SummaryRow icon="👤" label="Paciente" value={booking.nome} />
        <SummaryRow icon="📧" label="E-mail" value={booking.email} />
        <SummaryRow icon="📱" label="Telefone" value={booking.telefone || '—'} />
        {booking.motivo && <SummaryRow icon="📝" label="Motivo" value={booking.motivo} />}
      </div>

      <div style={{ background: '#EFF4FF', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: '#1d4ed8', lineHeight: 1.5 }}>
        Ao confirmar, você receberá um e-mail com os detalhes do agendamento. Em caso de cancelamento, entre em contato com antecedência mínima de 24h.
      </div>

      <StepFooter onNext={onConfirm} onBack={onBack} nextLabel="Confirmar agendamento" nextStyle={{ background: '#16a34a' }} />
    </StepShell>
  )
}

/* ─── Success ─── */
function SuccessScreen({ booking, onNew }: { booking: Booking; onNew: () => void }) {
  const dataFmt = booking.data ? new Date(booking.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }) : ''
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #E2E5EB', padding: '40px 36px', maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <IconCheck size={28} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111318', marginBottom: 8 }}>Consulta agendada!</h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24, lineHeight: 1.6 }}>
          Sua consulta com <strong>{booking.medico?.nome}</strong> foi confirmada para <strong>{dataFmt}</strong> às <strong>{booking.hora}</strong>.
          Um e-mail foi enviado para <strong>{booking.email}</strong>.
        </p>
        <div style={{ background: '#F7F8FA', borderRadius: 10, padding: '14px 16px', fontSize: 12, color: '#374151', marginBottom: 24, textAlign: 'left', lineHeight: 1.7 }}>
          <div><strong>CRM:</strong> {booking.medico?.crm}</div>
          <div><strong>Local:</strong> Clínica Consultório — Sala a definir</div>
          <div><strong>Horário:</strong> {booking.hora} — Chegue 15 min antes</div>
        </div>
        <button onClick={onNew}
          style={{ padding: '10px 24px', fontSize: 13, fontWeight: 500, background: '#2563EB', color: '#fff', border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
          Agendar nova consulta
        </button>
      </div>
    </div>
  )
}

/* ─── Helpers ─── */
type StepProps = { booking: Booking; setBooking: React.Dispatch<React.SetStateAction<Booking>>; onNext: () => void; onBack: () => void }

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '28px 28px 24px' }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111318', marginBottom: 4 }}>{title}</h2>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>{subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  )
}

function StepFooter({ onNext, onBack, nextDisabled, nextLabel, nextStyle }: { onNext: () => void; onBack?: () => void; nextDisabled?: boolean; nextLabel: string; nextStyle?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
      {onBack ? (
        <button onClick={onBack} style={{ padding: '9px 18px', fontSize: 13, background: 'transparent', border: '0.5px solid #D1D5DB', borderRadius: 9, cursor: 'pointer', color: '#374151', fontFamily: 'var(--font-sans)' }}>← Voltar</button>
      ) : <div />}
      <button onClick={onNext} disabled={nextDisabled}
        style={{ padding: '9px 22px', fontSize: 13, fontWeight: 500, background: nextDisabled ? '#D1D5DB' : '#2563EB', color: nextDisabled ? '#9CA3AF' : '#fff', border: 'none', borderRadius: 9, cursor: nextDisabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', transition: 'background 0.15s', ...nextStyle }}>
        {nextLabel} <IconChevronRight size={14} />
      </button>
    </div>
  )
}

function FormField({ label, placeholder, value, onChange, type = 'text', maxLength }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; maxLength?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, padding: '9px 12px', border: '0.5px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#111318', fontFamily: 'var(--font-sans)', outline: 'none' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function FormTextarea({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{label}</label>
      <textarea placeholder={placeholder} value={value} rows={3} onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, padding: '9px 12px', border: '0.5px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#111318', fontFamily: 'var(--font-sans)', outline: 'none', resize: 'vertical' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: 13, color: '#111318', marginTop: 1, fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  )
}

function MedicoAvatar({ name, active }: { name: string; active: boolean }) {
  const ini = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: active ? '#EFF4FF' : '#F3F4F6', color: active ? '#2563EB' : '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
      {ini}
    </div>
  )
}
