const labelClass = 'block mb-2 text-sm font-bold text-gray-700'
const inputClass =
  'w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'

function sortObjectKeys(obj) {
  const sortedObj = {}
  Object.keys(obj)
    .sort()
    .forEach(key => {
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        sortedObj[key] = sortObjectKeys(obj[key])
      } else {
        sortedObj[key] = obj[key]
      }
    })
  return sortedObj
}

export default function InputJsonOnlyViewComponent({ label, value }) {
  const sortedValue = value ? sortObjectKeys(value) : value

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <pre className={inputClass}>{JSON.stringify(sortedValue, null, 2)}</pre>
    </div>
  )
}
