'use client'
interface FieldProps { label: string; id: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void; maxLength?: number }
export function Field({ label, id, type = 'text', placeholder, value, onChange, maxLength }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={id} style={{ fontSize: 12, color: '#6B7280' }}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, padding: '8px 10px', border: '0.5px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#111318', fontFamily: 'var(--font-sans)', outline: 'none' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}
interface SelectFieldProps { label: string; id: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }
export function SelectField({ label, id, value, onChange, options }: SelectFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={id} style={{ fontSize: 12, color: '#6B7280' }}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, padding: '8px 10px', border: '0.5px solid #D1D5DB', borderRadius: 8, background: '#fff', color: value ? '#111318' : '#6B7280', fontFamily: 'var(--font-sans)', outline: 'none', cursor: 'pointer' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <option value="">Selecionar...</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
