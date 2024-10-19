import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../components/others/Title'

import useCar from '../hooks/useCar'
import CarForm from '../components/CarForm'

export default function CarEditPage() {
  const { carId } = useParams()

  const { car, isLoading, error, getCarById } = useCar()

  useEffect(() => {
    getCarById({ id: carId })
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!car) return <div>No se encontró el auto</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar auto'}
        description={'Aquí podrás editar el detalle del auto'}
      />

      <CarForm initialData={car} />
    </div>
  )
}
