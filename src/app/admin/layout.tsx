import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Consultório',
  description: 'Painel de administração do consultório',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
