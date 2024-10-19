import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'

import useDriveTrain from '../hooks/useDriveTrain'
import DriveTrainForm from '../components/DriveTrainForm'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function DriveTrainEditPage() {
  const { drivetrainId } = useParams()

  const { driveTrain, isLoading, error, getDriveTrainById } = useDriveTrain()

  useEffect(() => {
    getDriveTrainById({ id: drivetrainId })
  }, [])

  const initialData = driveTrain

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!driveTrain) return <div>No se encontró el sistema de tracción</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar sistema de tracción'}
          description={'Aquí podrás editar el detalle del sistema de tracción'}
        />

        <CardComponent>
          <DriveTrainForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
