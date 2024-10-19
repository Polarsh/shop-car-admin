import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../components/others/Title'
import CardComponent from '../../../../components/Cards/Card'

import useAccessory from '../hooks/useAccessory'
import AccessoryForm from '../components/AccessoryForm'

export default function AccessoryEditPage() {
  const { accessoryId } = useParams()

  const { accessory, isLoading, error, getAccessoryById } = useAccessory()

  useEffect(() => {
    getAccessoryById({ id: accessoryId })
  }, [])

  const initialData = accessory

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!accessory) return <div>No se encontró el accesorio</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar accesorio'}
        description={'Aqui podrás editar el detalle del accesorio'}
      />

      <CardComponent>
        <AccessoryForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
