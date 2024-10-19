import { useEffect, useState } from 'react'

export default function LoadingPage() {
  const [loadingText, setLoadingText] = useState('Cargando .')
  const loadingMessages = ['Cargando .', 'Cargando ..', 'Cargando ...']

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingMessages.length
        return loadingMessages[nextIndex]
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-full mt-48  flex items-center justify-center flex-col'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid mb-4'></div>
      <p className='text-primary text-xl'>{loadingText}</p>
    </div>
  )
}
