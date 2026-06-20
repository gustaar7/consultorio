'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CriarContaPage() {
    const router = useRouter()
    const [cpf, setCpf] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const res = await fetch('http://localhost:8080/pacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf, nome, email, senha }),
            })
            if (!res.ok) throw new Error('Erro ao criar conta')
            setMessage('Conta criada com sucesso! Redirecionando...')
            setTimeout(() => router.push('/agendar'), 200)
        } catch (err: any) {
            setMessage(err?.message || 'Erro ao criar conta')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F8FA', fontFamily: 'var(--font-sans)' }}>
            <form onSubmit={handleSubmit} style={{ width: 460, background: '#fff', padding: 28, borderRadius: 12, border: '0.5px solid #E2E5EB' }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Criar conta</h2>
                <p style={{ marginTop: 6, color: '#6B7280' }}>Preencha seus dados para criar uma conta.</p>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '0.5px solid #D1D5DB' }} />
                    <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '0.5px solid #D1D5DB' }} />
                    <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '0.5px solid #D1D5DB' }} />
                    <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '0.5px solid #D1D5DB' }} />
                    {message && <div style={{ color: message.includes('sucesso') ? '#16a34a' : '#dc2626' }}>{message}</div>}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 6 }}>
                        <button type="submit" disabled={loading} style={{ padding: '9px 14px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>{loading ? 'Criando...' : 'Criar conta'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
