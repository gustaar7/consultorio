import { Consulta, Medico, Paciente } from '@/types'

export const mockMedicos: Medico[] = [
  { id: 1, nome: 'Dr. João Silva', crm: 'CRM/MG 12345', email: 'joao@clinica.com', cpf: '12345678901' },
  { id: 2, nome: 'Dra. Ana Costa', crm: 'CRM/MG 67890', email: 'ana@clinica.com', cpf: '98765432100' },
  { id: 3, nome: 'Dr. Carlos Mendes', crm: 'CRM/MG 11111', email: 'carlos@clinica.com', cpf: '11122233344' },
]

export const mockPacientes: Paciente[] = [
  { id: 1, nome: 'Maria Souza', email: 'maria@email.com', cpf: '22233344455' },
  { id: 2, nome: 'Pedro Alves', email: 'pedro@email.com', cpf: '33344455566' },
  { id: 3, nome: 'Luiza Ferreira', email: 'luiza@email.com', cpf: '44455566677' },
]

const now = new Date()
const fmt = (d: Date) => d.toISOString().slice(0, 16)
const addDays = (n: number) => { const d = new Date(now); d.setDate(d.getDate() + n); return d }
const addHours = (n: number) => { const d = new Date(now); d.setHours(d.getHours() + n); return d }

export const mockConsultas: Consulta[] = [
  { id: 1, paciente: mockPacientes[0], medico: mockMedicos[0], horaData: fmt(addHours(2)), sala: 'Sala 1' },
  { id: 2, paciente: mockPacientes[1], medico: mockMedicos[1], horaData: fmt(addDays(1)), sala: 'Sala 2' },
  { id: 3, paciente: mockPacientes[2], medico: mockMedicos[2], horaData: fmt(addDays(-2)), sala: 'Sala 3' },
]

export function getConsultaStatus(horaData: string): 'past' | 'today' | 'future' {
  const date = new Date(horaData)
  const n = new Date()
  const today = new Date(n.getFullYear(), n.getMonth(), n.getDate())
  const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (itemDay < today) return 'past'
  if (itemDay.getTime() === today.getTime()) return 'today'
  return 'future'
}

export function initials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export function formatDateTime(dt: string): string {
  const d = new Date(dt)
  return d.toLocaleDateString('pt-BR') + ' · ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
