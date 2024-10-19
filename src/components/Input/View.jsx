const labelClass = 'block mb-2 text-sm font-bold text-gray-700'
const inputClass =
  'w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'

export default function InputOnlyViewComponent({ label, value }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className={inputClass}>{value}</div>
    </div>
  )
}
