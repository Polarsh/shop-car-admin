import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useBody from '../hooks/useBody'
import useBodyNavigate from '../hooks/useBodyNavigate'

import { formatDateTime } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../../components/Modals/Delete'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function BodyViewPage() {
  const { bodyId } = useParams()

  const { body, isLoading, error, getBodyById, deleteBody } = useBody()
  const { navigateToBodyMenu, navigateToEditBody } = useBodyNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getBodyById({ id: bodyId })
  }, [])

  const handleDelete = async bodyData => {
    // TODO
    try {
      await deleteBody({ bodyData })
      navigateToBodyMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!body) return <div>No se encontró la carrocería</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la carrocería'}
          description={'Aqui podras encontrar el detalle de la carrocería'}
        />

        {body && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent label={'Nombre'} value={body.name} />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(body.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(body.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToBodyMenu}
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
                onClick={() => navigateToEditBody(bodyId)}
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
          title={'Borrar carrocería'}
          content={
            'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.'
          }
          onConfirmClick={() => handleDelete(body)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
