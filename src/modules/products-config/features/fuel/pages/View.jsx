import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useFuel from '../hooks/useFuel'
import useFuelNavigate from '../hooks/useFuelNavigate'

import { formatDateTime } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import CardComponent from '../../../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import DeleteModalValidation from '../../../../../components/Modals/Delete'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function FuelViewPage() {
  const { fuelId } = useParams()

  const { fuel, isLoading, error, getFuelById, deleteFuel } = useFuel()
  const { navigateToFuelMenu, navigateToEditFuel } = useFuelNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getFuelById({ id: fuelId })
  }, [])

  const handleDelete = async fuelData => {
    try {
      await deleteFuel({ fuelData })
      navigateToFuelMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!fuel) return <div>No se encontró el combustible</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles del combustible'}
          description={'Aquí podrás encontrar el detalle del combustible'}
        />

        {fuel && (
          <CardComponent className='space-y-6 bg-white'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <InputOnlyViewComponent label={'Nombre'} value={fuel.name} />

              <InputOnlyViewComponent
                label={'Creado en'}
                value={formatDateTime(fuel.createdAt)}
              />
              <InputOnlyViewComponent
                label={'Última actualización'}
                value={formatDateTime(fuel.updatedAt)}
              />
            </div>

            {/* Botones */}
            <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
              <ButtonComponent
                onClick={navigateToFuelMenu}
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
                onClick={() => navigateToEditFuel(fuelId)}
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
          title={'Borrar combustible'}
          content={
            '¿Estás seguro de que deseas eliminar este combustible? Todos sus datos se eliminarán permanentemente de nuestros servidores para siempre. Esta acción no se puede deshacer.'
          }
          onConfirmClick={() => handleDelete(fuel)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
