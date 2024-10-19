import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useDisplacement from '../hooks/useDisplacement'
import useDisplacementNavigate from '../hooks/useDisplacementNavigate'

import { formatDateTime } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../../components/Modals/Delete'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function DisplacementViewPage() {
  const { displacementId } = useParams()

  const {
    displacement,
    isLoading,
    error,
    getDisplacementById,
    deleteDisplacement,
  } = useDisplacement()
  const { navigateToDisplacementMenu, navigateToEditDisplacement } =
    useDisplacementNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getDisplacementById({ id: displacementId })
  }, [])

  const handleDelete = async displacementData => {
    try {
      await deleteDisplacement({ displacementData })
      navigateToDisplacementMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!displacement) return <div>No se encontró la cilindrada</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la cilindrada'}
          description={'Aquí podrás encontrar el detalle de la cilindrada'}
        />

        {displacement && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent
                label={'Nombre'}
                value={displacement.name}
              />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(displacement.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(displacement.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToDisplacementMenu}
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
                onClick={() => navigateToEditDisplacement(displacementId)}
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
          title={'Borrar cilindrada'}
          content={
            '¿Estás seguro de que deseas eliminar esta cilindrada? Todos sus datos se eliminarán permanentemente de nuestros servidores para siempre. Esta acción no se puede deshacer.'
          }
          onConfirmClick={() => handleDelete(displacement)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
