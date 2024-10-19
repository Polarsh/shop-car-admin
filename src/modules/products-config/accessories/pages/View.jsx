import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useAccessory from '../hooks/useAccessory'
import useAccessoryNavigate from '../hooks/useAccessoryNavigate'

import { formatDateTime } from '../../../../utils/functions'

import Title from '../../../../components/others/Title'
import CardComponent from '../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../components/Modals/Delete'

export default function AccessoryViewPage() {
  const { accessoryId } = useParams()

  const { accessory, isLoading, error, getAccessoryById, deleteAccessory } =
    useAccessory()
  const { navigateToAccessoryMenu, navigateToEditAccessory } =
    useAccessoryNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getAccessoryById({ id: accessoryId })
  }, [])

  const handleDelete = async accessoryData => {
    try {
      await deleteAccessory({ accessoryData })
      navigateToAccessoryMenu()
    } catch (error) {
      // Manejar error si es necesario
    }
  }

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!accessory) return <div>No se encontró el accesorio</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles del accesorio'}
          description={'Aqui podras encontrar el detalle del accesorio'}
        />

        {accessory && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent label={'Nombre'} value={accessory.name} />
              <InputOnlyViewComponent
                label={'Descripción'}
                value={accessory.description}
              />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(accessory.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(accessory.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToAccessoryMenu}
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
                onClick={() => navigateToEditAccessory(accessoryId)}
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
          title={'Borrar accesorio'}
          content={
            '¿Estás seguro de que deseas eliminar este accesorio? Todos tus datos serán eliminados permanentemente de nuestros servidores. Esta acción no se puede deshacer.'
          }
          onConfirmClick={() => handleDelete(accessory)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}
