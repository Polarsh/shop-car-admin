export default function LogoComponent({ size = 'h-8' }) {
  return (
    <div>
      <span className='sr-only'>Car Shop</span>
      <img
        className={`mx-auto w-auto ${size}`}
        src='/logo.webp'
        alt='Car Shop Logo'
      />
    </div>
  )
}
