import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useTransmission from '../hooks/useTransmission'
import useTransmissionNavigate from '../hooks/useTransmissionNavigate'

import { formatDateTime } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../../components/Modals/Delete'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function TransmissionViewPage() {
  const { transmissionId } = useParams()

  const {
    transmission,
    isLoading,
    error,
    getTransmissionById,
    deleteTransmission,
  } = useTransmission()
  const { navigateToTransmissionMenu, navigateToEditTransmission } =
    useTransmissionNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getTransmissionById({ id: transmissionId })
  }, [])

  const handleDelete = async transmissionData => {
    try {
      await deleteTransmission({ transmissionData })
      navigateToTransmissionMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!transmission) return <div>No se encontró la transmisión</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la transmisión'}
          description={'Aquí podrás encontrar el detalle de la transmisión'}
        />

        {transmission && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent
                label={'Nombre'}
                value={transmission.name}
              />

              <InputOnlyViewComponent
                label={'Abreviación'}
                value={transmission.abbreviation}
              />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(transmission.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(transmission.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToTransmissionMenu}
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
                onClick={() => navigateToEditTransmission(transmissionId)}
                label={'Editar'}
                icon={BiSave}
                variant={ButtonStyle.Fill}
              />
            </div>
          </CardComponent>
        )}
      </div>
      {showDeleteModal ? (
        <DeleteModalValidation
          title={'Borrar transmisión'}
          content={
            '¿Estás seguro de que deseas eliminar esta transmisión? Todos sus datos se eliminarán permanentemente de nuestros servidores para siempre. Esta acción no se puede deshacer.'
          }
          onConfirmClick={() => handleDelete(transmission)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
