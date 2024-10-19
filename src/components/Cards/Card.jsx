import CardTitleComponent from './CardTitle'

export default function CardComponent({
  children,
  label,
  className = 'bg-white',
}) {
  return (
    <div className={`${className} shadow sm:rounded-lg px-4 py-5 sm:p-6`}>
      {label && <CardTitleComponent label={label} />}
      {children}
    </div>
  )
}
