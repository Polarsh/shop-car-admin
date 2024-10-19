import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'

import useAdministrator from '../hooks/useAdministrator'
import useAdministratorNavigate from '../hooks/useAdministratorNavigate'

import { formatDateTime } from '../../../../utils/functions'

import Title from '../../../../components/others/Title'
import CardComponent from '../../../../components/Cards/Card'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../components/Modals/Delete'
import InputOnlyViewComponent from '../../../../components/Input/View'
import FormPageSkeleton from '../../../../components/Skeletons/FormPageSkeleton'

export default function AdminViewPage() {
  const { adminId } = useParams()

  const {
    administrator,
    isLoading,
    error,
    getAdministratorById,
    deleteAdministrator,
  } = useAdministrator()

  const { navigateToAdminMenu, navigateToEditAdmin } =
    useAdministratorNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getAdministratorById({ id: adminId })
  }, [])

  const handleDelete = async adminData => {
    // TODO
    try {
      await deleteAdministrator({ adminData })
      navigateToAdminMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!administrator) return <div>No se encontró el administrador</div>

  const administratorDetails = [
    {
      label: 'Nombres',
      value: administrator.firstName,
    },
    {
      label: 'Apellidos',
      value: administrator.lastName,
    },
    { label: 'DNI', value: administrator.dni },
    { label: 'Email', value: administrator.email },
    { label: 'Teléfono', value: administrator.phone },
    {
      label: 'Creado en',
      value: formatDateTime(administrator.createdAt),
    },
    {
      label: 'Última actualización',
      value: formatDateTime(administrator.updatedAt),
    },
  ]

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Detalles del administrador'}
          description={'Aqui podras encontrar el detalle del administrador'}
        />

        <CardComponent>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {administratorDetails.map((detail, index) => (
              <InputOnlyViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>

          {/* Botones */}
          <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
            <ButtonComponent
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              label={'Eliminar'}
              icon={TrashIcon}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              onClick={() => navigateToEditAdmin(adminId)}
              label={'Editar'}
              icon={BiSave}
              variant={ButtonStyle.Fill}
            />
          </div>
        </CardComponent>
      </div>
      {showDeleteModal && (
        <DeleteModalValidation
          label={'Borrar administrador'}
          onConfirmClick={() => handleDelete(administrator)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}
