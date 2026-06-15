import { initials } from '@/lib/data'
interface AvatarProps { name: string; color?: string; bg?: string }
export default function Avatar({ name, color = '#1d4ed8', bg = '#EFF4FF' }: AvatarProps) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: bg, color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, flexShrink: 0 }}>
      {initials(name)}
    </div>
  )
}
