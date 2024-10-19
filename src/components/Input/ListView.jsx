const labelClass = 'block mb-2 text-sm font-bold text-gray-700'
const inputClass =
  'w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'

export default function ListInputOnlyViewComponent({ label, list }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className={inputClass}>
        <ul className='list-disc pl-5 flex flex-col space-y-2'>
          {list.map((item, index) => (
            <li key={index}>
              <p className='text-gray-800'>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
