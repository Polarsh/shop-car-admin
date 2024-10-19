import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useDriveTrain from '../hooks/useDriveTrain'
import useDriveTrainNavigate from '../hooks/useDriveTrainNavigate'

import { formatDateTime } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../../components/Modals/Delete'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function DriveTrainViewPage() {
  const { drivetrainId } = useParams()

  const { driveTrain, isLoading, error, getDriveTrainById, deleteDriveTrain } =
    useDriveTrain()
  const { navigateToDriveTrainMenu, navigateToEditDriveTrain } =
    useDriveTrainNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getDriveTrainById({ id: drivetrainId })
  }, [])

  const handleDelete = async driveTrainData => {
    try {
      await deleteDriveTrain({ driveTrainData })
      navigateToDriveTrainMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!driveTrain) return <div>No se encontró el sistema de tracción</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles del sistema de tracción'}
          description={
            'Aquí podrás encontrar el detalle del sistema de tracción'
          }
        />

        {driveTrain && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent
                label={'Nombre'}
                value={driveTrain.name}
              />

              <InputOnlyViewComponent
                label={'Abreviatura'}
                value={driveTrain.abbreviation}
              />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(driveTrain.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(driveTrain.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToDriveTrainMenu}
                label={'Atrás'}
                icon={MdCancel}
                variant={ButtonStyle.Cancel}
              />
              <ButtonComponent
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                label={'Eliminar'}
                icon={TrashIcon}
                variant={ButtonStyle.Cancel}
              />
              <ButtonComponent
                onClick={() => navigateToEditDriveTrain(drivetrainId)}
                label={'Editar'}
                icon={BiSave}
                variant={ButtonStyle.Fill}
              />
            </div>
          </CardComponent>
        )}
      </div>
      {showDeleteModal && (
        <DeleteModalValidation
          title={'Borrar sistema de tracción'}
          content={
            '¿Estás seguro de que deseas eliminar este sistema de tracción? Todos sus datos se eliminarán permanentemente de nuestros servidores para siempre. Esta acción no se puede deshacer.'
          }
          onConfirmClick={() => handleDelete(driveTrain)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}
