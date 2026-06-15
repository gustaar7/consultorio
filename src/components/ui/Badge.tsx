interface BadgeProps { children: React.ReactNode; variant?: 'blue' | 'green' | 'amber' | 'gray' }
const styles: Record<string, { background: string; color: string }> = {
  blue:  { background: '#EFF4FF', color: '#1d4ed8' },
  green: { background: '#EAF3DE', color: '#3B6D11' },
  amber: { background: '#FAEEDA', color: '#854F0B' },
  gray:  { background: '#F3F4F6', color: '#6B7280' },
}
export default function Badge({ children, variant = 'blue' }: BadgeProps) {
  const s = styles[variant]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500, ...s }}>
      {children}
    </span>
  )
}
