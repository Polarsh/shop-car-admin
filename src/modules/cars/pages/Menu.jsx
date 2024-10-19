import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useCar from '../hooks/useCar'
import useCarNavigate from '../hooks/useCarNavigate'

import {
  formatDate,
  formatToCurrency,
  formatToKilometers,
} from '../../../utils/functions'

import Title from '../../../components/others/Title'
import Table from '../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../components/Buttons/Button'

export default function CarMenuPage() {
  const { navigateToCreateCar, navigateToViewCar, navigateToEditCar } =
    useCarNavigate()
  const { carList, isLoading, error, getAllCars, downloadExcel } = useCar()

  const columns = [
    {
      header: 'Nombre',
      accessorFn: row =>
        `${row.carDetails.brand.label} ${row.carDetails.model.label} ${row.carDetails.year.label}`,
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      cell: info => formatToCurrency(info.row.original.carDetails.price),
    },
    {
      header: 'Kilometraje',
      accessorKey: 'mileage',
      cell: info =>
        `${formatToKilometers(info.row.original.carDetails.mileage)} km`,
    },
    {
      header: 'Fecha de publicación',
      accessorKey: 'createdAt',
      cell: info => formatDate(info.row.original.createdAt),
      sortingFn: 'datetime',
    },
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToViewCar,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditCar,
    },
  ]

  useEffect(() => {
    getAllCars()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Autos'
        description='Una lista de todos los autos disponibles'
      />
      <Table data={carList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateCar}
            label={'Añadir auto'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewCar}
        />
      </Table>
    </div>
  )
}
