import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'

import useFuel from '../hooks/useFuel'
import FuelForm from '../components/FuelForm'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function FuelEditPage() {
  const { fuelId } = useParams()

  const { fuel, isLoading, error, getFuelById } = useFuel()

  useEffect(() => {
    getFuelById({ id: fuelId })
  }, [])

  const initialData = fuel

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!fuel) return <div>No se encontró el combustible</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar combustible'}
          description={'Aquí podrás editar el detalle del combustible'}
        />

        <CardComponent>
          <FuelForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
