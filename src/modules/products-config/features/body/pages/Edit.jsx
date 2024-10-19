import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'

import useBody from '../hooks/useBody'
import BodyForm from '../components/BodyForm'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function BodyEditPage() {
  const { bodyId } = useParams()

  const { body, isLoading, error, getBodyById } = useBody()

  useEffect(() => {
    getBodyById({ id: bodyId })
  }, [])

  const initialData = body

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!body) return <div>No se encontró la marca</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar marca'}
          description={'Aqui podrás editar el detalle de la marca'}
        />

        <CardComponent>
          <BodyForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
