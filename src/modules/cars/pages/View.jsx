import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useCar from '../hooks/useCar'
import useCarNavigate from '../hooks/useCarNavigate'

import {
  formatDateTime,
  formatToCurrency,
  formatToKilometers,
} from '../../../utils/functions'

import Title from '../../../components/others/Title'
import CardComponent from '../../../components/Cards/Card'
import InputOnlyViewComponent from '../../../components/Input/View'
import ButtonComponent, {
  ButtonStyle,
} from '../../../components/Buttons/Button'
import DeleteModalValidation from '../../../components/Modals/Delete'
import ImageComponent from '../../../components/Image'

export default function CarViewPage() {
  const { carId } = useParams()

  const { car, isLoading, error, getCarById, deleteCar } = useCar()
  const { navigateToCarMenu, navigateToEditCar } = useCarNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getCarById({ id: carId })
  }, [])

  const handleDelete = async carData => {
    try {
      await deleteCar({ carData })
      navigateToCarMenu()
    } catch (error) {}
  }

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!car) return <div>No se encontró el auto</div>

  const carDetails = car.carDetails

  const carDetail = [
    {
      label: 'Auto',
      value: `${carDetails.brand.label} ${carDetails.model.label} ${carDetails.year.label}`,
    },
    {
      label: 'Color',
      value: carDetails.color,
    },
    {
      label: 'Precio',
      value: formatToCurrency(carDetails.price),
    },
    {
      label: 'Kilometraje',
      value: formatToKilometers(carDetails.mileage),
    },
    {
      label: 'Combustible',
      value: carDetails.fuel.map(fuel => fuel.label).join(' - '),
    },
    {
      label: 'Cilindrada',
      value: carDetails.displacement.label,
    },
    {
      label: 'Transmisión',
      value: carDetails.transmission.label,
    },
    {
      label: 'Tracción',
      value: carDetails.drivetrain.label,
    },
  ]

  const publicationDetail = [
    {
      label: 'Creación ',
      value: `${car.createdBy} - ${formatDateTime(car.createdAt)}`,
    },
    {
      label: 'Actualización ',
      value: `${car.updatedBy} - ${formatDateTime(car.updatedAt)}`,
    },
    {
      label: 'Estado de la publicación',
      value: `${car.status}`,
    },
  ]

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles del auto'}
          description={'Aquí podrás encontrar el detalle del auto'}
        />

        <CardComponent
          className='space-y-6 bg-white'
          label={'Detalle del auto'}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {carDetail.map((item, index) => (
              <InputOnlyViewComponent
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </CardComponent>

        <CardComponent
          className='space-y-6 bg-white'
          label={'Detalle del publicación'}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {publicationDetail.map((item, index) => (
              <InputOnlyViewComponent
                key={index}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </CardComponent>

        {/* <CardComponent
          className='space-y-6 bg-white'
          label={'Detalle de publicación'}>
          <dl className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {publicationDetail.map((item, index) => (
              <div key={index} className='flex'>
                <dt className='text-sm font-semibold leading-6 text-gray-900'>
                  {item.label}
                </dt>
                <dd className='text-sm ml-2 leading-6 text-gray-700'>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardComponent> */}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <CardComponent label={'Accesorios'}>
            {car.accessories.length > 0 ? (
              <ul className='list-disc pl-5 flex flex-col space-y-2'>
                {car.accessories.map((accessory, index) => (
                  <li key={index}>
                    <p className='text-gray-800'>{accessory.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <p className='font-bold'>No se añadieron accesorios</p>
              </div>
            )}
          </CardComponent>

          <CardComponent label={'Notas'}>
            {car.notes.length > 0 ? (
              <ul className='list-disc pl-5 flex flex-col space-y-2'>
                {car.notes.map((note, index) => (
                  <li key={index}>
                    <p className='text-gray-800'>{note}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <p className='font-bold'>No se añadieron notas</p>
              </div>
            )}
          </CardComponent>
        </div>

        <CardComponent className='space-y-6 bg-white' label={'Imágenes'}>
          <div className='col-span-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 h-24'>
            {car.images.map((image, index) => (
              <ImageComponent
                key={`Imagen - ${index}`}
                image={image}
                imageAlt={`Preview Imagen ${index} de auto ${carDetail.label} ${carDetail.label} ${carDetail.label}`}
                objectFit='object-fill'
              />
            ))}
          </div>
        </CardComponent>

        {/* Botones */}
        <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
          <ButtonComponent
            onClick={navigateToCarMenu}
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
            onClick={() => navigateToEditCar(carId)}
            label={'Editar'}
            icon={BiSave}
            variant={ButtonStyle.Fill}
          />
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModalValidation
          label={'Borrar auto'}
          onConfirmClick={() => handleDelete(car)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}
