import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'

import useDisplacement from '../hooks/useDisplacement'
import DisplacementForm from '../components/DisplacementForm'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function DisplacementEditPage() {
  const { displacementId } = useParams()

  const { displacement, isLoading, error, getDisplacementById } =
    useDisplacement()

  useEffect(() => {
    getDisplacementById({ id: displacementId })
  }, [])

  const initialData = displacement

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!displacement) return <div>No se encontró la cilindrada</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar cilindrada'}
          description={'Aquí podrás editar el detalle de la cilindrada'}
        />

        <CardComponent>
          <DisplacementForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
