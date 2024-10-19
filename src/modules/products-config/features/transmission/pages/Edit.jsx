import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'

import useTransmission from '../hooks/useTransmission'
import TransmissionForm from '../components/TransmissionForm'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function TransmissionEditPage() {
  const { transmissionId } = useParams()

  const { transmission, isLoading, error, getTransmissionById } =
    useTransmission()

  useEffect(() => {
    getTransmissionById({ id: transmissionId })
  }, [])

  const initialData = transmission

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!transmission) return <div>No se encontró la transmisión</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar transmisión'}
          description={'Aquí podrás editar el detalle de la transmisión'}
        />

        <CardComponent>
          <TransmissionForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
